import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes
const publicRoutes = [
  "/",
  "/events/:id",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
];

const ignoredRoutes = [
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
];

// Helpers
const isPublicRoute = createRouteMatcher(publicRoutes);
const isIgnoredRoute = createRouteMatcher(ignoredRoutes);

// Clerk middleware
export default clerkMiddleware((auth, req) => {
  // Skip ignored routes
  if (isIgnoredRoute(req)) return;

  // Allow public routes
  if (isPublicRoute(req)) return;

  // ✅ Everything else requires auth
  auth().protect();
});

// Config (must be static)
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // all routes except static files
    "/",
    "/(api|trpc)(.*)",             // api + trpc
  ],
};
