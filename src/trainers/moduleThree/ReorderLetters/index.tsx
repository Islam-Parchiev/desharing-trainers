import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import './styles.scss';
import { useSensors, useSensor, PointerSensor, KeyboardSensor, type DragEndEvent, closestCenter, DndContext } from '@dnd-kit/core';
import {
    sortableKeyboardCoordinates,
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import type { Status } from '../../../types/types';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';

const mockData = {
    data: [
        { id: 1, value: "Г" },
        { id: 2, value: "А" },
        { id: 3, value: "Д" },
        { id: 4, value: "Б" },
        { id: 5, value: "В" }
    ],
    correctOrderIds: [2, 4, 5, 1, 3]
}


interface SortableLetterProps {
    item: { id: number; value: string };
}

const SortableLetter = ({ item }: SortableLetterProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1 : 0
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="ReorderLettersCard"
        >
            <div className="ReorderLettersCard__inner">
                <span className='ReorderLettersCard__content'>{item.value}</span>
            </div>
        </div>
    );
};

export const ReorderLetters = () => {
    const [data, setData] = useState(mockData);
    const [status, setStatus] = useState<Status>("idle");

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (status !== "idle") {
            setStatus("idle");
        }

        if (over && active.id !== over.id) {
            setData(prevData => {
                const oldIndex = prevData.data.findIndex(item => item.id === active.id);
                const newIndex = prevData.data.findIndex(item => item.id === over.id);
                return {
                    ...prevData,
                    data: arrayMove(prevData.data, oldIndex, newIndex)
                };
            });
        }
    }

    const checkOrder = () => {
        const currentOrder = data.data.map(item => item.id);
        const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(data.correctOrderIds);
        setStatus(isCorrect ? "success" : "error");

        if (isCorrect) {
            console.log("Correct order!");
        }
    };

    return (
        <div className="ReorderLetters">
            <div className="ReorderLetters__inner">
                <TrainerTitle>Расставь буквы в алфавитном порядке</TrainerTitle>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToHorizontalAxis]}
                >
                    <SortableContext
                        items={data.data.map(item => item.id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        <div className="ReorderLetters__cards">
                            {data.data.map((item) => (
                                <SortableLetter key={item.id} item={item} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                <div className="ReorderLetters__controls">
                    <button
                        onClick={checkOrder}
                        className={`ReorderLetters__check-btn ReorderLetters__check-btn--${status}`}
                        disabled={status === "success"}
                    >
                        {status === "success" ? "Правильно!" : "Проверить"}
                    </button>

                    {status === "error" && "Error"}
                    {status === "success" && "Success"}
                    <button
                        onClick={() => setData(mockData)}
                        className="ReorderLetters__reset-btn"
                    >
                        Сбросить
                    </button>
                </div>
            </div>
        </div>
    );
};