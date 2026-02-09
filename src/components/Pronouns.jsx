import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";

const standardPronouns = [
    { id: 1, label: "я", key: "я" },
    { id: 2, label: "ты", key: "ты" },
    { id: 3, label: "он/она", key: "он_она" },
    { id: 4, label: "мы", key: "мы" },
    { id: 5, label: "вы", key: "вы" },
    { id: 6, label: "они", key: "они" },
];

const pastPronouns = [
    { id: 1, label: "я, ты, он (м.р.)", key: "male" },
    { id: 2, label: "я, ты, она (ж.р.)", key: "female" },
    { id: 3, label: "оно (ср.р.)", key: "neutral" },
    { id: 4, label: "мы, вы, они", key: "plural" },
];

export default function VerbPronounsTable({ verb, tense }) {
    const { t } = useTranslation();

    const pronouns = tense === "past" ? pastPronouns : standardPronouns;

    return (
        <div className="w-full overflow-x-auto rounded-xl border">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted">
                        <TableHead>{t("pronouns")}</TableHead>
                        <TableHead>{t("temporary_form")}</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {pronouns.map((p) => {
                        let form = "-";

                        if (tense === "past") {
                            form = verb?.forms?.past?.[p.key] || "-";
                        } else {
                            form = verb?.forms?.[tense]?.[p.key] || "-";
                        }

                        return (
                            <TableRow key={p.id}>
                                <TableCell className="font-medium">
                                    {p.label}
                                </TableCell>
                                <TableCell className="text-lg font-semibold text-primary">
                                    {form}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
