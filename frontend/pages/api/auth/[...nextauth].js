import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
    ],
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_AUTH_FIREBASE_PROJECT_ID,
            clientEmail: process.env.NEXT_PUBLIC_AUTH_FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.NEXT_PUBLIC_AUTH_FIREBASE_PRIVATE_KEY.replace(
                /\\n/g,
                "\n"
            ),
        }),
    }),
    callbacks: {
        session: async (session, token) => {
            if (session?.user) {
                if (token?.sub) {
                    session.user.id = token.sub;
                }
            }
            return session;
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
};

export default NextAuth(authOptions);
