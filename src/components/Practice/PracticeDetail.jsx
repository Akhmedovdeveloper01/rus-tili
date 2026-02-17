import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { lessons } from "@/db";
import ReorderExercise from "./ReorderExercise";
import WriteExercise from "./WriteExercise";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

export default function PracticeDetail() {
    const { id } = useParams();
    const { t } = useTranslation();
    const lessonId = Number(id);
    const navigation = useNavigate();
    const lesson = useMemo(
        () => lessons.find((l) => l.id === lessonId),
        [lessonId]
    );

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    if (!lesson) {
        return <div>Dars topilmadi</div>;
    }

    const currentExercise = lesson.exercises[currentExerciseIndex];

    const handleNext = () => {
        if (currentExerciseIndex < lesson.exercises.length - 1) {
            setCurrentExerciseIndex((prev) => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    {score == 0 ? "Javob no to'g'ri" : "To'g'ri"}
                </h1>

                <div
                    className={`${
                        score == 0 ? "bg-red-200" : "bg-green-100"
                    }  p-6 rounded-xl`}
                >
                    {t("result")}: {score} / {lesson.exercises.length}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigation(-1)}>
                    {t("back")}
                </Button>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
            </div>
            <div className="bg-muted p-4 rounded-xl">
                <p>{lesson.explanation.rule}</p>
            </div>
            <div className="border p-5 rounded-xl space-y-4">
                <h2 className="font-semibold">
                    {t("exercises")} {currentExerciseIndex + 1} /{" "}
                    {lesson.exercises.length}
                </h2>

                <p className="text-lg">{currentExercise.question}</p>

                {currentExercise.type === "choose" &&
                    currentExercise.options.map((option, index) => (
                        <button
                            key={index}
                            disabled={selectedAnswer !== null}
                            onClick={() => {
                                setSelectedAnswer(index);

                                if (index === currentExercise.correctAnswer) {
                                    setIsCorrect(true);
                                    setScore((prev) => prev + 1);
                                } else {
                                    setIsCorrect(false);
                                }
                            }}
                            className={`block w-full border p-2 rounded-lg mb-2
                ${
                    selectedAnswer === index
                        ? isCorrect
                            ? "bg-green-200"
                            : "bg-red-200"
                        : "hover:bg-muted"
                }
            `}
                        >
                            {option}
                        </button>
                    ))}

                {selectedAnswer !== null && (
                    <div className="mt-4 space-y-3">
                        <div
                            className={`p-3 rounded-lg ${
                                isCorrect ? "bg-green-100" : "bg-red-100"
                            }`}
                        >
                            {isCorrect
                                ? `${t("correct")} ✅`
                                : `${t("wrong")} ❌`}
                        </div>

                        <Button
                            onClick={() => {
                                setSelectedAnswer(null);
                                setIsCorrect(null);
                                handleNext();
                            }}
                            className="rounded-md w-full"
                        >
                            {t("next")}
                        </Button>
                    </div>
                )}

                {currentExercise.type === "reorder" && (
                    <div className="space-y-4">
                        <div className="flex gap-2 flex-wrap">
                            {currentExercise.words.map((word, index) => (
                                <div
                                    key={index}
                                    className="px-3 py-2 bg-muted rounded-lg border"
                                >
                                    {word}
                                </div>
                            ))}
                        </div>

                        <ReorderExercise
                            exercise={currentExercise}
                            onCorrect={() => {
                                setScore((prev) => prev + 1);
                                handleNext();
                            }}
                            onWrong={handleNext}
                        />
                    </div>
                )}

                {currentExercise.type === "write" && (
                    <WriteExercise
                        exercise={currentExercise}
                        onCorrect={() => {
                            setScore((prev) => prev + 1);
                            handleNext();
                        }}
                        onWrong={handleNext}
                    />
                )}
            </div>

            {currentExerciseIndex === lesson.exercises.length - 1 && (
                <div className="bg-green-100 p-4 rounded-xl">
                    {t("result")}: {score} / {lesson.exercises.length}
                </div>
            )}
        </div>
    );
}
