import { data } from "@/db";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Words() {
    const { t } = useTranslation();

    return (
        <div className="h-[94vh] overflow-auto px-4 pt-0 py-6">
            <h2 className="mb-4">{t("words")}</h2>
            <ul>
                {data.words.map((word) => {
                    return (
                        <li
                            key={word.id}
                            className=" md:w-6/12 p-3 border-b rounded-md"
                        >
                            <div className="w-full flex justify-between">
                                <p className="w-6/12 text-[20px]">{word.uz}</p>
                                <p className="w-6/12 text-[20px]">{word.ru} </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
