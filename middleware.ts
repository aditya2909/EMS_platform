import { clerkMiddleware } from "@clerk/nextjs/server"

// Routes that are publicly accessible
const publicRoutes = [
  "/",
  "/events/:id",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
]

// Routes completely ignored by middleware
const ignoredRoutes = [
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
]

// Manually define matcher instead of calling a function at export
const protectedPattern =
  "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"
const apiPattern = "/(api|trpc)(.*)"
const excludedRoutes = [...publicRoutes, ...ignoredRoutes].map(
  (route) => `!${route}`
)

// ✅ Pure static value
const matcher = [protectedPattern, apiPattern, ...excludedRoutes]

// Export Clerk middleware
export default clerkMiddleware()

// ✅ Config must be static
export const config = {
  matcher,
}
