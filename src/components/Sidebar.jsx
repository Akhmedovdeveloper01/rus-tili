import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const navbar = [
    {
        path: "/",
        title: "home",
    },
    {
        path: "verbs",
        title: "verbs",
    },
    {
        path: "words",
        title: "words",
    },
    {
        path: "game",
        title: "game",
    },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-3 left-4 z-50 text-white"
            >
                <Menu size={28} />
            </button>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                />
            )}

            <nav
                className={`
          fixed md:static top-0 left-0 z-50
          bg-slate-600 h-screen w-[220px]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
            >
                <button
                    onClick={() => setOpen(false)}
                    className="md:hidden self-end p-4 text-white"
                >
                    <X size={28} />
                </button>

                {navbar.map((item) => {
                    return (
                        <NavLink
                            key={item.title}
                            className="p-3 text-white"
                            to={item.path}
                            onClick={() => setOpen(false)}
                        >
                            {t(item.title)}
                        </NavLink>
                    );
                })}
            </nav>
        </>
    );
}
