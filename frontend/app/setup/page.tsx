"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../../components/logo";
import Image from "next/image";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Setup() {
    const session = useSession();
    const router = useRouter();
    if (!session) {
        router.push("/");
    }
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        location: "",
        // @ts-ignore
        occupation: "",
        role: "participant",
    });

    // @ts-ignore
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //   const handleSubmit = async (e: React.FormEvent) => {
    //       e.preventDefault();
    //       console.log(formData);
    //       const userId = session.data.user.id;
    //       router.push("/dashboard");
    //   };

    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        
        // @ts-ignore
        const userId = session.data.user.id;

        // Iterate over the form data and write each field as a key-value pair in Firestore
        Object.entries(formData).forEach(async ([formKey, formValue]) => {
            try {
                const userDocRef = doc(db, "users", userId);
                await setDoc(userDocRef, { [formKey]: formValue }, { merge: true });
                console.log(`Successfully wrote ${formKey}: ${formValue}`);
            } catch (error) {
                console.error(`Error writing ${formKey}: ${formValue}`, error);
            }
        });

        // Redirect to dashboard after form submission
        router.push("/dashboard");
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
                    <div className="text-center w-3/5 h-[45%] bg-[#ffdbb4] rounded-md">
                        <h2 className="text-black pt-12 mb-10 text-2xl font-mono">
                            Participant Setup
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="Age"
                                className="w-3/4 p-3 mb-2 border border-gray-400 rounded-md font-mono placeholder-[#f4bb87] bg-[#ffdbb4] font-semibold"
                                required
                            />
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-3/4 p-3 mb-2 border border-gray-400 rounded-md font-mono bg-[#ffdbb4] font-semibold"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="text"
                                id="occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                placeholder="Occupation"
                                className="w-3/4 p-3 mb-2 border border-gray-400 rounded-md font-mono placeholder-[#f4bb87] bg-[#ffdbb4] font-semibold"
                                required
                            />
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Location"
                                className="w-3/4 p-3 mb-2 border border-gray-400 rounded-md font-mono placeholder-[#f4bb87] bg-[#ffdbb4] font-semibold"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-[#eb5e28] text-white font-bold w-3/4 p-5 font-mono rounded-md"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
