"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    getDoc,
    getDocs,
    collection,
    doc,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase.ts";

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
}

export default function Dashboard() {
    const router = useRouter();
    const [numPending, setNumPending] = useState(0);
    const [projectList, setProjectList] = useState<any>([]);
    const session = useSession();
    const [tab, setTab] = useState("joined");
    const [invites, setInvites] = useState<any>([]);
    const [joined, setJoined] = useState<any>([]);

    async function getStudy(studyRef: any) {
        // const tagDocsPromises = tagRefs.map(async (tagRef: any) => {
        //     const tagDoc = await getDoc(tagRef);
        //     if (tagDoc.exists()) {
        //         // @ts-ignore
        //         return { id: tagDoc.id, ...tagDoc.data() };
        //     }
        // });
        const studyDoc = await getDoc(studyRef);

        if (studyDoc.exists()) {
            // @ts-ignore
            return { id: studyDoc.id, ...studyDoc.data() };
        }
    }

    async function getInvited(tagRefs: any) {
        const tagDocsPromises = tagRefs.map(async (tagRef: any) => {
            const tagDoc = await getDoc(tagRef);
            if (tagDoc.exists()) {
                // @ts-ignore
                return { id: tagDoc.id, ...tagDoc.data() };
            }
        });
        return Promise.all(tagDocsPromises);
    }

    useEffect(() => {
        if (session.status === "authenticated") {
            // @ts-ignore
            console.log(session?.data?.user?.role);

            // @ts-ignore
            if (session?.data?.user?.role == "researcher") {
                // get studies
                // @ts-ignore

                const userDocRef = doc(db, "users", session?.data?.user?.id);
                const studiesCollection = collection(db, "studies");
                const q = query(
                    studiesCollection,
                    where("researcher", "==", userDocRef)
                );
                getDocs(q)
                    .then((querySnapshot) => {
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
                        setProjectList(studies);
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
                // @ts-ignore
            } else if (session?.data?.user?.role == "participant") {
                // get studies
                // @ts-ignore
                const userDocRef = doc(db, "users", session?.data?.user?.id);
                const invitesCollection = collection(db, "invites");
                const joinedCollection = collection(db, "joinedStudies");

                const qInvites = query(
                    invitesCollection,
                    where("user", "==", userDocRef)
                );

                const qJoined = query(
                    joinedCollection,
                    where("user", "==", userDocRef)
                );

                // TODO: get two lists of studies

                // 1 invite and 1 joined

                // TODO: change study tags to strings
                // instead of references

                getDocs(qInvites)
                    .then(async (querySnapshot) => {
                        const invites = await Promise.all(
                            querySnapshot.docs.map(async (inviteDoc) => {
                                const inviteData = inviteDoc.data();
                                if (inviteData.study) {
                                    const studyDoc = await getStudy(
                                        inviteData.study
                                    );
                                    inviteData.study = studyDoc;
                                    return studyDoc;
                                }
                            })
                        );

                        console.log(invites);
                        setInvites(invites);
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });

                getDocs(qJoined)
                    .then(async (querySnapshot) => {
                        const joined = await Promise.all(
                            querySnapshot.docs.map(async (joinedDoc) => {
                                const joinedData = joinedDoc.data();
                                if (joinedData.study) {
                                    const joinedDoc = await getStudy(
                                        joinedData.study
                                    );
                                    joinedData.study = joinedDoc;
                                    return joinedDoc;
                                }
                            })
                        );

                        console.log(joined);
                        setJoined(joined);
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            }
        }
    }, [session]);

    if (session.status === "unauthenticated") {
        router.push("/login");
    }

    if (session.status === "loading") {
        return <div></div>;
    }

    return (
        // @ts-ignore
        session?.data?.user?.role === "researcher" ? (
            <div className="flex justify-center h-screen">
                <div className="flex-col h-full w-2/3">
                    <h1 className="text-4xl font-bold font-serif mt-8 mb-8">
                        Projects
                    </h1>
                    <div className="proj h-1/5 flex justify-between gap-16">
                        <div
                            className="h-full w-1/2 border-2 border-black rounded-lg 
                    bg-gray-400 text-center hover:cursor-pointer"
                            onClick={() => router.push("/start")}
                        >
                            Create a new project
                        </div>
                        <div className="notis w-1/2">
                            <p className="text-xl">Notifications</p>
                            <hr className="w-full mt-16 mb-16 h-0.5 bg-black" />
                            <p className="text-lg">
                                {numPending} Pending Requests
                            </p>
                        </div>
                    </div>
                    <hr className="w-full mt-16 mb-16 h-0.5 bg-black" />
                    <div className="project-list w-full">
                        {/* @ts-ignore */}
                        {projectList.map((project) => (
                            <div
                                key={project.id}
                                className="pl-8 border-2 border-black rounded-lg p-4 mb-4"
                            >
                                <div className="flex mb-4">
                                    {/* @ts-ignore */}
                                    {project.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-sm mr-2"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-xl font-bold">
                                    {project.title}
                                </h2>
                                <p className="text-gray-600">
                                    {project.description}
                                </p>
                                <button className="mt-6 bg-black text-white p-3 pr-5 pl-5 rounded-md">
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex-col"></div>
                </div>
            </div>
        ) : (
            <div className="flex justify-center h-screen">
                <div className="flex-col h-full w-2/3">
                    <h1 className="text-4xl font-bold font-serif mt-8 mb-8">
                        Projects
                    </h1>
                    <div className="proj">
                        <div className="flex gap-6">
                            <h2
                                className={`text-lg ${
                                    tab === "joined" ? "text-tertiary" : ""
                                } hover:cursor-pointer`}
                                onClick={() => setTab("joined")}
                            >
                                Joined
                            </h2>
                            <h2
                                className={`text-lg ${
                                    tab === "invites" ? "text-tertiary" : ""
                                } hover:cursor-pointer`}
                                onClick={() => setTab("invites")}
                            >
                                Invited
                            </h2>
                        </div>
                        {/* <div className="notis w-1/2">
                            <p className="text-xl">Notifications</p>
                            <hr className="w-full mb-6 h-0.5 bg-black" />
                            <p className="text-lg">
                                {numPending} Pending Requests
                            </p>
                        </div> */}
                    </div>
                    <hr className="w-full mt-4 mb-4 h-0.5 bg-black" />
                    <div className="project-list w-full">
                        {tab === "joined" ? (
                            joined.map((project, key) => (
                                <div
                                    key={key}
                                    className="pl-8 border-2 border-black rounded-lg p-4 mb-4"
                                >
                                    <div className="flex mb-4">
                                        {project.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-sm mr-2"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-xl font-bold">
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-600">
                                        {project.description}
                                    </p>
                                    <button className="mt-6 bg-black text-white p-3 pr-5 pl-5 rounded-md">
                                        View
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div>
                                {invites.map((invite, key) => (
                                    <div
                                        key={key}
                                        className="pl-8 border-2 border-black rounded-lg p-4 mb-4"
                                    >
                                        <div className="flex mb-4">
                                            {invite.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-sm mr-2"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h2 className="text-xl font-bold">
                                            {invite.title}
                                        </h2>
                                        <p className="text-gray-600">
                                            {invite.description}
                                        </p>
                                        <button className="mt-6 mr-4 bg-black text-white p-3 pr-5 pl-5 rounded-md">
                                            Accept
                                        </button>
                                        <button className="mt-6 bg-black text-white p-3 pr-5 pl-5 rounded-md">
                                            Decline
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex-col"></div>
                </div>
            </div>
        )
    );
}
