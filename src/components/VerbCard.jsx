import React, { useState } from "react";
import VerbPronounsTable from "./Pronouns";
import { useTranslation } from "react-i18next";

export default function VerbCard({ verb }) {
    const [tense, setTense] = useState("present");
    const { t } = useTranslation();
    return (
        <div className="p-4 shadow-md mb-4 w-full max-w-md rounded-md border">
            <h3 className="text-xl font-bold mb-2">
                {verb.ru} - {verb.uz}
            </h3>

            <div className="flex gap-2 mb-3">
                {["present", "past", "future"].map((type) => (
                    <button
                        key={type}
                        className={`px-3 py-1 rounded-md border ${
                            tense === type
                                ? "bg-primary text-white"
                                : "bg-white"
                        }`}
                        onClick={() => setTense(type)}
                    >
                        {t(type)}
                    </button>
                ))}
            </div>

            <VerbPronounsTable verb={verb} tense={tense} />
        </div>
    );
}
