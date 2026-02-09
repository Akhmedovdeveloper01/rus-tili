import React from "react";
import { useTranslation } from "react-i18next";

export default function Words() {
    const { t } = useTranslation();
    return (
        <div>
            <h2 className="mb-4">{t("words")}</h2>
        </div>
    );
}
