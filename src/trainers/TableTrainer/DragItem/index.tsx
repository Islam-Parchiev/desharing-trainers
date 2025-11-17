import cn from 'classnames';
import { useDraggable } from '@dnd-kit/core';
import type { Id } from '../../../types/types';
import './style.scss';
export const DragItem = ({ id, value, isDisabled }: { id: Id; value: string; isDisabled: boolean; }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        data: { value },
        disabled: isDisabled,


    })
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