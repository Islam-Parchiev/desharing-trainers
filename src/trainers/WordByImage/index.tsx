import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import { Icon } from '../../shared/ui/MoveBox';
import type { Id, Status } from '../../types/types';
import { DropInput } from './DropInput';
import { MoveBox } from './MoveBox';
import './styles.scss';
import { TrainerTitle } from '../../components/TrainerTitle';
interface WordTask {
    id: string;
    correctAnswer: string;
    imageUrl: string;
    availableLetters: ILetter[];
    slotsCount: number;
    isLoading: boolean;
}

interface IWordSlot {
    id: Id;
    current: string | null;
}

export interface ILetter {
    id: Id;
    letter: string;
}
export const WordByImage = ({ availableLetters, correctAnswer, id, imageUrl, slotsCount, isLoading = false }: WordTask) => {
    const [slots, setSlots] = useState<IWordSlot[]>([]);
    const [letters, setLetters] = useState<ILetter[]>([]);
    const [status, setStatus] = useState<Status>('idle');
    const touchSensor = useSensor(TouchSensor)
    const mouseSensor = useSensor(MouseSensor)
    const sensors = useSensors(touchSensor, mouseSensor);

    // Инициализация данных при загрузке задания
    useEffect(() => {
        if (id) {
            setSlots(
                Array.from({ length: slotsCount }, (_, i) => ({
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
    }, [id, slotsCount, availableLetters]);
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
        const userAnswer = slots.map(slot => slot.current).join('');
        // checkMutation.mutate(userAnswer);
        if (userAnswer === correctAnswer) {
            setStatus('success');
            return
        }
        setStatus('error');
        return
    };

    const handleReset = () => {
        setStatus('idle');
        setSlots(prev => prev.map(slot => ({ ...slot, current: null })));
    };
    const disableMoveBox = (letter: ILetter) => {
        // Считаем сколько раз эта буква уже используется в слотах
        const usedCount = slots.filter(slot => slot.current === letter.letter).length;

        // Считаем сколько раз эта буква доступна в letters
        const availableCount = letters.filter(l => l.letter === letter.letter).length;

        // Если буква уже использована столько раз, сколько доступно - блокируем
        return usedCount >= availableCount;
    }

    if (isLoading) return <div>Загрузка...</div>;
    if (!id) return <div>Ошибка загрузки</div>;

    return (
        <div className="WordByImage">
            {status === 'success' && <div>Успех</div>}
            {status === 'error' && <div>Ошибка</div>}

            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                <div className="WordByImage__inner">
                    <div className="WordByImage__header">
                        <TrainerTitle>Что нарисовано на картинке? Собери слово из букв</TrainerTitle>
                    </div>

                    <div className="WordByImage__image">
                        <img src={imageUrl} alt="Задание" />
                    </div>

                    {/* Остальная разметка без изменений */}
                    <div className="WordByImage__slots">
                        {slots.map(slot =>
                            <DropInput key={slot.id} {...slot} />
                        )}
                    </div>

                    <ul className="list-reset WordByImage__moveItems">
                        {letters.map(letter =>
                            <MoveBox
                                key={letter.id}
                                char={letter.letter}
                                id={letter.id}
                                isDisabled={disableMoveBox(letter)}
                            />
                        )}
                    </ul>
                </div>
            </DndContext>


            <button
                onClick={handleCheck}
            >
                Проверить
            </button>

            {status === 'error' && <button onClick={handleReset}>Сбросить</button>}
        </div>
    );
};