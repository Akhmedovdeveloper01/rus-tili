import React, { useState } from "react";
import VerbPronounsTable from "./Pronouns";
import { useTranslation } from "react-i18next";

export default function VerbCard({ verb }) {
    const { t } = useTranslation();
    const [tense, setTense] = useState("present");
    const [showTable, setShowTable] = useState(false);

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

            <button
                onClick={() => setShowTable(!showTable)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mt-2 mb-3 transition-colors"
            >
                <span>{showTable ? t("hidden") : t("show")}</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                        showTable ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {showTable && (
                <div className="mt-3 border-t pt-3">
                    <VerbPronounsTable verb={verb} tense={tense} />
                </div>
            )}
        </div>
    );
}
