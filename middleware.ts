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

const protectedPattern =
  "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"
const apiPattern = "/(api|trpc)(.*)"

// ❌ Don't use `.map` directly inside config
// ✅ Precompute a plain array
const excludedRoutes = [
  "!/",
  "!/events/:id",
  "!/api/webhook/clerk",
  "!/api/webhook/stripe",
  "!/api/uploadthing",
]

// ✅ Fully static array
const matcher = [protectedPattern, apiPattern].concat(excludedRoutes)

export default clerkMiddleware()

// ✅ Config is now pure JSON-like data
export const config = {
  matcher,
}
