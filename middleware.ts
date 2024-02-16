import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/webhooks(.*)",
		"api/users",
		"/sign-in(.*)",
		"/sign-up(.*)",
	],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
