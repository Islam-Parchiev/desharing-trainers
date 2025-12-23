import { useDroppable } from '@dnd-kit/core';
import './styles.scss';
import type { Id } from '../../../../types/types';

export const SyllableSlot = ({ id, currentValue = "test" }: { id: Id; currentValue: string | null; }) => {
    const { setNodeRef } = useDroppable({ id })
    return (
        <div
            className={`SyllableSlot`}
            ref={setNodeRef}
        >
            <span className="SyllableSlot__value">{currentValue}</span>
        </div>
    );
};