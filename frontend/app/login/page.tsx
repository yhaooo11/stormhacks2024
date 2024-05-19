"use client";
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex flex-row justify-center items-center w-full h-full gap-5">
      <a className="h-200 w-300" href="">
        <Image
        src="/assets/Researcher_Image.svg"
        width={120}
        height={150}
        alt="Researcher Image"
         />
        <p>SIGN IN AS...</p>
        <p className="font-bold">Researcher</p>
      </a>
      <h2 className="font-bold">OR</h2>
      <a className="h-200 w-300" href="">
      <Image
        src="/assets/Participant_Image.svg"
        width={100}
        height={100}
        alt="Participant Image"
         />
        <p>SIGN IN AS...</p>
        <p className="font-bold">Participant</p>
      </a>
  </div>
  )
}