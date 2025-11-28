import cn from 'classnames';
import './styles.scss';
import { useDraggable } from '@dnd-kit/core';
import type { Id } from '../../../../types/types';

export const Variant = ({ isDisabled, value, id }: { id: Id; value: string; isDisabled: boolean }) => {
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
            className={cn("Variant", isDisabled && "disabled")}
            style={style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}>
            <span>{value}</span>
        </div>
    )
}