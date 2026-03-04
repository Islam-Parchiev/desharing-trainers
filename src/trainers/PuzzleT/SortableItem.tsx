import React, { type CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
    id: number;
    originalIndex: number;
    gridSize: number;
    imageUrl: string;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, originalIndex, gridSize, imageUrl }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const size = 100;
    const row = Math.floor(originalIndex / gridSize);
    const col = originalIndex % gridSize;

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${gridSize * size}px ${gridSize * size}px`,
        backgroundPosition: `-${col * size}px -${row * size}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 10 : 1,
        border: '1px solid rgba(255,255,255,0.2)',
        boxSizing: 'border-box',
        touchAction: 'none',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} />
    );
};
