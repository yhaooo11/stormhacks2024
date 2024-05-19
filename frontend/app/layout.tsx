import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./sessionProvider";
import localFont from "@next/font/local";

const inter = Inter({ subsets: ["latin"] });

const zodiak = localFont({
    src: [
        {
            path: "../public/fonts/Zodiak-Variable.ttf",
            weight: "400",
        },
        {
            path: "../public/fonts/Zodiak-Variable.ttf",
            weight: "500",
        },
        {
            path: "../public/fonts/Zodiak-Variable.ttf",
            weight: "700",
        },
    ],
    variable: "--font-zodiak",
});

const jakarta = localFont({
    src: [
        {
            path: "../public/fonts/PlusJakartaSans-Variable.ttf",
            weight: "400",
        },
        {
            path: "../public/fonts/PlusJakartaSans-Variable.ttf",
            weight: "600",
        },
    ],
    variable: "--font-jakarta",
});

export const metadata: Metadata = {
    title: "Guinea Pig",
    description: "Connecting researchers with participants",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // @ts-ignore
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body
                className={`${zodiak.variable} ${jakarta.variable} font-mono ${inter.className}`}
            >
                <SessionProvider session={session}>
                    <main className="overflow-y-scroll bg-primary w-screen h-screen text-black">
                        {children}
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
}
