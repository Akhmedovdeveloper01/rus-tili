import React from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();
    return (
        <div>
            <h2 className="mb-4">{t("home")}</h2>
        </div>
    );
}
