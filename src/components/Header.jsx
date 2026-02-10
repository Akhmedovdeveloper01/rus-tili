import React from "react";
import LanguageSelect from "./LanguageSelect";

export default function Header() {
    return (
        <div className="p-[6px] px-3 bg-slate-600 sticky top-0 z-40 flex justify-end">
            <LanguageSelect />
        </div>
    );
}
