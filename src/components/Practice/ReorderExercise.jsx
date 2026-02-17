import { useState } from "react";

export default function ReorderExercise({ exercise, onCorrect, onWrong }) {
    const [value, setValue] = useState("");

    const checkAnswer = () => {
        if (value.trim() === exercise.correctAnswer) {
            onCorrect();
        } else {
            onWrong();
        }
    };

    return (
        <div className="space-y-3">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border p-2 rounded-lg"
                placeholder="To‘g‘ri tartibda yozing..."
            />

            <button
                onClick={checkAnswer}
                className="px-4 py-2 bg-primary text-white rounded-lg"
            >
                Tekshirish
            </button>
        </div>
    );
}
