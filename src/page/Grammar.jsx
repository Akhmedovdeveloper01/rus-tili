import { adjectivesAgreement } from "@/db";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Grammar() {
    const { t } = useTranslation();
    return (
        <div className="h-[92vh] overflow-auto">
            <div className="mx-auto max-w-3xl space-y-10 pb-16">
                <div className="space-y-3 text-center sm:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {adjectivesAgreement.title}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {adjectivesAgreement.description}
                    </p>
                </div>
                <Card className="border-2">
                    <CardHeader className="pb-3">
                        <CardTitle>Сифат қандай ўзгаради?</CardTitle>
                        <CardDescription>
                            Сифат отнинг **жинси** ва **сони**га қараб ўзгаради
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[320px] border-collapse text-sm sm:text-base">
                                <thead>
                                    <tr className="border-b bg-muted/40">
                                        <th className="p-3 text-left font-medium">
                                            Отнинг жинси / сони
                                        </th>
                                        <th className="p-3 text-left font-medium">
                                            Сифат якуни
                                        </th>
                                        <th className="p-3 text-left font-medium">
                                            Мисол (ending)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="p-3 font-medium">
                                            Мужской род (erak)
                                        </td>
                                        <td className="p-3">
                                            **-ый** / **-ий** / **-ой**
                                        </td>
                                        <td className="p-3 text-muted-foreground">
                                            нов**ый**, син**ий**, больш**ой**
                                        </td>
                                    </tr>
                                    <tr className="border-b bg-muted/20">
                                        <td className="p-3 font-medium">
                                            Женский род
                                        </td>
                                        <td className="p-3">
                                            **-ая** / **-яя**
                                        </td>
                                        <td className="p-3 text-muted-foreground">
                                            нов**ая**, син**яя**
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-3 font-medium">
                                            Средний род
                                        </td>
                                        <td className="p-3">
                                            **-ое** / **-ее**
                                        </td>
                                        <td className="p-3 text-muted-foreground">
                                            нов**ое**, син**ее**
                                        </td>
                                    </tr>
                                    <tr className="bg-muted/40">
                                        <td className="p-3 font-medium">
                                            Кўплик (hamma жинслар учун)
                                        </td>
                                        <td className="p-3">
                                            **-ые** / **-ие**
                                        </td>
                                        <td className="p-3 text-muted-foreground">
                                            нов**ые**, син**ие**
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">{t("exircise")}</h2>

                    {adjectivesAgreement.examples.map((item, i) => (
                        <Card key={i} className="overflow-hidden">
                            <CardHeader className="bg-muted/30 pb-2">
                                <CardTitle className="text-xl">
                                    {item.adjective}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                    {item.forms.map((phrase, idx) => {
                                        const gender = [
                                            "Мужской",
                                            "Женский",
                                            "Средний",
                                            "Кўплик",
                                        ][idx];
                                        return (
                                            <div
                                                key={idx}
                                                className="rounded-md border bg-card p-3 shadow-sm hover:border-primary/50 transition-colors"
                                            >
                                                <div className="mb-1 text-xs font-medium text-muted-foreground">
                                                    {gender}
                                                </div>
                                                <div className="text-lg font-medium">
                                                    {phrase}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                    <NavLink
                        className={"w-full"}
                        to={`/grammar/${adjectivesAgreement.id}`}
                    >
                        <button className="px-4 py-2 w-full rounded-lg bg-primary text-white text-sm">
                            🎯 {adjectivesAgreement?.exercises?.length}{" "}
                            {t("exercises")}
                        </button>
                    </NavLink>
                </div>
                {/* <div className="flex flex-col gap-4 sm:flex-row sm:justify-between pt-8 border-t">
                    <Button variant="outline" size="lg">
                        ← Oldingi mavzu
                    </Button>
                    <Button size="lg">Кейинги машқлар →</Button>
                </div> */}
            </div>
        </div>
    );
}
