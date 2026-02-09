import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export default function MainLayout() {
    return (
        <div className="flex relative overflow-hidden h-screen">
            <Sidebar />
            <div className="w-full relative">
                <Header />
                <div className="p-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
