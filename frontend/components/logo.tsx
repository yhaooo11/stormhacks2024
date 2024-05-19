import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex items-center gap-4">
            <Image
                src="/logo.svg"
                width={42}
                height={42}
                alt="Picture of the guinea pig logo"
            />
            <h1 className="font-mono font-semibold text-3xl">
                guinea<span className="text-tertiary">.</span>pig
            </h1>
        </div>
    );
}
