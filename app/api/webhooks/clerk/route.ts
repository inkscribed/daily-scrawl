import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", {
			status: 400,
		});
	}

	// Get the ID and type
	const { id } = evt.data;

	const eventType = evt.type;

	if (eventType === "user.created") {
		const user = await createUser(evt.data);
		console.log(user);

		return new Response("", { status: 200 });
	}

	if (eventType === "user.updated") {
		const user = await updateUser(evt.data);
		console.log(user);

		return new Response("", { status: 200 });
	}

	if (eventType === "user.deleted") {
		const user = await deleteUser(evt.data);
		console.log(user);

		return new Response("", { status: 200 });
	}

	return new Response("", { status: 200 });
}

async function createUser(data: any) {
	const { first_name, last_name, email_addresses, createdAt, id } = data;

	try {
		const user = await prisma.user.create({
			data: {
				email: email_addresses[0].email_address,
				name: `${first_name} ${last_name}`,
				createdAt,
				updatedAt: createdAt,
				id: id,
			},
		});

		return user;
	} catch (error) {
		console.error("Error creating user:", error);
		return null;
	}
}

async function updateUser(data: any) {
	const { first_name, last_name, email_addresses, id } = data;

	try {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				email: email_addresses[0].email_address,
				name: `${first_name} ${last_name}`,
				updatedAt: new Date(),
			},
		});

		return user;
	} catch (error) {
		console.error("Error updating user:", error);
		return null;
	}
}

async function deleteUser(data: any) {
	const { id } = data;

	try {
		const user = await prisma.user.delete({
			where: {
				id,
			},
		});

		return user;
	} catch (error) {
		console.error("Error deleting user:", error);
		return null;
	}
}
