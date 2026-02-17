import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function PracticeCard({ item }) {
    const { t } = useTranslation();
    const [showTable, setShowTable] = useState(false);
    const [showExamples, setShowExamples] = useState(false);

    return (
        <div className="border rounded-xl p-5 shadow-sm bg-background flex flex-col gap-3">
            <div>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-sm text-muted-foreground">
                    {item.description}
                </p>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
                <p>
                    <strong>📌 {t("rule")}:</strong> {item.explanation.rule}
                </p>

                {item.explanation.structure && (
                    <p>
                        <strong>📐 {t("structure")}:</strong>{" "}
                        {item.explanation.structure}
                    </p>
                )}

                {item.explanation.example_formula && (
                    <p>
                        <strong>📝 {t("formula")}:</strong>{" "}
                        {item.explanation.example_formula}
                    </p>
                )}
            </div>

            {item.pronouns && item.pronouns.length > 0 && (
                <div>
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold mb-2">🔤 Pronouns</h3>
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
                    </div>
                    {showTable && (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted">
                                    <TableHead>{t("ru")}</TableHead>
                                    <TableHead>{t("uz")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {item.pronouns.map((p, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{p.ru}</TableCell>
                                        <TableCell className="text-primary font-medium">
                                            {p.uz}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            )}

            <div>
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold mb-2">📚 Examples</h3>
                    <button
                        onClick={() => setShowExamples(!showExamples)}
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
                </div>
                {showExamples && (
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                                <TableHead>{t("ru")}</TableHead>
                                <TableHead>{t("uz")}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {item.examples.map((example, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {example.ru}
                                    </TableCell>
                                    <TableCell className="text-lg font-semibold text-primary">
                                        {example.uz}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            <div className="flex justify-between items-center border-t pt-3">
                <span className="text-sm text-muted-foreground">
                    🎯 {item.exercises.length} {t("exercises")}
                </span>

                <NavLink to={`/practice/${item.id}`}>
                    <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm">
                       {t("start")}
                    </button>
                </NavLink>
            </div>
        </div>
    );
}
