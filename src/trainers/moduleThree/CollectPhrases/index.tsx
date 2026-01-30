import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { CollectPhrasesItem } from './Item';
import './styles.scss';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Variant } from './Variant';
import { Button } from '../../../shared/ui/Button';
import type { Status } from '../../../types/types';

const mockData = {
    title: "Собери словосочетания",
    slots: [
        {
            title: 'Озеро',
            imageUrl: '/svgo.svg',
            correctVariant: "Ижевский"
        },
        {
            title: 'Море',
            imageUrl: '/svgs.svg',
            correctVariant: "Чёрное"
        },
        {
            title: 'Река',
            imageUrl: '/svgt.svg',
            correctVariant: "Нева"
        }
    ],
    variants: [
        "Ижевский",
        "Чёрное",
        "Нева",
    ]
}

export const CollectPhrases = () => {
    const [status, setStatus] = useState<Status>("idle")
    const [slots, setSlots] = useState(
        [...mockData.slots.map(slot => ({
            ...slot,
            currentVariant: null
        }))]
    );
    const [variants] = useState([...mockData.variants]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const draggedVariant = active.data.current?.variant;
        const slotTitle = over.id as string;

        setSlots(prevSlots =>
            prevSlots.map(slot =>
                slot.title === slotTitle
                    ? { ...slot, currentVariant: draggedVariant }
                    : slot
            )
        );
    };
    const check = () => {
        if (slots.every(slot => slot.correctVariant === slot.currentVariant)) {
            setStatus("success")
        } else {
            setStatus("error")
        }
    }
    const variantIsDisabled = (variant: string) => {
        if (slots.find(slot => slot.currentVariant === variant)) {
            return true
        } else {
            return false
        }
    }
    return (
        <div className='CollectPhrases'>
            <DndContext onDragEnd={handleDragEnd}>
                <div className='CollectPhrases__inner'>
                    <TrainerTitle>Собери словосочетания</TrainerTitle>
                    {status === "error" && "Error"}
                    {status === "success" && "Success"}
                    <div className="CollectPhrases__main">
                        <div className="CollectPhrases__content">
                            {slots.map(slot => (
                                <CollectPhrasesItem
                                    currentValue={slot.currentVariant}
                                    key={"slot-" + slot.title}
                                    imageUrl={slot.imageUrl}
                                    title={slot.title}
                                />
                            ))}
                        </div>
                        <div className='CollectPhrases__variants'>
                            {variants.map((variant) => (
                                <Variant
                                    key={"variant-" + variant}
                                    variant={variant}
                                    isDisabled={variantIsDisabled(variant)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </DndContext>
            <Button onClick={check}>Check</Button>
        </div>
    );
};