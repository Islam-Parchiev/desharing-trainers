import cn from 'classnames';
import './styles.scss';
import { Icon } from "../../../../shared/ui/MoveBox"
import type { Id } from '../../../../types/types';
import { useDraggable } from '@dnd-kit/core';

export const DragItem = ({
    content,
    id,
    isDisabled
}: {
    id: Id;
    content: string;
    isDisabled: boolean;
}) => {
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
        <div
            className={cn("PuzzleDragItem", isDisabled && "disabled")}
            style={style}
            {...attributes}
            {...listeners}
            ref={setNodeRef} >
            <button className="btn-reset">
                <Icon />
            </button>
            <span>{content}</span>
        </div>
    )
}