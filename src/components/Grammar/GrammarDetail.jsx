import React from "react";
import { GrammarExercises } from "./GrammarExercises";
import { adjectivesAgreement } from "@/db";

export default function GrammarDetail() {
    return (
        <div className="p-3">
            <GrammarExercises exercises={adjectivesAgreement.exercises} />
        </div>
    );
}
