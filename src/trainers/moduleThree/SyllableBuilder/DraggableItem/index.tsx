import cn from 'classnames';
import { useDraggable } from '@dnd-kit/core';
import './styles.scss';
import type { Id } from '../../../../types/types';
export const DraggableVariant = ({ id, value, isDisabled }: { id: Id; value: string; isDisabled: boolean; }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: { value },
        disabled: isDisabled,


    })
    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

    return (
        <li
            className={cn("SyllableBuilderVariant", isDisabled && "disabled")}
            style={style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}>
            <span>{value}</span>
        </li>
    );
};