import cn from 'classnames';
import './styles.scss';
import { useDroppable } from '@dnd-kit/core';
import type { Id } from '../../../types/types';

export const TableSlot = ({ id, value }: { id: Id; value: string | null; }) => {
    const { isOver, setNodeRef } = useDroppable({
        id,
        data: {
            acceptsDrag: true,
            type: 'table-slot',
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "TableSlot",
                value && "filled",
                isOver && "over"
            )}
        >
            <span>{value || ""}</span>
        </div>
    );
};