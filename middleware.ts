import { clerkMiddleware } from "@clerk/nextjs/server";

// Routes that are publicly accessible
const publicRoutes = [
  "/",
  "/events/:id",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
];

// Routes completely ignored by middleware
const ignoredRoutes = [
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
];

// Helper to generate matcher patterns
const generateMatcher = () => {
  const protectedPattern =
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)";
  const apiPattern = "/(api|trpc)(.*)";

  // Exclude both public and ignored routes
  const excludedRoutes = [...publicRoutes, ...ignoredRoutes].map(
    (route) => `!${route}`
  );

  return [protectedPattern, apiPattern, ...excludedRoutes];
};

// Export Clerk middleware
export default clerkMiddleware();

// Dynamic config
export const config = {
  matcher: generateMatcher(),
};
