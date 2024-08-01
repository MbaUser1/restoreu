import NextAuth, { NextAuthOptions } from "next-auth";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";
import { handlers} from "@src/lib/auth";
// import { UserRole } from "@prisma/client";

interface Credentials {
  email: string;
  password: string;
  role: string;
  telephone: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
        password: { label: "Password", type: "password" },
        role: { label: "Depot", type: "string" },
      },
      async authorize(credentials: Credentials | undefined) {
        try {
          console.log("Authorize function received credentials:", credentials);

          // Check if user credentials are not empty
          if (
            !credentials?.email ||
            !credentials?.password ||
            !credentials?.role
          ) {
            throw new Error("No Inputs Found");
          }
          console.log("Passed Check 1 ");

          // Check if user exists
          const existingUser = await db.utilisateur.findUnique({
            where: { email: credentials.email, role: credentials.role },
            include: { Lieu_depot: true },
          });
          if (!existingUser) {
            console.log("No user found");
            throw new Error("No user found");
          }
          console.log("Passed Check 2");

          // Check if password is correct
          const passwordMatch = await compare(
            credentials.password,
            existingUser.motDePasseHache,
          );
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw new Error("Password Incorrect");
          }
          console.log("Pass 3 Checked");

          const user = {
            id: existingUser.id,
            nom: existingUser.nom,
            email: existingUser.email,
            telephone: existingUser.telephone,
            role: existingUser.role,
            image: existingUser.image,
            point_depot: existingUser.Lieu_depot[0]?.id || null,
          };

          return user;
        } catch (error) {
          console.log("Authorization failed");
          console.error(error);
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session && token) {
        if (!session.user) {
          session.user = {};
        }
        session.user.id = token.id as string;
        session.user.nom = token.nom as string;
        session.user.email = token.email as string;
        session.user.telephone = token.telephone as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
        session.user.point_depot = token.point_depot as string | null;
      }
      console.log(`session: ${JSON.stringify(session.user)}`);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.nom = user.nom;
        token.email = user.email;
        token.telephone = user.telephone;
        token.role = user.role;
        token.image = user.image;
        token.point_depot = user.point_depot;
      }
      return token;
    },
  },
};

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
export{GET, POST} = handlers;
