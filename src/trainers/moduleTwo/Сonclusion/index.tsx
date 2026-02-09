import { useState } from "react";
import { TrainerTitle } from "../../../components/TrainerTitle";
import { Button } from "../../../shared/ui/Button";
import { SlotInput } from "./SlotInput";
import './styles.scss';
// import type { Status } from "../../../types/types";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { ConclusionVariant } from "./Variant";
import type { IConclusion } from "../../../widgets/Card/types";
import { prev } from "../../../widgets/Example/Theory/theory.slice";


type ConclusionProps = Omit<IConclusion, "type">
export const Conclusion = ({ data, handleError, handleSuccess }: { data: ConclusionProps; handleNext?: () => void; handleSuccess?: () => void; handleError?: () => void; }) => {
    const [content, setContent] = useState([...data.content]);
    const [isError, setIsError] = useState(false);
    const [slots, setSlots] = useState([...data.slots]);
    const [variants] = useState([...data.variants]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const currentItem = content[currentItemIndex];
    const handleCheck = () => {
        const allCorrect = slots.every(slot => slot.correct === slot.current);
        if (allCorrect) {
            // setStatus("success");
            handleSuccess?.();
        } else {
            // setStatus("error");
            handleError?.()
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        console.log('over', over);
        console.log('active', active)
        if (over) {
            setSlots(prevSlots =>
                prevSlots.map(slot =>
                    slot.id === +over.id
                        ? { ...slot, current: active.data.current?.value || null }
                        : slot
                )
            );
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
    const isLastTask = () => {
        if (currentItem.value === content[content.length - 1].value) {
            return true
        }
        return false
    }
    const isVisible = (item: {
        value: string;
        completed: boolean;
    }) => {
        if (currentItem.value === item.value) {
            return "visible"
        }
        if (item.completed === true) return "visible"
        return ""
    }
    const handleNext = () => {
        const currentItemSlots = slots.filter(slot => slot.contentId === currentItem.id);
        const isAllCorrect = currentItemSlots.every(
            slot => slot.contentId === currentItem.id && slot.current === slot.correct
        );

        if (isAllCorrect) {
            setContent(prev =>
                prev.map(item =>
                    item.id === currentItem.id
                        ? { ...item, completed: true }
                        : item
                )
            );

            setCurrentItemIndex(prev => {
                const nextIndex = prev + 1;

                // if (onComplete) onComplete(currentItem.id, nextIndex);
                return nextIndex;
            });
        } else {
            setIsError(true);

            const wrongSlots = slots.filter(
                slot => !(slot.contentId === currentItem.id && slot.current === slot.correct)
            );
            console.log('CHETO TAM:', wrongSlots);
        }
    };
    return (
        <div className="Conclusion__wrapper">
            <DndContext onDragEnd={handleDragEnd}>
                <TrainerTitle>Сделай вывод</TrainerTitle>
                {isError && "Some error"}
                <div className="Conclusion">
                    <div className="Conclusion__main">
                        {content.map((sentence, index) => (
                            <div key={index} className={`Conclusion__row ${isVisible(sentence)}`}>
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
                    <Button onClick={handleNext} size="small">Next</Button>
                    {isLastTask() && <Button onClick={handleCheck}>Finish</Button>}
                </div>
            </DndContext>
        </div>
    );
};