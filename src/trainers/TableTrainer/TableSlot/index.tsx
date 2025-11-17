import cn from 'classnames';
import './styles.scss';
import { useDroppable } from '@dnd-kit/core';
import type { Id } from '../../../types/types';
export const TableSlot = ({ id, value }: { id: Id; value: string | null; }) => {
    const { setNodeRef } = useDroppable({ id })
    return <div ref={setNodeRef} className={cn("TableSlot", value && "filled")}>
        <span>{value || ""}</span>
    </div>
}