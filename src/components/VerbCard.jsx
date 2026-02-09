import React, { useState } from "react";
import VerbPronounsTable from "./Pronouns";

export default function VerbCard({ verb }) {
    const [tense, setTense] = useState("present");

    return (
        <div className="p-4 shadow-md mb-4 w-full max-w-md rounded-md border">
            <h3 className="text-xl font-bold mb-2">
                {verb.ru} - {verb.uz}
            </h3>

            <div className="flex gap-2 mb-3">
                {["present", "past", "future"].map((t) => (
                    <button
                        key={t}
                        className={`px-3 py-1 rounded-md border ${
                            tense === t ? "bg-primary text-white" : "bg-white"
                        }`}
                        onClick={() => setTense(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <VerbPronounsTable verb={verb} tense={tense} />
        </div>
    );
}
