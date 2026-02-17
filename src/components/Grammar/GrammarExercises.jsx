import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function GrammarExercises({ exercises }) {
    const { t } = useTranslation();
    const navigation = useNavigate();
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleInputChange = (exerciseId, value) => {
        setUserAnswers((prev) => ({ ...prev, [exerciseId]: value.trim() }));
    };

    const handleRadioChange = (exerciseId, value) => {
        setUserAnswers((prev) => ({ ...prev, [exerciseId]: value }));
    };

    const isAnswerCorrect = (exercise) => {
        const userAnswer = userAnswers[exercise.id]?.toLowerCase().trim() || "";
        const correctAnswer = exercise.correctAnswer.toLowerCase().trim();
        return userAnswer === correctAnswer;
    };

    const getResults = () => {
        let correctCount = 0;
        exercises.forEach((ex) => {
            if (isAnswerCorrect(ex)) correctCount++;
        });

        return {
            correct: correctCount,
            total: exercises.length,
            percentage: Math.round((correctCount / exercises.length) * 100),
        };
    };

    const results = getResults();
    const allQuestionsAnswered = exercises.every(
        (ex) => userAnswers[ex.id] !== undefined
    );

    return (
        <div className="h-[90vh] overflow-auto">
            <div className="space-y-10">
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => navigation(-1)}>{t("back")}</Button>
                    <h2 className="text-2xl font-bold tracking-tight">
                        {t("exercises")}
                    </h2>
                </div>

                {exercises.map((exercise) => {
                    const userAnswer = userAnswers[exercise.id];
                    const isCorrect = showResults
                        ? isAnswerCorrect(exercise)
                        : undefined;

                    return (
                        <Card
                            key={exercise.id}
                            className={cn(
                                "overflow-hidden transition-all duration-200",
                                showResults &&
                                    (isCorrect
                                        ? "border-green-400/60 bg-green-50/40"
                                        : "border-red-400/60 bg-red-50/40")
                            )}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                                        {exercise.id}
                                    </div>
                                    <CardTitle className="text-lg">
                                        {exercise.type === "fill"
                                            ? "Бўшлиқни тўлдиринг"
                                            : "Тўғри жавобни танланг"}
                                    </CardTitle>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-5">
                                <div className="text-xl font-medium leading-relaxed">
                                    {exercise.question
                                        .split("_____")
                                        .map((part, index, array) => (
                                            <span key={index}>
                                                {part}
                                                {index < array.length - 1 && (
                                                    <span className="inline-block w-32 border-b-2 border-dashed border-primary/70 mx-3 align-middle" />
                                                )}
                                            </span>
                                        ))}
                                </div>

                                {exercise.type === "fill" ? (
                                    <div className="max-w-md">
                                        <Input
                                            value={userAnswer || ""}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    exercise.id,
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Жавобингиз..."
                                            disabled={showResults}
                                            className={cn(
                                                "text-lg",
                                                showResults &&
                                                    (isCorrect
                                                        ? "border-green-500 focus-visible:ring-green-500"
                                                        : "border-red-500 focus-visible:ring-red-500")
                                            )}
                                        />
                                    </div>
                                ) : null}

                                {exercise.type === "multiple" &&
                                exercise.options ? (
                                    <RadioGroup
                                        value={userAnswer}
                                        onValueChange={(val) =>
                                            handleRadioChange(exercise.id, val)
                                        }
                                        disabled={showResults}
                                        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                                    >
                                        {exercise.options.map((option) => {
                                            const isSelected =
                                                userAnswer === option;
                                            const isRightAnswer =
                                                option ===
                                                exercise.correctAnswer;

                                            return (
                                                <div
                                                    key={option}
                                                    className={cn(
                                                        "flex items-center space-x-3 rounded-lg border p-4 transition-colors",
                                                        showResults &&
                                                            isRightAnswer &&
                                                            "border-green-500 bg-green-50/60",
                                                        showResults &&
                                                            isSelected &&
                                                            !isRightAnswer &&
                                                            "border-red-500 bg-red-50/60",
                                                        !showResults &&
                                                            "hover:bg-muted/50 cursor-pointer"
                                                    )}
                                                >
                                                    <RadioGroupItem
                                                        value={option}
                                                        id={`${exercise.id}-${option}`}
                                                        className="border-2"
                                                    />
                                                    <Label
                                                        htmlFor={`${exercise.id}-${option}`}
                                                        className="flex-1 cursor-pointer text-base font-medium"
                                                    >
                                                        {option}
                                                    </Label>
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                ) : null}

                                {showResults && (
                                    <div className="flex items-center gap-3 pt-2 text-base font-medium">
                                        {isCorrect ? (
                                            <>
                                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                                                <span className="text-green-700">
                                                    {`${t("correct")} ✅`}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-6 w-6 text-red-600" />
                                                <span className="text-red-700">
                                                    {`${t("wrong")} ❌`}
                                                    <strong className="font-bold ml-2">
                                                        {exercise.correctAnswer}
                                                    </strong>
                                                </span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}

                <div className="flex flex-col items-center justify-between gap-3 border-t pt-4 sm:flex-row">
                    {showResults ? (
                        <div className="text-xl font-semibold">
                            Натижа: {results.correct} / {results.total} —{" "}
                            <span className="text-primary">
                                {results.percentage}%
                            </span>
                        </div>
                    ) : (
                        <div className="text-muted-foreground">
                            Барча саволларга жавоб беринг, сўнг натижани
                            кўришингиз мумкин
                        </div>
                    )}

                    {!showResults ? (
                        <Button
                            size="lg"
                            disabled={!allQuestionsAnswered}
                            onClick={() => setShowResults(true)}
                            className="min-w-[180px]"
                        >
                            Натижани кўрсатиш
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => {
                                setUserAnswers({});
                                setShowResults(false);
                            }}
                            className="min-w-[180px]"
                        >
                            Яна уриниб кўриш
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
