import { db } from "@/app/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useState, useEffect } from "react";

interface participants {
    name: string;
    // age: number;
    // occupation: string;
    // location: string;
    // gender: string;
    image: string;
}

export default function Participant_Info() {

    const [userImages, setUserImages] = useState<participants[]>([]);

    useEffect(() => {
        setUserImages([]);
        const q = query(collection(db, "users"));
        getDocs(q).then((qs) => {
            qs.forEach((doc) => {
                console.log(doc.data().image);
                const p = {image: doc.data().image, name: doc.data().name};
                setUserImages(prev => [...prev, p]);
            });
        });
    }, []);


    return (
        <div className="flex justify-center items-center">  
            <div className="flex flex-col w-2/3 gap-12">
                <h3 className="relative text-4xl pb-12 font-bold">Participants</h3>
                {userImages.map((p,key) => (
                    <div key={key} className="bg-[#D9D9D9] p-4 gap-3 rounded-lg font-semibold flex">
                        <img src={p.image} alt="" className="w-12 h-auto rounded-full"/>
                        <div>{p.name}</div>
                    </div> 
                ))}
                
            </div>
                
        </div>
    );
}
