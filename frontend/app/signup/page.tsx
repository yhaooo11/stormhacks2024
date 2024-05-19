"use client";

import Image from "next/image";

export default function Login() {
    return (
        <div className="flex flex-row justify-center items-center w-full h-full gap-14">
            <a className="bg-[#FFDBB4] px-10 py-5 h-200 w-300" href="/signup/researcher">
                <Image
                    src="/assets/Researcher_Image.svg"
                    width={120*3}
                    height={150*3}
                    alt="Researcher Image"
                />
                <p className="text-center">SIGN IN AS...</p>
                <p className="font-bold text-center">Researcher</p>
            </a>
            <h2 className="font-bold">OR</h2>
            <a className="bg-[#FFDBB4] px-10 py-5 h-200 w-300" href="/signup/participant">
                <Image
                    src="/assets/Participant_Image.svg"
                    width={100*3}
                    height={100*3}
                    alt="Participant Image"
                />
                <p className="text-center">SIGN IN AS...</p>
                <p className="font-bold text-center">Participant</p>
            </a>
        </div>
    );
}
