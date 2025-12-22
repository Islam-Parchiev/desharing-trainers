// Slot.tsx
import { useState } from 'react';

interface SyllableSlotProps {
    id: number;
    currentValue: string;
    correctValue: string;
    slotNumber: number;
    isFilled: boolean;
    isCorrect: boolean;
    onDrop: (slotId: number, value: string) => void;
}

export const SyllableSlot: React.FC<SyllableSlotProps> = ({
    id,
    currentValue,
    slotNumber,
    isFilled,
    isCorrect,
    onDrop
}) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleDropEvent = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const value = e.dataTransfer.getData('text/plain');
        onDrop(id, value);
    };

    return (
        <div
            className={`SyllableSlot ${isFilled ? 'SyllableSlot--filled' : ''
                } ${isCorrect ? 'SyllableSlot--correct' : ''
                } ${isDraggingOver ? 'SyllableSlot--dragging-over' : ''
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDropEvent}
            data-slot-id={id}
        >
            {isFilled ? (
                <span className="SyllableSlot__value">{currentValue}</span>
            ) : (
                <span className="SyllableSlot__placeholder">Слог {slotNumber}</span>
            )}
        </div>
    );
};