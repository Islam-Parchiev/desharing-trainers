import cn from 'classnames'
import './styles.scss';
import { useDroppable } from '@dnd-kit/core';
import type { Id } from '../../../../types/types';

export const SlotInput = ({ id, value }: { id: Id; value: string | null }) => {
    const { setNodeRef } = useDroppable({ id })
    return <span ref={setNodeRef} className={cn("SlotInput", value && "SlotInput__filled")}>
        {value || ""}
    </span>
}