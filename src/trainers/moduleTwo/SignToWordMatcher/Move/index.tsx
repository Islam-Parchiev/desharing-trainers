
import cn from 'classnames';
import './styles.scss';
import { useDraggable } from '@dnd-kit/core';
import type { Id } from '../../../../types/types';
export const SignToWordMoveItem = ({ id, content, isDisabled }: { id: Id; isDisabled: boolean; content: string; }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: { content },
        disabled: isDisabled,


    })
    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined
    return (
        <li className={cn("SignToWordMoveItem", isDisabled && "disabled")} style={style} ref={setNodeRef} {...attributes} {...listeners}>
            <span>{content}</span>
        </li>
    )
}