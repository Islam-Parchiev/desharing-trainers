import { useState } from 'react';
import './styles.scss';
import { DistributeWordsVariant } from './Variant';
import { DistributeWordsColumn } from './column';
import { Button } from '../../../shared/ui/Button';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import type { Status } from '../../../types/types';
const mockData = {
    firstCol: {
        title: "First",
        slots: [{
            id: 1,
            correctValue: "test1"
        }]
    },
    secondCol: {
        title: "second",
        slots: [{
            id: 2,
            correctValue: "test2"
        }]
    },
    variants: [{ id: 1, value: "test1" }, { id: 2, value: "test2" }]
}
export const DistributeWords = () => {
    const [status, setStatus] = useState<Status>("idle")
    const [fCol, setFCol] = useState<{
        title: string;
        slots: {
            currentValue: string | null;
            id: number;
            correctValue: string;
        }[];
    }>({
        title: mockData.firstCol.title,
        slots: mockData.firstCol.slots.map(slot => ({ ...slot, currentValue: null }))
    });
    const [sCol, setSCol] = useState<{
        title: string;
        slots: {
            currentValue: string | null;
            id: number;
            correctValue: string;
        }[];
    }>({
        title: mockData.secondCol.title,
        slots: mockData.secondCol.slots.map(slot => ({ ...slot, currentValue: null }))
    });
    const [variants, setVariants] = useState([...mockData.variants]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const draggedVariantId = active.id;
        const targetSlotId = over.id;


        const draggedVariant = variants.find(v => v.id === draggedVariantId);
        if (!draggedVariant) return;


        let columnUpdated = false;


        const fColSlotIndex = fCol.slots.findIndex(slot => slot.id === targetSlotId);
        if (fColSlotIndex !== -1) {

            const oldValue = fCol.slots[fColSlotIndex].currentValue;
            if (oldValue) {
                const oldVariant = variants.find(v => v.value === oldValue);
                if (oldVariant) {
                    setVariants(prev => [...prev, oldVariant]);
                }
            }


            setFCol(prev => ({
                ...prev,
                slots: prev.slots.map((slot, index) =>
                    index === fColSlotIndex
                        ? { ...slot, currentValue: draggedVariant.value }
                        : slot
                )
            }));
            columnUpdated = true;
        }


        const sColSlotIndex = sCol.slots.findIndex(slot => slot.id === targetSlotId);
        if (sColSlotIndex !== -1) {

            const oldValue = sCol.slots[sColSlotIndex].currentValue;
            if (oldValue) {
                const oldVariant = variants.find(v => v.value === oldValue);
                if (oldVariant) {
                    setVariants(prev => [...prev, oldVariant]);
                }
            }


            setSCol(prev => ({
                ...prev,
                slots: prev.slots.map((slot, index) =>
                    index === sColSlotIndex
                        ? { ...slot, currentValue: draggedVariant.value }
                        : slot
                )
            }));
            columnUpdated = true;
        }


        if (columnUpdated) {
            setVariants(prev => prev.filter(v => v.id !== draggedVariantId));
        }
    }

    const handleCheck = () => {
        if (fCol.slots.every(slot => slot.currentValue === slot.correctValue) && sCol.slots.every(slot => slot.currentValue === slot.correctValue)) {
            setStatus("success")
        } else {
            setStatus("error")
        }
    }
    return (
        <div className="DistributeWords">
            <DndContext onDragEnd={handleDragEnd}>


                <div className="DistributeWords__inner">

                    <DistributeWordsColumn slots={fCol.slots} title={fCol.title} />
                    <div>

                        <div className="DistributeWords__variants">
                            {variants.map(variant => <DistributeWordsVariant id={variant.id} key={`DistributeWords-variant-${variant.id}`} isDisabled={false} value={variant.value} />)}
                        </div>
                        <Button onClick={handleCheck}>Check</Button>
                        {status === "success" && "Success"}
                        {status === "error" && "Error"}
                    </div>


                    <DistributeWordsColumn slots={sCol.slots} title={sCol.title} />
                </div>
            </DndContext>
        </div>
    )
}