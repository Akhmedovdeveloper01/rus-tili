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

const pronounsList = [
    { id: 1, label: "я", type: "singular" },
    { id: 2, label: "ты", type: "singular" },
    { id: 3, label: "он/она", type: "singular" },
    { id: 4, label: "мы", type: "plural" },
    { id: 5, label: "вы", type: "plural" },
    { id: 6, label: "они", type: "plural" },
];

export default function VerbPronounsTable({ verb, tense }) {
    const { t } = useTranslation();
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
                    {pronounsList.map((p) => {
                        let form;
                        if (tense === "past") {
                            if (
                                p.label === "я" ||
                                p.label === "ты" ||
                                p.label === "он/она"
                            ) {
                                if (p.label === "он/она")
                                    form =
                                        verb.forms.past.male +
                                        " / " +
                                        verb.forms.past.female;
                                else if (p.label === "я")
                                    form = verb.forms.past.male;
                                else if (p.label === "ты")
                                    form = verb.forms.past.male;
                            } else {
                                form = verb.forms.past.plural;
                            }
                        } else {
                            form = verb.forms[tense][p.label] || "-";
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
