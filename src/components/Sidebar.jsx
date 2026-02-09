import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <nav className="bg-slate-600 h-screen flex flex-col min-w-[200px]">
            <NavLink className={"p-3 text-white"} to={"/"}>
                Home
            </NavLink>
            <NavLink className={"p-3 text-white"} to={"verbs"}>
                Fellar
            </NavLink>
            <NavLink className={"p-3 text-white"} to={"words"}>
                Lug'atar
            </NavLink>
        </nav>
    );
}
