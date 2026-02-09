import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="p-3">
                <Outlet />
            </div>
        </div>
    );
}
