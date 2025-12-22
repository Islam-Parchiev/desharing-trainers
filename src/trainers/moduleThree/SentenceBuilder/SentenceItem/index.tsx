// SentenceItem.tsx
import { useState } from "react";
import { SlItem } from "../SlItem";
import './styles.scss';
import type { Status } from "../../../../types/types";

// Сделаем props необязательными с значениями по умолчанию
export const SentenceItem = ({
    title = "Укажите title",
    words = ["test", "test1", "test2"],
    status = "idle",
    onAnswerChange
}: {
    title?: string;
    words?: string[];
    correctAnswer?: string;
    status?: Status;
    currentAnswer: null | string;
    onAnswerChange?: (answer: string | null) => void;
    setStatus?: (value: Status) => void;
}) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(1);

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        if (onAnswerChange) {
            onAnswerChange(words[selectedIndex]);
        }
    };
    const showResult = status === "success" || status === "error" || null;
    return (
        <div className="SentenceItem">
            <span className="SentenceItem__title">{title}</span>
            {showResult && <span>{showResult}</span>}
            <SlItem
                onSelect={handleSelect}
                selectedIndex={selectedIndex}
                words={words}
            />
        </div>
    );
};