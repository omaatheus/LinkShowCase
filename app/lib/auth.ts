import NextAuth, { DefaultSession } from "next-auth";
import { firebaseCert } from "./firebase";
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";

declare module "next-auth" {
  interface Session {
    user: {
      isSubscribed: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isSubscribed?: boolean;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: FirestoreAdapter({
    credential: firebaseCert,
  }),
  providers: [Google],
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          isSubscribed: user.isSubscribed ?? false, 
        },
      };
    },
  },
});