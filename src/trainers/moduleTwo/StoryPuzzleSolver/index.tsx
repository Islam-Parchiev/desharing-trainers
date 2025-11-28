import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { TrainerTitle } from "../../../components/TrainerTitle";
import './style.scss';
import type { Id, Status } from "../../../types/types";
import { DropSlot } from "./DropSlot";
import { DragItem } from "./DragItem";
import { Button } from "../../../shared/ui/Button";
export const StoryPuzzleSolver = () => {
    const [slots, setSlots] = useState<{
        slotId: Id;
        content: string;
        currentValue: string | null;
        correctValue: string;
    }[]>([
        {
            slotId: 1,
            content: "Начало",
            currentValue: null,
            correctValue: "Однажды я увидел на стене необычную тень. Она была похожа на тень дракона."
        },
        {
            slotId: 2,
            content: "основная часть",
            currentValue: null,
            correctValue: "Потом я присмотрелся. Неужели и правда дракон ?"
        },
        {
            slotId: 3,
            content: "концовка",
            currentValue: null,
            correctValue: "Оказалось, это была тень кактуса. Какая досада!"
        }
    ]);
    const [status, setStatus] = useState<Status>("idle");
    const [variants] = useState<{
        id: Id;
        content: string;
    }[]>([
        {
            id: 1,
            content: "Оказалось, это была тень кактуса. Какая досада!"
        },
        {
            id: 2,
            content: "Потом я присмотрелся. Неужели и правда дракон ?"
        },
        {
            id: 3,
            content: "Однажды я увидел на стене необычную тень. Она была похожа на тень дракона."
        }
    ])
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over) {
            setSlots(
                slots.map(slot => (slot.slotId === over.id ? { ...slot, currentValue: active.data.current?.content } : slot)),
            )
        }
    }
    const handleCheck = () => {
        if (slots.every(slot => slot.correctValue === slot.currentValue)) {
            setStatus("success");
            return;
        } else {
            setStatus("error");
            return;
        }
    }
    return (
        <div className="StoryPuzzleSolver">
            <DndContext onDragEnd={handleDragEnd}>

                <div className="StoryPuzzleSolver__inner">
                    <TrainerTitle>Расставь части истории по местам</TrainerTitle>
                    {status === "success" && "Success"}
                    {status === "error" && "Error"}
                    <div className="StoryPuzzleSolver__content">


                        <div className="StoryPuzzleSolver__dropColumn">
                            <div className="StoryPuzzleSolver__dropColumn_inner">
                                {slots.map(slot => (
                                    <DropSlot id={slot.slotId} key={slot.slotId} content={slot.content} value={slot.currentValue} />
                                ))}
                            </div>
                        </div>
                        <div className="StoryPuzzleSolver__dragColumn">
                            <div className="StoryPuzzleSolver__dragColumn_inner">
                                {variants.map(variant => (
                                    <DragItem id={variant.id} isDisabled={false} content={variant.content} key={"PuzzleVariant-" + variant.id} />
                                ))}
                            </div>
                            <Button variant="primary" size="big" onClick={handleCheck}>check</Button>
                        </div>
                    </div>
                </div>
            </DndContext>
        </div>
    )
}