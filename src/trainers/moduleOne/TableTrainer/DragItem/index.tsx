import cn from 'classnames';
import { useDraggable } from '@dnd-kit/core';
import './style.scss';
import type { Id } from '../../../../types/types';
export const DragItem = ({ id, value, isDisabled }: { id: Id; value: string; isDisabled: boolean; }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        data: {
            type: 'drag-item',
            value,
        },
        disabled: isDisabled,
    });
    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined
    return (
        <div ref={setNodeRef} className={cn("TableDragItem", isDragging && "dragging")} style={style} {...attributes} {...listeners}>
            {value}
        </div>
    )
}