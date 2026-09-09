import { auth0 } from "./lib/auth0";

export async function proxy(request: Request) {
  try {
    return await auth0.middleware(request);
  } catch (err: unknown) {
    // Log the root cause of any auth error to the server console
    const error = err as { code?: string; cause?: unknown; message?: string };
    console.error("[Auth0 Error]", {
      code: error?.code,
      message: error?.message,
      cause: error?.cause,
    });
    throw err;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
