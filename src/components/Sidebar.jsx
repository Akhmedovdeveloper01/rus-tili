import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // agar icon yo‘q bo‘lsa aytaman

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 "
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

                <NavLink
                    className="p-3 text-white"
                    to="/"
                    onClick={() => setOpen(false)}
                >
                    Home
                </NavLink>

                <NavLink
                    className="p-3 text-white"
                    to="verbs"
                    onClick={() => setOpen(false)}
                >
                    Fellar
                </NavLink>

                <NavLink
                    className="p-3 text-white"
                    to="words"
                    onClick={() => setOpen(false)}
                >
                    Lug‘at
                </NavLink>
            </nav>
        </>
    );
}
