import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    TouchSensor
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { shuffleArray } from './utils';

const GRID_SIZE = 3;
const IMAGE_URL = 'https://loremflickr.com/100/100';

export default function PuzzleGame() {
    const [items, setItems] = useState<number[]>([]);
    const [isWon, setIsWon] = useState<boolean>(false);

    useEffect(() => {
        const initialItems = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
        setItems(shuffleArray(initialItems));
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor)
    );

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((prev) => {
                const oldIndex = prev.indexOf(active.id as number);
                const newIndex = prev.indexOf(over.id as number);
                const nextOrder = arrayMove(prev, oldIndex, newIndex);


                const won = nextOrder.every((val, index) => val === index);
                if (won) setIsWon(true);

                return nextOrder;
            });
        }
    };

    const containerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 100px)`,
        gap: '2px',
        margin: '20px auto',
        width: 'fit-content',
        padding: '5px',
        background: '#333'
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
            <h1>{isWon ? '🎉 Вы собрали пазл!' : 'Соберите картинку'}</h1>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div style={containerStyle}>
                    <SortableContext items={items} strategy={rectSortingStrategy}>
                        {items.map((id) => (
                            <SortableItem
                                key={id}
                                id={id}
                                originalIndex={id}
                                gridSize={GRID_SIZE}
                                imageUrl={IMAGE_URL}
                            />
                        ))}
                    </SortableContext>
                </div>
            </DndContext>

            <button
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
                onClick={() => window.location.reload()}
            >
                Начать заново
            </button>
        </div>
    );
}