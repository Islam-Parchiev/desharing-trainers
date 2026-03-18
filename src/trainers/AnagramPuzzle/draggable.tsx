import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../../shared/ui/Button';

export const DraggableLetter = ({ id, label }: { id: string; label: string }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Button variant="primary">{label}</Button>
        </div>
    );
};

// DroppableSlot.tsx
import { useDroppable } from '@dnd-kit/core';

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