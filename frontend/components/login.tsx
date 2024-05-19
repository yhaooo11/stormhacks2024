"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "./logo";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginProps {
    role: string;
}

export default function Login({ role }: LoginProps) {
    const [who, setWho] = useState<string>(role);
    const router = useRouter();

    const redirect = () => {
        let redirectUrl: string = "/";

        if (who == "participant") {
            redirectUrl = "/setup";
        } else if (who == "researcher") {
            redirectUrl = "/dashboard";
        } else {
        }
        signIn("google", { callbackUrl: redirectUrl });
    };

    return (
        <div className="w-screen h-screen bg-white text-black">
            <div className="p-10 absolute z-10">
                <Logo />
            </div>
            <div className="flex h-screen z-20">
                <div className="relative w-1/2 h-full">
                    <Image
                        className=""
                        fill={true}
                        src="/hands_together.svg"
                        alt="Hands Together"
                    ></Image>
                </div>
                <div className="flex justify-center items-center w-1/2">
                    <div className="text-center w-3/5 h-1/2 bg-[#ffdbb4] rounded-md">
                        <h2 className="text-black pt-12 text-2xl font-mono">
                            {!who.length ? "Sign In" : "Sign Up"}
                        </h2>
                        <p className="text-black pt-4 pb-4 font-mono">
                            {who.length ? "...as a " + who : ""}
                        </p>
                        <button
                            className="bg-[#404040] text-white font-bold w-3/4 p-3 
                        font-mono rounded-md"
                            onClick={() => redirect()}
                        >
                            {!who.length ? "Sign in with Google" : "Sign Up with Google"}
                        </button>
                        <hr className="mx-auto m-8 w-3/4 h-0.5 bg-[#404040]" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-3/4 p-3 mb-2 border border-gray-400 
                            rounded-md font-mono placeholder-[#f4bb87] bg-[#ffdbb4]
                            font-semibold"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-3/4 p-3 mb-5 border border-gray-400 
                            rounded-md font-mono placeholder-[#f4bb87] bg-[#ffdbb4]
                            font-semibold"
                        />
                        {/* Sign in button */}
                        <button
                            className="bg-[#eb5e28] text-white font-bold w-3/4 p-5 
                            font-mono rounded-md"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
