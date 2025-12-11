import { useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
    restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import { useState } from 'react';
import { StoryReorderItem } from './Item';
import './styles.scss';
import { type Status, type Id } from '../../../types/types';
import { Button } from '../../../shared/ui/Button';

interface StoryItem {
    id: Id;
    content: string;
}

export const StoryReorder = () => {
    const [storyItems, setStoryItems] = useState<StoryItem[]>([
        { id: 1, content: "Тут бабушка догадалась, кто выпил молоко." },
        { id: 2, content: "Как-то раз бабушка решила испечь блинов. Она взяла молоко, муку и яйца." },
        { id: 3, content: "Тесто получилось очень густым. Бабушка решила разбавить его молоком. Смотрит - а молока-то и нет. Куда делось молоко ?" }
    ]);
    const [status, setStatus] = useState<Status>("idle");
    const correctOrder: Id[] = [2, 3, 1];

    const checkOrderMatch = (): void => {
        const currentOrder = storyItems.map(item => item.id);
        const allCorrect = currentOrder.every((id, index) => id === correctOrder[index]);

        if (allCorrect) {
            setStatus("success");
            console.log(" success");
        } else {
            setStatus("error");
            console.log("error");
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (status !== "idle") {
            setStatus("idle");
        }

        if (over && over.id) {
            if (active.id !== over.id) {
                setStoryItems((items) => {
                    const oldIndex = items.findIndex(item => item.id === active.id);
                    const newIndex = items.findIndex(item => item.id === over.id);
                    return arrayMove(items, oldIndex, newIndex);
                });
            }
        }
    }

    return (
        <div className="StoryReorder">
            <div className="StoryReorder__inner">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                >
                    <SortableContext
                        items={storyItems}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="StoryReorder__content">
                            {storyItems.map((item) => (
                                <StoryReorderItem
                                    key={item.id}
                                    content={item.content}
                                    id={item.id}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                {/* Кнопка проверки */}
                <Button variant="primary" size="small" onClick={checkOrderMatch}>
                    check
                </Button>

                {/* Сообщение о результате */}
                {status === "success" && "Отлично! Вы правильно восстановили последовательность рассказа!"}
                {status === "error" && "Error"}
            </div>
        </div>
    )
}