// middleware.ts
import { toast } from "@/components/ui/use-toast";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check for the presence of the JWT in the cookies
  const token = request.cookies.get("user_token");

  // List of protected routes
  const protectedRoutes = ["/dashboard", "/workroom", "/tasks"];

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      // throw message sa1ying not authenticated3
      toast({
        variant: "destructive",
        title: "Not Authorized",
        description:
          "You haven't logged in or signed up, so you ca1n not visit this page",
      });
      // If no token, redirect to the /user_auth page
      return NextResponse.redirect(new URL("/user_auth", request.url));
    }
  }

  // If token exists, or the route is not protected, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/workroom", "/tasks"], // Apply middleware to these routes
};
