import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { getAllMemberEmails } from "../../../helpers/prisma-helpers";
import { sendVerificationRequest } from "../../../helpers/next-auth-helpers";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      // Ensure only users who are present in the directory can sign in
      const validEmails = await getAllMemberEmails();

      if (validEmails.includes(user.email)) return true;

      // If user is not found, redirect to "verify request" page instead
      // of error so we don't expose which members are in directory
      return "/auth/verify-request";
    },
    async session({ session, user }) {
      // Find signed in member
      const member = await prisma.member.findUnique({
        where: {
          email: user.email,
        },
      });

      // Set admin flags on session
      if (member) {
        session.user.admin = member.admin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/error", // Error code passed in query string. Details: https://next-auth.js.org/configuration/pages#error-page
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
      sendVerificationRequest,
    }),
  ],
};

export default NextAuth(authOptions);
