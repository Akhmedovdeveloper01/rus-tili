import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { data } from "@/db";
import { useTranslation } from "react-i18next";

export default function CardGame() {
    const { t } = useTranslation();
    const navigation = useNavigate();
    const [question, setQuestion] = useState({});
    const [choice, setChoice] = useState([]);
    const [lang, setLang] = useState("ru");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [corAnswer, setCorAnswer] = useState(0);
    const [noCorAnswer, setNoCorAnswer] = useState(0);
    const [usedWords, setUsedWords] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [wrongCard, setWrongCard] = useState(false);
    const [remaining, setRemaining] = useState(0);
    function randomWord() {
        const words = data.words;

        const availableWords = words.filter(
            (word) => !usedWords.includes(word.id)
        );

        if (availableWords.length === 0) {
            alert("O‘yin tugadi! 🎉");
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const correctWord = availableWords[randomIndex];

        const wrongAnswers = words
            .filter((word) => word.id !== correctWord.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const allChoices = [...wrongAnswers, correctWord].sort(
            () => 0.5 - Math.random()
        );
        setRemaining(availableWords.length);
        setQuestion(correctWord);
        setChoice(allChoices);
        setIsDialogOpen(true);
    }

    function checkAnswer(id) {
        setSelectedCard(id);
        if (id === question?.id) {
            setCorAnswer((prev) => prev + 1);
            setUsedWords((prev) => {
                const newUsed = [...prev, question.id];
                setRemaining(data.words.length - newUsed.length);
                return newUsed;
            });
            setSelectedCard(null);
            randomWord();
            setIsDialogOpen(false);
        } else {
            setWrongCard(true);
            setTimeout(() => {
                setNoCorAnswer((prev) => prev - 1);
                setWrongCard(false);
                setSelectedCard(null);
                randomWord();
                setIsDialogOpen(false);
            }, 1500);
        }
    }

    useEffect(() => {
        randomWord();
        setCorAnswer(0);
        setNoCorAnswer(0);
    }, []);
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="hidden md:block">
                    {choice.length && !isDialogOpen ? (
                        <Button
                            variant="outline"
                            onClick={() => navigation(-1)}
                        >
                            {t("back")}
                        </Button>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex justify-between flex-col md:hidden">
                    <div className="flex justify-between">
                        {choice.length && !isDialogOpen ? (
                            <Button
                                variant="outline"
                                onClick={() => navigation(-1)}
                            >
                                Back
                            </Button>
                        ) : (
                            ""
                        )}

                        {choice.length && !isDialogOpen ? (
                            <div className="flex items-center border border-md rounded-md px-3 gap-3">
                                <p>
                                    {data.words.length} / {remaining}
                                </p>
                                <p className="text-red-600">{noCorAnswer}</p>
                                <p className="text-green-600">{corAnswer}</p>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <h2 className="text-[25px] text-center w-full mt-3 break-words">
                        {!isDialogOpen && question[lang]}
                    </h2>
                </div>

                <h2 className="hidden md:block text-[25px] text-center w-8/12 break-words">
                    {!isDialogOpen && question[lang]}
                </h2>

                <div className="hidden md:block">
                    {choice.length && !isDialogOpen ? (
                        <div className="flex items-center border border-md rounded-md px-3 gap-3">
                            <p>
                                {data.words.length} / {remaining}
                            </p>
                            <p className="text-red-600">{noCorAnswer}</p>
                            <p className="text-green-600">{corAnswer}</p>
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription className={"my-5"}>
                                {t("card_game_dialog")}
                            </DialogDescription>
                            <DialogTitle className="flex justify-between gap-3 mt-3">
                                <Button
                                    className="w-[50%]"
                                    onClick={() => {
                                        setLang("uz");
                                        setIsDialogOpen(false);
                                    }}
                                >
                                    {t("uz")}
                                </Button>
                                <Button
                                    className="w-[50%]"
                                    onClick={() => {
                                        setLang("ru");
                                        setIsDialogOpen(false);
                                    }}
                                >
                                    {t("ru")}
                                </Button>
                            </DialogTitle>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {!isDialogOpen &&
                    choice.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className={`p-3 border border-md rounded-md 
                              ${
                                  wrongCard && selectedCard === item.id
                                      ? "border-red-500 animate-shake"
                                      : "border-gray-300"
                              } 
                              cursor-pointer transition`}
                                onClick={() => {
                                    if (!selectedCard) checkAnswer(item.id);
                                }}
                            >
                                <h3>{lang == "ru" ? item.uz : item.ru}</h3>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
