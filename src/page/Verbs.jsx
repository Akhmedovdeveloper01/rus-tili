import React from "react";
import { data } from "../db";
import VerbCard from "../components/VerbCard";
import { useTranslation } from "react-i18next";
export default function Verbs() {
    const { t } = useTranslation();
    return (
        <div className="h-[92vh] overflow-scroll">
            <h2 className="mb-4">{t("verbs")}</h2>
            <div className="flex flex-wrap w-full gap-2">
                {data.verbs.map((verb) => {
                    return <VerbCard key={verb.id} verb={verb} />;
                })}
            </div>
        </div>
    );
}
