import React, { useState } from "react";
import { data } from "../db";
import VerbCard from "../components/VerbCard";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function Verbs() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const lowerSearch = searchTerm.trim().toLowerCase();

    const filteredImperfective = data.verbs.filter(
        (verb) =>
            verb.aspect === "imperfective" &&
            (verb.ru.toLowerCase().includes(lowerSearch) ||
                verb.uz.toLowerCase().includes(lowerSearch))
    );

    const filteredPerfective = data.verbs.filter(
        (verb) =>
            verb.aspect === "perfective" &&
            (verb.ru.toLowerCase().includes(lowerSearch) ||
                verb.uz.toLowerCase().includes(lowerSearch))
    );
    return (
        <div className="h-[92vh] overflow-auto px-4 pt-0 py-6">
            <div className="pb-5 sticky top-0 z-50 bg-white">
                <h2 className=" text-2xl font-bold tracking-tight md:text-3xl">
                    {t("verbs")}
                </h2>
                <Input
                    placeholder={`${t("search")}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-4"
                />
            </div>

            <Tabs defaultValue="imperfective" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 sticky top-[100px] z-40 bg-white">
                    <TabsTrigger value="imperfective">
                        {t("imperfective")} ({filteredImperfective.length})
                    </TabsTrigger>
                    <TabsTrigger value="perfective">
                        {t("perfective")} ({filteredPerfective.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="imperfective">
                    {filteredImperfective.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                            <p className="text-lg">{t("not_available")}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {filteredImperfective.map((verb) => (
                                <VerbCard key={verb.id} verb={verb} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="perfective">
                    {filteredPerfective.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                            <p className="text-lg">{t("not_available")}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {filteredPerfective.map((verb) => (
                                <VerbCard key={verb.id} verb={verb} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
