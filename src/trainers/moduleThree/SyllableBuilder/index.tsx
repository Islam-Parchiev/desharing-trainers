import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { DraggableVariant } from './DraggableItem';
import { SyllableSlot } from './Slot';
import './styles.scss';
import { useState } from 'react';
import type { Id, Status } from '../../../types/types';
import { Button } from '../../../shared/ui/Button';
const mockData = {
    word: "{{1}}шадь",
    correctWord: "лошадь",
    variants: [
        { id: 1, value: "ПР" },
        { id: 2, value: "СТ" },
        { id: 3, value: "ТР" },
        { id: 4, value: "ЛО" }],
    slots: [
        {
            id: 1,
            currentValue: null,
            correctValue: "ЛО"
        }
    ]
}
export const SyllableBuilder = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [slots, setSlots] = useState<{ id: Id; currentValue: string | null; correctValue: string; }[]>(mockData.slots)
    const [data] = useState(mockData);
    const [variants] = useState<{ id: Id; value: string; }[]>(mockData.variants);
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;


        const slotId = parseInt(over.id as string);
        const variantId = parseInt(active.id as string);
        const draggedVariant = variants.find(v => v.id === variantId);

        if (!draggedVariant) return;

        setSlots(prevSlots =>
            prevSlots.map(slot =>
                slot.id === slotId
                    ? { ...slot, currentValue: draggedVariant.value }
                    : slot
            )
        );
    };

    const renderWord = () => {
        const parts = data.word.split(/(\{\{\d+\}\})/g);

        return parts.map((part, index) => {
            const match = part.match(/\{\{(\d+)\}\}/);

            if (match) {
                const slotId = parseInt(match[1], 10);
                const slot = slots.find(s => s.id === slotId);

                if (!slot) {
                    return (
                        <span
                            key={`missing-slot-${index}`}
                            className="SyllableBuilder__placeholder"
                        >
                            ???
                        </span>
                    );
                }

                return (
                    <SyllableSlot
                        key={`builder-slot-${slot.id}`}
                        currentValue={slot.currentValue || ""}
                        id={slot.id}
                    />
                );
            }

            if (part.trim().length > 0) {
                return (
                    <span
                        key={`text-${index}`}
                        className="SyllableBuilder__word-part"
                    >
                        {part}
                    </span>
                );
            }

            return null;
        }).filter(Boolean);
    };
    const handleCheck = () => {
        if (slots.every(slot => slot.currentValue !== null)) {
            if (slots.every(slot => slot.currentValue === slot.correctValue)) {
                setStatus("success");
                return;
            } else {
                setStatus("error");
                return;
            }
        } else {
            setStatus("error");
            return;
        }
    }
    return (
        <div className='SyllableBuilder'>
            <DndContext onDragEnd={handleDragEnd}>

                <div className="SyllableBuilder__inner">
                    <TrainerTitle>Почини табличку</TrainerTitle>
                    {status === "success" && "Success"}
                    {status === "error" && "Error"}
                    <h4>Собери слово из слогов</h4>
                    <div className="SyllableBuilder__main">
                        {renderWord()}
                    </div>

                    <ul className="list-reset SyllableBuilder__variants">
                        {variants.map(item => <DraggableVariant key={`buildre-variant-${item.id}`} id={item.id} value={item.value} isDisabled={false} />)}
                    </ul>
                </div>
            </DndContext>
            <Button size="medium" onClick={handleCheck}>Check</Button>
        </div>

    )
}

