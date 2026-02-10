import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { data } from "@/db";

export default function Words() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("Yes_or_no");

    const filteredWords = data?.words?.filter((item) => {
        const matchSearch =
            item.uz.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.ru.toLowerCase().includes(searchTerm.toLowerCase());

        const matchType = selectedType ? item.type === selectedType : true;

        return matchSearch && matchType;
    });

    return (
        <div className="h-[92vh] overflow-auto pt-0">
            <div className="pb-2 sticky top-0 z-40 bg-white">
                <h2 className="text-2xl font-bold md:text-3xl">{t("words")}</h2>
            </div>

            <div className="flex justify-between pt-3 items-center sticky top-10 z-40 bg-white">
                <Input
                    placeholder={`${t("search")}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[200px] md:w-[340px]"
                />

                <Select
                    onValueChange={setSelectedType}
                    defaultValue={selectedType}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Yes_or_no">
                            {t("yes_or_no")}
                        </SelectItem>
                        <SelectItem value="Случаи_в_магазине">
                            {t("store_situations")}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <ul>
                {filteredWords.map((word) => (
                    <li
                        key={word.id}
                        className="md:w-8/12 p-3 border-b rounded-md"
                    >
                        <div className="flex justify-between">
                            <p className="w-6/12 md:text-[20px]">{word.uz}</p>
                            <p className="w-6/12 md:text-[20px]">{word.ru}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
