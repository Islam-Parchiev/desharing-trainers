import { useState, useMemo, useCallback } from "react";
import { TrainerTitle } from "../../../components/TrainerTitle";
import { Button } from "../../../shared/ui/Button";
import { SlotInput } from "./SlotInput";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { ConclusionVariant } from "./Variant";
// import type { IConclusion } from "../../../widgets/Card/types";
import './styles.scss';

type Slot = {
    id: number;
    correct: string;
    current: string | null;
};

type Variant = {
    id: number;
    value: string;
};

type ConclusionItem = {
    id: number;
    value: string;
    slots: Slot[];
    variants: Variant[];
    completed: boolean;
};

type ConclusionProps = {
    data: ConclusionItem[];
    handleSuccess?: () => void;
    handleError?: () => void;
};

export const Conclusion = ({ data, handleSuccess, handleError }: ConclusionProps) => {
    const [content, setContent] = useState<ConclusionItem[]>([...data]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [isError, setIsError] = useState(false);
    const currentItem = content[currentItemIndex];

    const isLastTask = useMemo(() =>
        currentItemIndex === content.length - 1,
        [currentItemIndex, content.length]
    );


    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const slotId = Number(over.id);
        const draggedValue = active.data.current?.value;

        if (!draggedValue) return;

        setContent(prev =>
            prev.map(item =>
                item.id === currentItem.id
                    ? {
                        ...item,
                        slots: item.slots.map(slot =>
                            slot.id === slotId
                                ? { ...slot, current: draggedValue }
                                : slot
                        )
                    }
                    : item
            )
        );

        setIsError(false);
    }, [currentItem.id]);

    const renderContent = (sentence: string) => {
        const parts = sentence.split(/\{\{([^{}]+)\}\}/g);
        console.log("parts:", parts);
        return parts.map((part, index) => {

            const match = currentItem.slots.find(slot => slot.correct === part);
            if (match) {
                const n = match;
                console.log("n:", n);
                if (!n.correct) return <span key={index}>error</span>;
                if (match) {
                    return (
                        <SlotInput
                            key={"slot-input" + match.id}
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

    const getRowClassName = useCallback((item: ConclusionItem) => {
        const isCurrent = item.id === currentItem.id;
        const isCompleted = item.completed;

        if (isCurrent || isCompleted) return "visible";
        return "";
    }, [currentItem.id]);

    const handleCheck = useCallback(() => {
        const allCorrect = content.every(item =>
            item.slots.every(slot => slot.correct === slot.current)
        );

        if (allCorrect) {
            handleSuccess?.();
        } else {
            handleError?.();
        }
    }, [content, handleSuccess, handleError]);

    const handleNext = useCallback(() => {
        const isAllCorrect = currentItem.slots.every(
            slot => slot.current === slot.correct
        );

        if (isAllCorrect) {
            setContent(prev =>
                prev.map(item =>
                    item.id === currentItem.id
                        ? { ...item, completed: true }
                        : item
                )
            );


            if (!isLastTask) {
                setCurrentItemIndex(prev => prev + 1);
                setIsError(false);
            } else {
                handleCheck();
            }
        } else {
            setIsError(true);
            handleError?.();

            const wrongSlots = currentItem.slots.filter(
                slot => slot.current !== slot.correct
            );
            console.log(wrongSlots);
        }
    }, [currentItem.slots, currentItem.id, isLastTask, handleCheck, handleError]);

    const usedVariants = useMemo(() => {
        const used = new Set<string>();
        currentItem.slots.forEach(slot => {
            if (slot.current) used.add(slot.current);
        });
        return used;
    }, [currentItem.slots]);

    return (
        <div className="Conclusion__wrapper">
            <DndContext onDragEnd={handleDragEnd}>
                <TrainerTitle>Сделай вывод</TrainerTitle>

                {isError && (
                    <div className="Conclusion__error">
                        Есть ошибки. Проверь заполненные поля.
                    </div>
                )}

                <div className="Conclusion">
                    <div className="Conclusion__main">
                        {content.map((item) => (
                            <div
                                key={`content-${item.id}`}
                                className={`Conclusion__row ${getRowClassName(item)}`}
                            >
                                {renderContent(item.value)}
                            </div>
                        ))}
                    </div>

                    <ul className="list-reset Conclusion__variants">
                        {currentItem.variants.map(variant => (
                            <ConclusionVariant
                                key={`variant-${variant.id}`}
                                id={variant.id.toString()}
                                value={variant.value}
                                isDisabled={usedVariants.has(variant.value)}
                            />
                        ))}
                    </ul>

                    <div className="Conclusion__actions">
                        <Button onClick={handleNext} size="small">
                            {isLastTask ? "Проверить" : "Далее"}
                        </Button>

                        {isLastTask && (
                            <Button onClick={handleCheck} variant="secondary">
                                Завершить
                            </Button>
                        )}
                    </div>
                </div>
            </DndContext>
        </div>
    );
};