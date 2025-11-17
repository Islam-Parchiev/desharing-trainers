import { useDroppable } from '@dnd-kit/core';
import './styles.scss';
import type { Id } from '../../../types/types';
export const DialogSlot = ({ id, value }: { id: Id; value: string | null; }) => {
    const { setNodeRef } = useDroppable({ id })
    return (
        <div className='DialogSlot' ref={setNodeRef}>
            {value ? <span>{value}</span> : <div className='DialogSlot__input'></div>}
        </div>
    )
}