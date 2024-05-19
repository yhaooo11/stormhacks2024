"use client";
import { useEffect, useState } from "react";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Project {
    name: string;
    description: string;
    tags: string[];
}

export default function Dashboard() {
    const [numPending, setNumPending] = useState(0);
    const [projectList, setProjectList] = useState<Project[]>([]);
    const router = useRouter();
    const session = useSession();

    if (!session) {
        router.push("/");
    }

    useEffect(() => {
        setProjectList([
            {
                name: "Project 1",
                description: "The first project",
                tags: ["hello", "world", "cpp"],
            },
            {
                name: "Project 2",
                description: "The second project",
                tags: ["foo", "bar", "typescript"],
            },
            {
                name: "Project 3",
                description: "The third project",
                tags: ["baz", "qux", "javascript"],
            },
            {
                name: "Project 4",
                description: "The third project",
                tags: ["baz", "qux", "javascript"],
            },
        ]);
    }, []);

    return (
        <div className="flex justify-center h-screen">
            <div className="flex-col h-full w-2/3">
                <h1 className="text-4xl font-bold font-serif mt-8 mb-8">Projects</h1>
                <div className="proj h-1/5 flex justify-between gap-16">
                    <div
                        className="h-full w-1/2 border-2 border-black rounded-lg 
                    bg-gray-400"
                    ></div>
                    <div className="notis w-1/2">
                        <p className="text-xl">Notifications</p>
                        <hr className="w-full mt-10 mb-10 h-0.5 bg-black" />
                        <p className="text-lg">{numPending} Pending Requests</p>
                    </div>
                </div>
                <hr className="w-full mt-16 mb-16 h-0.5 bg-black" />
                <div className="project-list w-full">
                    {projectList.map((project, key) => (
                        <div key={key} className="pl-8 border-2 border-black rounded-lg p-4 mb-4">
                            <div className="flex mb-4">
                                {project.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-sm mr-2">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-xl font-bold">{project.name}</h2>
                            <p className="text-gray-600">{project.description}</p>
                            <button className="mt-6 bg-black text-white p-3 pr-5 pl-5 rounded-md">
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex-col"></div>
            </div>
        </div>
    );
}
