import { useState } from "react";
import { TrainerTitle } from "../../../components/TrainerTitle";
import { Button } from "../../../shared/ui/Button";
import { SlotInput } from "./SlotInput";
import './styles.scss';
import type { Status } from "../../../types/types";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { ConclusionVariant } from "./Variant";

const mockData = {
    content: [
        { value: "Слова в предложении {{связаны}} между собой {{по смыслу}} .", completed: false },
    ],
    variants: [
        {
            id: 1,
            value: "изменять"
        },
        {
            id: 2,
            value: "заглавная"
        },
        {
            id: 3,
            value: "по смыслу"
        },
        {
            id: 4,
            value: "точка"
        },
        {
            id: 5,
            value: "связаны"
        }
    ],
    slots: [
        { id: 1, current: null, correct: 'по смыслу' },
        { id: 2, current: null, correct: 'связаны' },
    ]
};

export const Conclusion = () => {
    const [content] = useState(mockData.content);
    const [slots, setSlots] = useState([...mockData.slots]);
    const [variants] = useState([...mockData.variants]);
    const [status, setStatus] = useState<Status>("idle");

    const handleCheck = () => {
        const allCorrect = slots.every(slot => slot.correct === slot.current);
        if (allCorrect) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over) {
            setSlots(prevSlots =>
                prevSlots.map(slot =>
                    slot.id === Number(over.id)
                        ? { ...slot, current: active.data.current?.value || null }
                        : slot
                )
            );
        }
        const text = "Слова в предложении {{связаны}} между собой {{по смыслу}}.";
        const regex = /\{\{([^{}]+)\}\}/g;
        const matches = text.matchAll(regex);
        for (const match of matches) {
            console.log(match);
        }
    };
    const renderContent = (sentence: string) => {
        const parts = sentence.split(/\{\{([^{}]+)\}\}/g);
        console.log("parts:", parts);
        return parts.map((part, index) => {

            const match = slots.find(slot => slot.correct === part);
            if (match) {
                const n = match;
                console.log("n:", n);
                if (!n.correct) return <span key={index}>error</span>;
                if (match) {
                    return (
                        <SlotInput
                            key={match.id}
                            id={match.id.toString()}
                            value={match.current}
                        />
                    );
                } else {
                    return <span key={index}>error</span>;
                }
            }

            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="Conclusion__wrapper">
            <DndContext onDragEnd={handleDragEnd}>
                <TrainerTitle>Сделай вывод</TrainerTitle>
                <div className="Conclusion">
                    <div className="Conclusion__main">
                        {content.map((sentence, index) => (
                            <div key={index} className="Conclusion__row visible">
                                {renderContent(sentence.value)}
                            </div>
                        ))}
                    </div>
                    <ul className="list-reset Conclusion__variants">
                        {variants.map(variant => (
                            <ConclusionVariant
                                key={variant.id}
                                id={variant.id.toString()}
                                value={variant.value}
                                isDisabled={slots.some(slot => slot.current === variant.value)}
                            />
                        ))}
                    </ul>
                    <Button onClick={handleCheck} size="small">Проверить</Button>
                    {status === "success" && <div className="Conclusion__status Conclusion__status--success">Всё правильно!</div>}
                    {status === "error" && <div className="Conclusion__status Conclusion__status--error">Есть ошибки. Попробуйте снова.</div>}
                </div>
            </DndContext>
        </div>
    );
};