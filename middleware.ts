import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
	afterAuth: (auth, req) =>
		auth.isPublicRoute ? NextResponse.next() : undefined,
	debug: true,
	publicRoutes: [
		"/",
		"/api/webhooks(.*)",
		"api/users",
		"/read(.*)",
		"/sign-in(.*)",
		"/sign-up(.*)",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
