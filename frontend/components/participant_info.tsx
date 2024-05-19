import { db } from "@/app/firebase";
import {
    addDoc,
    getDocs,
    collection,
    doc,
    query,
    where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
interface Participants {
    id: string;
    name: string;
    age: number;
    occupation: string;
    location: string;
    gender: string;
    image: string;
}

interface PartProps {
    userImages: Participants[];
}

export default function Participant_Info({ userImages }: PartProps) {
    const session = useSession();
    const handleInvite = (id: string) => {
        console.log("Invited");
        console.log(userImages);

        // @ts-ignore
        const userDocRef = doc(db, "users", session?.data?.user?.id);
        const studiesCollection = collection(db, "studies");
        const q = query(
            studiesCollection,
            where("researcher", "==", userDocRef)
        );
        getDocs(q).then((querySnapshot) => {
            const studies = querySnapshot.docs.map((studyDoc) => {
                const studyData = studyDoc.data();
                // if (studyData.tags) {
                //     const tagDocs = await getTagDocuments(
                //         studyData.tags
                //     );
                //     studyData.tags = tagDocs;
                // }
                return { id: studyDoc.id, ...studyData };
            });

            console.log(studies);

            const studyID = studies[0].id;

            const studyRef = doc(db, "studies", studyID);
            console.log(id);
            // @ts-ignore
            const userRef = doc(db, "users", id);

            addDoc(collection(db, "invites"), {
                study: studyRef,
                user: userRef,
            })
                .then((newInviteRef) => {
                    // Handle success
                    alert("Invite sent!");
                    console.log(newInviteRef);
                })
                .catch((error) => {
                    // Handle error
                    console.error("Error adding document: ", error);
                });
        });
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col w-2/3 gap-12">
                <h3 className="relative text-4xl pb-12 font-bold">
                    Participants
                </h3>
                {userImages.map((p, key) => (
                    <div
                        key={key}
                        className="bg-[#D9D9D9] p-4 gap-3 rounded-lg font-semibold flex items-center justify-between"
                    >
                        <img
                            src={p.image}
                            alt=""
                            className="w-12 h-auto rounded-full"
                        />
                        <div>{p.name}</div>
                        <div>
                            Age: {p.age}, Gender: {p.gender}, Location:{" "}
                            {p.location}, Occupation: {p.occupation}
                        </div>
                        <div
                            className="hover:cursor-pointer ml-8 bg-tertiary text-white px-4 py-2 rounded-md"
                            onClick={() => handleInvite(p.id)}
                        >
                            Invite
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
