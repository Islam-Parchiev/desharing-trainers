import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
// import { Icon } from '../../shared/ui/MoveBox';
import { DropInput } from './DropInput';
import { MoveBoxImage } from './MoveBox';
import './styles.scss';
import { TrainerTitle } from '../../../components/TrainerTitle';
import type { Id, Status } from '../../../types/types';


interface WordTask {
    id: Id;
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

export const WordByImage = ({ availableLetters, correctAnswer, id, imageUrl, isLoading = false }: WordTask) => {
    const [slots, setSlots] = useState<IWordSlot[]>([]);
    const [letters, setLetters] = useState<ILetter[]>([]);
    const [status, setStatus] = useState<Status>('idle');
    const touchSensor = useSensor(TouchSensor);
    const mouseSensor = useSensor(MouseSensor);
    const sensors = useSensors(touchSensor, mouseSensor);
    const [result, setResult] = useState<{ countMistakes: null | number; time: null | number; }>({
        countMistakes: null,
        time: null
    });
    const [mistakes, setMistakes] = useState(0);
    const [seconds, setSeconds] = useState(0);


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


    useEffect(() => {
        let timer: number | undefined;

        if (status !== 'success') {
            timer = setInterval(() => {
                setSeconds(prevValue => prevValue + 1);
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [status]); // Add status as dependency

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

    const handleCheck = () => {
        const userAnswer = slots.map(slot => slot.current).join('');

        if (userAnswer === correctAnswer) {
            setResult({
                countMistakes: mistakes,
                time: seconds
            });
            setStatus('success');
            return;
        }

        setMistakes(prev => prev + 1);
        setStatus('error');
    };

    const handleReset = () => {
        setStatus('idle');
        setSlots(prev => prev.map(slot => ({ ...slot, current: null })));
        setMistakes(0);
        setSeconds(0);
    };

    const disableMoveBox = (letter: ILetter) => {
        const usedCount = slots.filter(slot => slot.current === letter.letter).length;
        const availableCount = letters.filter(l => l.letter === letter.letter).length;
        return usedCount >= availableCount;
    };

    // Log result when it changes
    useEffect(() => {
        if (status === 'success') {
            console.log('result:', result);
        }
    }, [status, result]);

    if (isLoading) return <div>Загрузка...</div>;
    if (!id) return <div>Ошибка загрузки</div>;

    return (
        <div className="WordByImage">
            {status === 'success' && (
                <div>
                    Успех! Время: {result.time} сек, Ошибок: {result.countMistakes}
                </div>
            )}
            {status === 'error' && <div>Ошибка! Попробуйте еще раз</div>}

            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                <div className="WordByImage__inner">
                    <div className="WordByImage__header">
                        <TrainerTitle>Что нарисовано на картинке? Собери слово из букв</TrainerTitle>
                    </div>

                    <div className="WordByImage__image">
                        <img src={imageUrl} alt="Задание" />
                    </div>

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
                                isDisabled={disableMoveBox(letter)}
                            />
                        )}
                    </ul>
                </div>
            </DndContext>

            <div className="WordByImage__controls">
                <button onClick={handleCheck} disabled={status === 'success'}>
                    Проверить
                </button>

                {(status === 'error' || status === 'success') && (
                    <button onClick={handleReset}>
                        {status === 'success' ? 'Начать заново' : 'Сбросить'}
                    </button>
                )}
            </div>
        </div>
    );
};