"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Logo from "@/components/logo";
import { useState } from "react";
import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase.ts";
import Image from "next/image";

interface Tag {
    name: string;
    // Add any other properties if needed
}

export default function Home() {
    const session = useSession();
    const [page, setPage] = useState(0);
    const [listOfTags, setListOfTags] = useState([]);
    const q = query(collection(db, "tags"));
    const [tags, loading, error] = useCollectionData(q);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]); // State to track the selected tags
    const [selectedMode, setSelectedMode] = useState<string>(""); // State to track the selected tags

    const handleTagClick = (tag: Tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(
                selectedTags.filter((selectedTag) => selectedTag !== tag)
            ); // Deselect tag if already selected
        } else {
            setSelectedTags([...selectedTags, tag]); // Select tag if not already selected
        }
    };

    const handleModeClick = (mode: string) => {
        setSelectedMode(mode);
    };

    if (session.status === "loading") {
        return <div>Loading...</div>;
    }

    if (session.status === "unauthenticated") {
        redirect("/login");
    }

    const handleClick = () => {
        setPage(page + 1);
        if (page + 1 === 2) {
            console.log(selectedTags);
        }
    };

    switch (page) {
        case 0:
            return (
                <div className="flex px-10 py-8">
                    <header className="absolute top-8 left-10">
                        <Logo />
                    </header>
                    <div className="flex flex-col items-center gap-10 w-full h-full mt-36">
                        <h1 className="font-sans font-medium text-5xl mb-5">
                            What is your research about?
                        </h1>
                        <form className="flex flex-col items-center gap-5 w-full">
                            <input
                                type="text"
                                id="studyName"
                                name="studyName"
                                placeholder="Study Name"
                                className="w-5/12 h-12 border-2 border-black rounded-md px-3"
                            />
                            <input
                                type="text"
                                id="studyDesc"
                                name="studyDesc"
                                placeholder="Description"
                                className="h-12 w-5/12 border-2 border-black rounded-md px-3"
                            />
                            <div className="flex flex-row justify-end w-5/12">
                                <button
                                    onClick={handleClick}
                                    className="bg-black text-white px-6 py-2 rounded-md hover:cursor-pointer"
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        case 1:
            return (
                <div className="flex px-10 py-8">
                    <header className="absolute top-8 left-10">
                        <Logo />
                    </header>
                    <div className="flex flex-col items-center gap-10 w-full h-full mt-36">
                        <h1 className="font-sans font-medium text-5xl mb-5 w-8/12 text-center">
                            Select the tags that represent your project the
                            best:
                        </h1>
                        <div className="flex flex-wrap w-10/12 gap-4 items-center justify-center">
                            {tags
                                ? tags.map((tag, i) => (
                                      <div
                                          className={`flex justify-center items-center gap-3 px-4 py-2 rounded-full text-white ${
                                              selectedTags.some(
                                                  (selectedTag) =>
                                                      selectedTag === tag
                                              )
                                                  ? "bg-blue-500"
                                                  : "bg-[#404040]"
                                          } hover:cursor-pointer`}
                                          key={i}
                                          onClick={() =>
                                              handleTagClick(tag as Tag)
                                          }
                                      >
                                          <div
                                              className={`w-6 h-6 rounded-full  ${
                                                  selectedTags.some(
                                                      (selectedTag) =>
                                                          selectedTag === tag
                                                  )
                                                      ? "bg-lime-400"
                                                      : "bg-orange-500"
                                              }`}
                                          ></div>
                                          {tag.name}
                                      </div>
                                  ))
                                : "Loading..."}
                        </div>
                        <button
                            onClick={handleClick}
                            className="bg-black text-white px-6 py-2 rounded-md hover:cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className="flex px-10 py-8">
                    <header className="absolute top-8 left-10">
                        <Logo />
                    </header>
                    <div className="flex flex-col items-center gap-10 w-full h-full mt-36">
                        <h1 className="font-sans font-medium text-5xl mb-5 w-8/12 text-center">
                            How will this study be conducted?
                        </h1>
                        <div className="flex gap-8">
                            <div
                                className={`flex flex-col gap-3 items-center justify-center w-80 h-80 rounded-md text-center px-3 hover:cursor-pointer ${
                                    selectedMode === "online"
                                        ? "bg-[#D9D9D9]"
                                        : "bg-[#adadad]"
                                } hover:cursor-pointer`}
                                onClick={() => handleModeClick("online")}
                            >
                                <Image
                                    src="/laptop.svg"
                                    width={95}
                                    height={95}
                                    alt="Picture of a laptop"
                                />
                                <div className="font-bold text-2xl">Online</div>
                                <p>
                                    The session will be at a physical location,
                                    specified by you or the participant.
                                </p>
                            </div>
                            <div
                                className={`flex flex-col gap-3 items-center justify-center w-80 h-80 rounded-md text-center px-3 hover:cursor-pointer ${
                                    selectedMode === "offline"
                                        ? "bg-[#D9D9D9]"
                                        : "bg-[#adadad]"
                                } hover:cursor-pointer`}
                                onClick={() => handleModeClick("offline")}
                            >
                                <Image
                                    src="/map-pin.svg"
                                    width={95}
                                    height={95}
                                    alt="Picture of the guinea pig logo"
                                />
                                <div className="font-bold text-2xl">
                                    Offline
                                </div>
                                <p>
                                    The participant needs to access a link for
                                    an online interview or to complete an online
                                    task.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleClick}
                            className="bg-black text-white px-6 py-2 rounded-md hover:cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            );
    }
}
