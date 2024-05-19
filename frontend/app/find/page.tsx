"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "../../components/logo";
import Participant_Info from "../../components/participant_info";

export default function Login() {
    return (
        <>  
            <div className="flex h-full">
                
                <div className="flex flex-col w-1/4 h-full bg-[#EAD6C4] gap-2 p-4">
                    <Logo/>
                    <h1 className="text-2xl text-[#252422] font-semibold my-6 pt-3">Characteristics: </h1>
                    <h2 className="text-l">Ethnicity</h2>
                        <select className="bg-white p-2 rounded-lg" id="ehtnicity-dropdown">
                            <option value="ethnicity">Select</option>
                            <option value="ethnicity">African-American</option>
                            <option value="ethnicity">Asian</option>
                            <option value="ethnicity">Caucasian</option>
                            <option value="ethnicity">Hispanic</option>
                            <option value="ethnicity">Other</option>
                        </select>

                    <h2 className="text-l">Age</h2>
                        <input className="bg-white p-2 rounded-lg" id="age-selector" type="number" required>
                            
                        </input>

                    <h2 className="text-l">Gender</h2>
                        <select className="bg-white p-2 rounded-lg" id="gender-dropdown">
                            <option value="gender">Select</option>
                            <option value="gender">Female</option>
                            <option value="gender">Male</option>
                            <option value="gender">Other</option>
                        </select>

                    <h2 className="text-l">Location</h2>
                        <input className="bg-white p-2 rounded-lg" id="location-selector">
                        </input>
                    
                    <h2 className="text-l">Occupation</h2>
                    <input className="bg-white p-2 rounded-lg" id="occupation-selector">
                    </input>
                        
                    <button className="flex justify-center items-center">
                        <span className="w-full rounded-lg mt-4 px-4 py-2 bg-[#D16D4E] hover:bg-[#D9D9D9]">Confirm</span>
                    </button>
                </div>
                <div className="flex flex-col w-3/4 justify-center">
                    
                    
                    <Participant_Info/>
                  
                    
                </div>
            </div>
        </>
    );
}
