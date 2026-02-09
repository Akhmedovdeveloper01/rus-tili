import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export default function LanguageSelect() {
    const { i18n } = useTranslation();

    const changeLang = (value) => {
        i18n.changeLanguage(value);
        localStorage.setItem("lang", value);
    };

    return (
        <Select onValueChange={changeLang} defaultValue={i18n.language}>
            <SelectTrigger className="w-[120px] text-white">
                <SelectValue placeholder="Lang" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="uz">🇺🇿 Uzbek</SelectItem>
                <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                <SelectItem value="en">🇺🇸 English</SelectItem>
            </SelectContent>
        </Select>
    );
}
