import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './sortableItem';

export const Reorder = () => {

    const [items, setItems] = useState(['1', '2', '3', '4', '5']);


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && over.id) {

            if (active.id !== over.id) {
                setItems((items) => {
                    const oldIndex = items.indexOf(String(active.id));
                    const newIndex = items.indexOf(String(over.id));

                    return arrayMove(items, oldIndex, newIndex);
                });
            }
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items} // Array of unique IDs
                strategy={verticalListSortingStrategy} // Layout strategy
            >
                {items.map((id) => (
                    <SortableItem key={id} id={id} />
                ))}
            </SortableContext>
        </DndContext>
    );
}