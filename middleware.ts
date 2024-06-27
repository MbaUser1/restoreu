import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, // Assurez-vous de définir cette valeur correctement
});

export const config = {
  matcher: ["/users/:path*"],
};
