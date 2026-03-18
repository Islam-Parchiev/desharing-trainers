// DroppableSlot.tsx
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
// import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../../shared/ui/Button';

export const SortableLetter = ({ id, label }: { id: string; label: string }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Button variant="primary">{label}</Button>
        </div>
    );
};


export const DroppableSlot = ({ id, children }: { id: string; children?: React.ReactNode }) => {
    const { isOver, setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`AnagramPuzzleItemDroppableWord__slot ${isOver ? 'is-over' : ''}`}
        >
            {children}
        </div>
    );
};