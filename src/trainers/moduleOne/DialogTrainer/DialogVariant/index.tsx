import { useDraggable } from '@dnd-kit/core';
import './styles.scss';
import type { Id } from '../../../../types/types';

export const DialogVariant = ({ value, id, isDisabled }: { value: string; id: Id; isDisabled: boolean; }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
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
        <div
            className="DialogVariant"
            style={style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}>
            <span>{value}</span>
        </div>
    )
}