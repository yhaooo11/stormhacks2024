"use client";
import { signOut, signIn, useSession } from "next-auth/react";

export default function Home() {
    const session = useSession();

    console.log(session);

    return (
        <>
            <div>{session?.data?.user?.name}</div>
            <button onClick={() => signIn("google")}>Login</button>
            <br></br>
            <button onClick={() => signOut()}> Logout</button>
        </>
    );
}
