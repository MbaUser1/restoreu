import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { compare } from "bcrypt";
import db from "@/lib/db";
// import { UserRole } from "@prisma/client";
export const authOptions = {
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
      async authorize(credentials) {
        try {
          console.log("Authorize function recieved credentials:", credentials);
          // Check if user credentials are they are Not empty
          if (
            !credentials?.email ||
            !credentials?.password ||
            !credentials?.role
          ) {
            throw { error: "No Inputs Found", status: 401 };
          }
          console.log("Passed Check 1 ");
          //Check if user exists
          const existingUser = await db.utilisateur.findUnique({
            where: { email: credentials.email, role: credentials.role },
            include: { Lieu_depot: true },
          });
          if (!existingUser) {
            console.log("No user found");
            throw { error: "No user found", status: 401 };
          }

          console.log("Passed Check 2");

          //Check if Password is correct
          const passwordMatch = await compare(
            credentials.password,
            existingUser.motDePasseHache,
          );
          if (!passwordMatch) {
            console.log("Password incorrect");
            throw { error: "Password Incorrect", status: 401 };
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
          //

          return user;
        } catch (error) {
          console.log("aLL Failed");
          console.log(error);
          throw { error: "Something went wrong", status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        console.log(`token:${token} in session`);
        session.user.id = token.id;
        session.user.nom = token.nom;
        session.user.email = token.email;
        session.user.telephone = token.telephone;
        session.user.role = token.role;
        session.user.image = token.image;
        session.user.point_depot = token.point_depot;
      }
      console.log(`session:${session.user}`);
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
