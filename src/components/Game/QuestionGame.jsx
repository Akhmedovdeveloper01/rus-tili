import { data } from "@/db";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { language } from "./data";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getStorage, setStorage } from "@/config/LocalStorage";
import { RotateCcw } from "lucide-react";
export default function QuestionGame() {
    const { t } = useTranslation();
    const navigation = useNavigate();
    const [allData, setAllData] = useState([]);
    const [singleData, setSingleData] = useState({});
    const [lang, setLang] = useState("uz");
    const [cardConvert, setCardConvert] = useState(false);
    const [view, setView] = useState(false);
    const [foundWords, setFoundWords] = useState(
        getStorage("foundWords") || []
    );
    const [notFoundWords, setNotFoundWords] = useState(
        getStorage("notFoundWords") || []
    );

    const onClier = () => {
        setStorage("foundWords", []);
        setStorage("notFoundWords", []);
    };

    useEffect(() => {
        const words = data.words;
        setAllData(words);

        if (words.length) {
            const index = Math.floor(Math.random() * words.length);
            setSingleData(words[index]);

            const langIndex = Math.floor(Math.random() * language.length);
            setLang(language[langIndex]);
        }
        onClier();

        setView(false);
    }, []);

    const handleCheck = (status) => {
        if (status && allData.length) {
            setFoundWords((prev) => {
                const updated = [...prev, singleData];
                setStorage("foundWords", updated);
                return updated;
            });
        } else {
            setNotFoundWords((prev) => {
                const updated = [...prev, singleData];
                setStorage("notFoundWords", updated);
                return updated;
            });
        }

        setAllData((prev) => {
            const updated = prev.filter((item) => item.id !== singleData.id);

            if (updated.length > 0) {
                const index = Math.floor(Math.random() * updated.length);
                setSingleData(updated[index]);

                const langIndex = Math.floor(Math.random() * language.length);
                setLang(language[langIndex]);
            } else {
                setSingleData({});
            }

            return updated;
        });

        setCardConvert(false);
    };

    return (
        <div className="h-[92vh] overflow-auto">
            {allData.length && !view ? (
                <Button variant="outline" onClick={() => navigation(-1)}>
                    {t("back")}
                </Button>
            ) : (
                ""
            )}

            {allData.length ? (
                <div
                    className={`${
                        cardConvert && "animate-convert"
                    } perspective-1000 border border-md shadow-md p-3 w-full sm:w-8/12 md:w-6/12 h-96 mx-auto mt-4 relative`}
                >
                    {!cardConvert ? (
                        <div>
                            <h2 className="text-center text-xl md:text-2xl mt-10">
                                {singleData[lang]}
                            </h2>
                            <Button
                                className="w-full text-md absolute bottom-0 left-0 right-0 rounded-none border-none"
                                variant="outline"
                                onClick={() => setCardConvert(true)}
                            >
                                {t("view_answer")}
                            </Button>
                        </div>
                    ) : (
                        <div className="h-full relative">
                            <h2
                                className="text-center text-xl md:text-2xl mt-10"
                                style={{ transform: "rotateY(180deg)" }}
                            >
                                {lang == "uz" ? singleData?.ru : singleData?.uz}
                            </h2>
                            <div className="flex gap-3 justify-between absolute bottom-10 left-0 right-0">
                                <Button
                                    className="w-[50%] bg-green-600 hover:bg-green-500 text-white"
                                    style={{ transform: "rotateY(180deg)" }}
                                    onClick={() => handleCheck(true)}
                                >
                                    {t("correct")}
                                </Button>
                                <Button
                                    className="w-[50%]"
                                    style={{ transform: "rotateY(180deg)" }}
                                    variant="destructive"
                                    onClick={() => handleCheck(false)}
                                >
                                    {t("wrong")}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex align-middle flex-col justify-center gap-5 border border-md shadow-md p-3 w-full sm:w-8/12 md:w-6/12 h-96 mx-auto mt-4 relative">
                    <h2 className="text-center">{t("finish_game_2")}</h2>
                    <Button
                        onClick={() => setView(true)}
                        className="w-full mt-3"
                    >
                        {t("view_incorrect_answers")}
                    </Button>
                    {view && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                onClier();
                                navigation(-1);
                            }}
                        >
                            <RotateCcw className="mr-2" size={18} />
                            {t("restart")}
                        </Button>
                    )}
                </div>
            )}

            {!allData.length && notFoundWords.length && view && (
                <ul>
                    {notFoundWords.map((item) => {
                        return (
                            <li key={item.id}>
                                <h2 className="text-center md:text-2xl mt-10">
                                    {item.ru} -{item.uz}
                                </h2>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
