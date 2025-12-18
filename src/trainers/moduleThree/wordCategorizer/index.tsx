import { TrainerTitle } from '../../../components/TrainerTitle';
import './styles.scss';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragEndEvent,
    type UniqueIdentifier,
    type DragOverEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { SortableItem } from './SortableItem';
import { WordContainer } from './WordContainer.tsx';
import type { Status } from '../../../types/types.ts';

export interface WordItem {
    id: string;
    text: string;
    category: string | null;
}

export const WordCategorizer = () => {
    const [status, setStatus] = useState<Status>("idle");
    const initialWords: WordItem[] = [
        { id: '1', text: 'Собака', category: null },
        { id: '2', text: 'Кошка', category: null },
        { id: '3', text: 'Бегать', category: null },
        { id: '4', text: 'Прыгать', category: null },
        { id: '5', text: 'Красный', category: null },
        { id: '6', text: 'Синий', category: null },
        { id: '7', text: 'Стол', category: null },
    ];

    const categories = [
        { id: 'living', title: 'Кто? Что?' },
        { id: 'action', title: 'Что делать?' },
        { id: 'property', title: 'Какой?' },
    ];


    const [words, setWords] = useState<WordItem[]>(initialWords);


    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);


    const activeWord = words.find(word => word.id === activeId);


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

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();
        const isOverCategory = categories.some(cat => cat.id === overId);
        if (isOverCategory) {
            setWords(prev => prev.map(word =>
                word.id === activeId ? { ...word, category: overId } : word
            ));
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeId = active.id.toString();
        const overId = over.id.toString();

        if (activeId !== overId) {
            const activeIndex = words.findIndex(word => word.id === activeId);
            const overIndex = words.findIndex(word => word.id === overId);

            const activeWord = words[activeIndex];
            const overWord = words[overIndex];

            if (activeWord.category === overWord.category) {
                setWords(prev => {
                    const newWords = arrayMove(prev, activeIndex, overIndex);
                    return newWords;
                });
            }
        }

        setActiveId(null);
    };

    const handleReset = () => {
        setWords(initialWords);
    };

    const handleCheck = () => {
        const correctDistribution = {
            'living': ['1', '2', '7'],
            'action': ['3', '4'],
            'property': ['5', '6'],
        };

        const isCorrect = words.every(word => {
            if (word.category) {
                return correctDistribution[word.category as keyof typeof correctDistribution]?.includes(word.id);
            }
            return false;
        });

        if (isCorrect) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    };

    const getWordsByCategory = (categoryId: string) => {
        return words.filter(word => word.category === categoryId);
    };

    const unassignedWords = words.filter(word => !word.category);

    return (
        <div className="WordCategorizer">
            <TrainerTitle>Распредели слова по группам</TrainerTitle>
            {status === "success" && "Success"}
            {status === "error" && "Error"}
            <div className="WordCategorizer__controls">
                <button
                    className="WordCategorizer__button WordCategorizer__button--reset"
                    onClick={handleReset}
                >
                    Сбросить
                </button>
                <button
                    className="WordCategorizer__button WordCategorizer__button--check"
                    onClick={handleCheck}
                >
                    Проверить
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="WordCategorizer__inner">
                    <div className="WordCategorizer__words">
                        <h3 className="WordCategorizer__subtitle">Слова для распределения</h3>
                        <SortableContext
                            items={unassignedWords.map(w => w.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <ul className="list-reset WordCategorizerList">
                                {unassignedWords.map((word) => (
                                    <SortableItem key={word.id} word={word} />
                                ))}
                            </ul>
                        </SortableContext>
                    </div>
                    <div className="WordCategorizerCols">
                        {categories.map((category) => (
                            <WordContainer
                                key={category.id}
                                id={category.id}
                                title={category.title}
                                words={getWordsByCategory(category.id)}
                            />
                        ))}
                    </div>
                </div>

                <DragOverlay>
                    {activeWord ? (
                        <div className="WordCategorizerWord WordCategorizerWord--dragging">
                            <span>{activeWord.text}</span>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};