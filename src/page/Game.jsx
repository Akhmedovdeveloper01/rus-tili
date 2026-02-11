import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Game() {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className=" border border-md rounded-md p-3">
                <div className="flex gap-3 items-center mb-3">
                    <strong>#1</strong>
                    <h2 className="font-bold text-lg">{t("game_title_1")}</h2>
                </div>
                <p>{t("game_type_info")}</p>

                <NavLink to={"card-game"}>
                    <Button className={"w-full mt-3"} variant={"outline"}>
                        {t("game")}
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}
