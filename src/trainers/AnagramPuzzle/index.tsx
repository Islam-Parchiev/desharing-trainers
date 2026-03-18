import { useState } from 'react';
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { DroppableSlot, SortableLetter } from './draggable';

export const AnagramPuzzle = () => {
    // Варианты в банке
    const [variants, setVariants] = useState([
        { id: '1', label: 'шин' },
        { id: '2', label: 'щин' },
        { id: '3', label: 'шен' }
    ]);
    // Элементы в слоте
    const [placedItems, setPlacedItems] = useState<{ id: string; label: string }[]>([]);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        // 1. Если бросили в слот (перемещение из банка в слот)
        if (over.id === 'word-slot' && variants.find(v => v.id === active.id)) {
            const dragged = variants.find(v => v.id === active.id)!;
            setPlacedItems([...placedItems, dragged]);
            setVariants(variants.filter(v => v.id !== active.id));
        }

        // 2. Если перемещаем внутри слота (реордер)
        if (active.id !== over.id && placedItems.find(p => p.id === over.id)) {
            setPlacedItems((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className='AnagramPuzzle'>
                <div className="AnagramPuzzleItem">
                    <div className="AnagramPuzzleItemDroppableWord">
                        <span>Ма</span>
                        <DroppableSlot id="word-slot">
                            <SortableContext items={placedItems} strategy={horizontalListSortingStrategy}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {placedItems.map((item) => (
                                        <SortableLetter key={item.id} id={item.id} label={item.label} />
                                    ))}
                                </div>
                            </SortableContext>
                        </DroppableSlot>
                        <span>ка</span>
                    </div>
                </div>

                <div className="AnagramPuzzle__variants">
                    <SortableContext items={variants} strategy={horizontalListSortingStrategy}>
                        {variants.map((item) => (
                            <SortableLetter key={item.id} id={item.id} label={item.label} />
                        ))}
                    </SortableContext>
                </div>
            </div>
        </DndContext>
    );
};