"use client";
import { signOut, signIn, useSession } from "next-auth/react";
import { app, db } from "./firebase.ts";
import { useCollection } from "react-firebase-hooks/firestore";
import { getDocs, collection, query, where } from "firebase/firestore";
import Logo from "@/components/logo";
import { useState } from "react"

export default function Home() {
    const session = useSession();
    const fc = {
        field: "name",
        operator: "==",
        value: "Jayson Yi",
    };
    

    return (
        <div className="flex h-full px-10 py-8">
            <header className="absolute top-8 left-10">
                <Logo />
            </header>
            <div className="flex justify-center items-center w-full h-full">
                <div className="w-1/2">
                    <h1 className="font-sans font-medium text-5xl mb-5">
                        We connect researchers and participants
                    </h1>
                    <p className="w-3/4 mb-8">
                        Get fast access to quality participants or earn money by
                        participating in studies.
                    </p>
                    <div className="flex gap-5">
                        <a href="/login" className="bg-tertiary text-white px-6 py-2 rounded-md hover:cursor-pointer">
                            Sign In
                        </a>
                        <a href="/signup" className="text-black px-6 py-2 rounded-md border-tertiary border-2 hover:cursor-pointer">
                            Sign Up
                        </a>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="bg-slate-300 h-80 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}
