import { useEffect, useState } from "react";
import { TrainerTitle } from "../../../../components/TrainerTitle"
import type { ILetter, IWordSlot } from "../../../moduleOne/WordByImage";
import { DropInput } from "../../../moduleOne/WordByImage/DropInput"
import { MoveBoxImage } from "../../../moduleOne/WordByImage/MoveBox"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import type { Id, Status } from "../../../../types/types";

export const VocabularyPractice = ({ id, availableLetters, correctAnswer, handleStatus }: { id: Id; correctAnswer: string; availableLetters: ILetter[]; handleStatus: (value: Status) => void; }) => {
    const touchSensor = useSensor(TouchSensor);
    const mouseSensor = useSensor(MouseSensor);
    const sensors = useSensors(touchSensor, mouseSensor);
    const [letters, setLetters] = useState<ILetter[]>([]);
    const [slots, setSlots] = useState<IWordSlot[]>([]);


    useEffect(() => {
        if (id) {
            setSlots(
                Array.from({ length: correctAnswer.length }, (_, i) => ({
                    id: i + 1,
                    current: null
                }))
            );

            setLetters(
                availableLetters.map((letter, i) => ({
                    id: i + 1,
                    letter: letter.letter
                }))
            );
        }
    }, [id, correctAnswer, availableLetters]);

    const handleCheck = () => {
        const userAnswer = slots.map(slot => slot.current).join('');

        if (userAnswer === correctAnswer) {
            handleStatus('success');
            return;
        }

        handleStatus('error');
    };
    useEffect(() => {
        if (slots.every(slot => slot.current !== null)) {
            handleCheck()
            return;
        }
    }, [slots])
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over) {
            setSlots(prevSlots =>
                prevSlots.map(slot =>
                    slot.id === over.id ? { ...slot, current: active.data.current?.char } : slot
                )
            );
        }
    };
    return (
        <div className="VocabularyPractice">
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>

                <div className="VocabularyPractice__inner">
                    <TrainerTitle>Собери слово из букв</TrainerTitle>
                    <div className="WordByImage__slots">
                        {slots.map(slot =>
                            <DropInput key={slot.id} {...slot} />
                        )}
                    </div>
                    <ul className="list-reset WordByImage__moveItems">
                        {letters.map(letter =>
                            <MoveBoxImage
                                key={letter.id}
                                char={letter.letter}
                                id={letter.id}
                                isDisabled={false}
                            />
                        )}
                    </ul>
                </div>
            </DndContext>
        </div>
    )
}