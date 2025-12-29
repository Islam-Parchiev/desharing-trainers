import { useState, useEffect } from "react";
import { SlItem } from "../SlItem";
import './styles.scss';

interface SentenceItemProps {
    title?: string;
    words?: string[];
    correctAnswer?: string;
    currentAnswer: string | null;
    onAnswerChange?: (answer: string | null) => void;
}

export const SentenceItem = ({
    title = "Укажите title",
    words = ["test", "test1", "test2"],
    correctAnswer = "",
    currentAnswer,
    onAnswerChange
}: SentenceItemProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(() => {
        if (currentAnswer === null) return 0;
        const index = words.indexOf(currentAnswer);
        return index >= 0 ? index : 0;
    });

    useEffect(() => {
        if (currentAnswer === null) {
            setSelectedIndex(0);
        } else {
            const index = words.indexOf(currentAnswer);
            if (index >= 0 && index !== selectedIndex) {
                setSelectedIndex(index);
            }
        }
    }, [currentAnswer, words]);

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        if (onAnswerChange) {
            onAnswerChange(words[index]);
        }
    };

    return (
        <div className="SentenceItem">
            <span className="SentenceItem__title">{title}</span>
            <SlItem
                onSelect={handleSelect}
                selectedIndex={selectedIndex}
                words={words}
                correctAnswer={correctAnswer}
                currentAnswer={currentAnswer}
            />
        </div>
    );
};