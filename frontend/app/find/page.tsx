"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "../../components/logo";
import Participant_Info from "../../components/participant_info";

import { db } from "@/app/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

interface participants {
    id: string;
    name: string;
    age: number;
    occupation: string;
    location: string;
    gender: string;
    image: string;
}

export default function Login() {
    const [users, setUsers] = useState<participants[]>([]);

    const filterUsers = () => {
        setUsers([]);
        const q = query(collection(db, "users"), where("gender", "==", "male"));
        console.log("hello world");
        getDocs(q).then((qs) => {
            qs.forEach((doc) => {
                console.log(doc.data().image);
                const p = {
                    id: doc.id,
                    image: doc.data().image,
                    name: doc.data().name,
                    age: doc.data().age,
                    occupation: doc.data().occupation,
                    location: doc.data().location,
                    gender: doc.data().gender,
                };
                console.log(p);
                setUsers((prev) => [...prev, p]);
            });
        });
    };

    return (
        <>
            <div className="flex h-full">
                <div className="flex flex-col w-1/4 h-full bg-[#EAD6C4] gap-2 p-4">
                    <Logo />
                    <h1 className="text-2xl text-[#252422] font-semibold my-6 pt-3">
                        Characteristics:{" "}
                    </h1>
                    <h2 className="text-l">Ethnicity</h2>
                    <select
                        className="bg-white p-2 rounded-lg"
                        id="ehtnicity-dropdown"
                    >
                        <option value="ethnicity">Select</option>
                        <option value="ethnicity">African-American</option>
                        <option value="ethnicity">Asian</option>
                        <option value="ethnicity">Caucasian</option>
                        <option value="ethnicity">Hispanic</option>
                        <option value="ethnicity">Other</option>
                    </select>

                    <h2 className="text-l">Age</h2>
                    <input
                        className="bg-white p-2 rounded-lg"
                        id="age-selector"
                        type="number"
                        required
                    ></input>

                    <h2 className="text-l">Gender</h2>
                    <select
                        className="bg-white p-2 rounded-lg"
                        id="gender-dropdown"
                    >
                        <option value="gender">Select</option>
                        <option value="gender">Female</option>
                        <option value="gender">Male</option>
                        <option value="gender">Other</option>
                    </select>

                    <h2 className="text-l">Location</h2>
                    <input
                        className="bg-white p-2 rounded-lg"
                        id="location-selector"
                    ></input>

                    <h2 className="text-l">Occupation</h2>
                    <input
                        className="bg-white p-2 rounded-lg"
                        id="occupation-selector"
                    ></input>

                    <button
                        onClick={() => {
                            filterUsers();
                        }}
                        className="flex justify-center items-center"
                    >
                        <span className="w-full rounded-lg mt-4 px-4 py-2 bg-[#D16D4E] hover:bg-[#D9D9D9]">
                            Confirm
                        </span>
                    </button>
                </div>
                <div className="flex flex-col w-3/4 justify-center">
                    <Participant_Info userImages={users} />
                </div>
            </div>
        </>
    );
}
