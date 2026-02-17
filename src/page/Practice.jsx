import React from "react";
import PracticeCard from "@/components/Practice/PracticeCard";
import { lessons } from "@/db";

export default function Practice() {
    return (
        <div className="h-[92vh] overflow-auto">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {lessons.map((lesson) => (
                    <PracticeCard key={lesson.id} item={lesson} />
                ))}
            </div>
        </div>
    );
}
