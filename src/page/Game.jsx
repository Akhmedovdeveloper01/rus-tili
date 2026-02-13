import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { gameData } from "./data";

export default function Game() {
    const { t } = useTranslation();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gameData.map((item) => {
                return (
                    <div
                        key={item.id}
                        className="border border-md rounded-md p-3 relative min-h-[260px]"
                    >
                        <div className="flex gap-3 items-center mb-3">
                            <strong>{item.id}</strong>
                            <h2 className="font-bold text-lg">
                                {t(item.game_title)}
                            </h2>
                        </div>
                        <p>{t(item.game_type_info)}</p>

                        <NavLink to={item.to} className={"absolute bottom-0 left-0 right-0 mx-auto"}>
                            <Button
                                className={"w-full mt-3 "}
                                variant={"outline"}
                            >
                                {t("game")}
                            </Button>
                        </NavLink>
                    </div>
                );
            })}
        </div>
    );
}
