import './styles.scss';
import { Icon } from "../../shared/ui/MoveBox"
import { DropInput } from './DropInput';
import { MoveBox } from './MoveBox';
import { useSensor, DndContext, MouseSensor, TouchSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import type { Id, Status } from '../../types/types';

interface IWordSlot {
    id: Id;
    current: string | null;
}

interface ILetter {
    id: Id;
    letter: string;
}

export const WordByImage = () => {
    const tR = "город";
    const touchSensor = useSensor(TouchSensor)
    const mouseSensor = useSensor(MouseSensor)
    const sensors = useSensors(touchSensor, mouseSensor);
    const [status, setStatus] = useState<Status>("idle")
    const [end, setEnd] = useState(false);
    const [slots, setSlots] = useState<IWordSlot[]>([
        { id: 1, current: null },
        { id: 2, current: null },
        { id: 3, current: null },
        { id: 4, current: null },
        { id: 5, current: null }
    ]);

    const [letters, setLetters] = useState<ILetter[]>([
        { id: 1, letter: "г" },
        { id: 2, letter: "а" },
        { id: 3, letter: "о" },
        { id: 4, letter: "р" },
        { id: 5, letter: "т" },
        { id: 6, letter: "д" },
        { id: 7, letter: "о" }
    ]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        console.log(over);

        if (over) {
            setSlots(
                slots.map(slot =>
                    slot.id === over.id ? { ...slot, current: active.data.current?.char } : slot
                ),
            )
        }
    }

    const handleCheck = () => {
        const slotWord = slots.reduce((word, slot) => word + slot.current, "");

        console.log("Constructed word:", slotWord);

        if (tR.toLowerCase() === slotWord.toLowerCase()) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    }

    const handleReset = () => {
        setEnd(false);
        setStatus("idle");
        const sl = slots.map(item => {
            return {
                ...item,
                current: null
            }
        })
        setSlots(sl);
    }

    // Исправленная функция disableMoveBox
    const disableMoveBox = (letter: ILetter) => {
        // Считаем сколько раз эта буква уже используется в слотах
        const usedCount = slots.filter(slot => slot.current === letter.letter).length;

        // Считаем сколько раз эта буква доступна в letters
        const availableCount = letters.filter(l => l.letter === letter.letter).length;

        // Если буква уже использована столько раз, сколько доступно - блокируем
        return usedCount >= availableCount;
    }

    useEffect(() => {
        if (slots.every(slot => slot.current !== null)) {
            setEnd(true);
        }
    }, [slots])

    return (
        <div className="WordByImage">
            {status === "success" && <div>Успех</div>}
            {status === "error" && <div>Ошибка</div>}
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>

                <div className="WordByImage__inner">
                    <div className="WordByImage__header">
                        <button className="btn-reset">
                            <Icon />
                        </button>
                        <h3 className="WordByImage__title">
                            Что нарисовано на картинке ? Собери слово из букв
                        </h3>
                    </div>
                    <div className="WordByImage__image">
                        <img src="/citt.jpg" alt="" />
                    </div>
                    <div className="WordByImage__slots">
                        {slots.map(slot => <DropInput key={slot.id} id={slot.id} current={slot.current} />)}
                    </div>
                    <ul className="list-reset WordByImage__moveItems">
                        {letters.map(letter =>
                            <MoveBox
                                key={letter.id}
                                id={letter.id}
                                char={letter.letter}
                                isDisabled={disableMoveBox(letter)}
                            />
                        )}
                    </ul>
                </div>
            </DndContext>
            {end && <button onClick={handleCheck}>check</button>}
            {status === "error" && <button onClick={handleReset}>reset</button>}
        </div>
    )
}