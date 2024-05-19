"use client";
import { signOut, signIn, useSession } from "next-auth/react";
import { app, db } from "./firebase.ts"
import { useCollection } from "react-firebase-hooks/firestore"
import { getDocs, collection, query, where } from "firebase/firestore";

export default function Home() {
    const session = useSession();
    const fc = {
        field: 'name',
        operator: '==',
        value: 'Jayson Yi'
    }

    console.log(session);
    
    // @ts-ignore 
    const q = query(collection(db, "users"));
    getDocs(q).then((qs) => {
        qs.forEach((doc)=> {
            console.log(doc.data().name);
        });
    });

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
