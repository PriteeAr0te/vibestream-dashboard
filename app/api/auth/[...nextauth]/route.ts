import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuid } from "uuid";
import type { AdapterUser } from "next-auth/adapters";

const googleClientId = process.env.GOOGLE_CLIENT_ID!;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.toLowerCase();
        const password = credentials.password;
        const displayName = credentials.name || email.split("@")[0];

        if (email === "user@vibe.com" && password === "password") {
          return {
            id: "1",
            name: "Demo User",
            email,
            avatar: null,
          };
        }

        const validEmail = /\S+@\S+\.\S+/.test(email);
        if (validEmail && password.length >= 6) {
          return {
            id: uuid(),
            name: displayName,
            email,
            avatar: null,
          };
        }

        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = (user as AdapterUser).id;
        token.name = user.name;
        token.email = user.email;
        token.avatar = user.avatar ?? null;
      }

      if (trigger === "update" && session?.avatar) {
        token.avatar = session.avatar;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        avatar: token.avatar as string | null,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
