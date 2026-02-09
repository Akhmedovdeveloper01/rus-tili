import React from "react";
import { data } from "../db";
import VerbCard from "../components/VerbCard";
export default function Verbs() {
    return (
        <div className="h-screen overflow-scroll">
            <div className="flex flex-wrap w-full gap-2">
                {data.verbs.map((verb) => {
                    return <VerbCard verb={verb} />;
                })}
            </div>
        </div>
    );
}
