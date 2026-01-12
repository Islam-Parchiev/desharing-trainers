import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { AlphabeticalSlot } from './Slot';
import './styles.scss';
import type { Id, Status } from '../../../types/types';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Variant } from './Variant';
import { Button } from '../../../shared/ui/Button';
import { Alphabet } from '../../../components/Alphabet';
export const AlphabeticalSorter = () => {
    const [slots, setSlots] = useState<{ id: Id; currentValue: string | null; correctValue: string; slotTitle: string | null; }[]>([
        {
            id: 1,
            currentValue: null,
            correctValue: "река",
            slotTitle: "1"
        },
        {
            id: 2,
            currentValue: null,
            correctValue: "солнце",
            slotTitle: "2"
        },
        {
            id: 3,
            currentValue: null,
            correctValue: "тополь",
            slotTitle: "3"
        },
        {
            id: 4,
            currentValue: null,
            correctValue: "улыбка",
            slotTitle: "4"
        },
        {
            id: 5,
            currentValue: null,
            correctValue: "финик",
            slotTitle: "5"
        },
        {
            id: 6,
            currentValue: null,
            correctValue: "хорошо",
            slotTitle: "6"
        }
    ])
    const [variants] = useState<{ id: Id; value: string; }[]>([{
        id: 1,
        value: "река"
    },
    {
        id: 2,
        value: "тополь"
    }, {
        id: 3,
        value: "улыбка"
    },
    {
        id: 4,
        value: "солнце"
    },
    {
        id: 5,
        value: "хорошо"
    },
    {
        id: 6,
        value: "финик"
    }])
    const [status, setStatus] = useState<Status>("idle");
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        console.log(active, over);
        if (over) {
            setSlots(
                slots.map(slot => (slot.id === over.id ? { ...slot, currentValue: active.data.current?.value } : slot)),
            )
        }
    }
    const disableVariant = (variant: { id: Id; value: string; }) => {
        if (slots.find(item => item.currentValue === variant.value)) {
            return true
        }
        return false
    }
    const handleCheck = () => {
        if (slots.every(slot => slot.correctValue === slot.currentValue)) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    }
    const handleReset = () => {
        setSlots(prev => prev.map(item => ({ ...item, currentValue: null })))
    }
    return (
        <div className='AlphabeticalSorter'>
            <Alphabet />
            <div className="AlphabeticalSorter__inner">
                <DndContext onDragEnd={handleDragEnd}>

                    <TrainerTitle>Расставь слова в алфавитном порядке</TrainerTitle>
                    {status === "success" && "Success"}
                    {status === "error" && "Error"}
                    <div className="AlphabeticalSorter__slots">
                        {slots.map(slot => <AlphabeticalSlot id={slot.id} title={slot.slotTitle} value={slot.currentValue} key={'slot-' + slot.id} />)}
                    </div>
                    <div className="AlphabeticalSorter__variants">
                        <ul className="list-reset AlphabeticalSorter__variants-list">
                            {variants.map(variant => <Variant id={variant.id} isDisabled={disableVariant(variant)} value={variant.value} />)}
                        </ul>
                    </div>
                </DndContext>
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={handleCheck}>check</Button>
            </div>
        </div>
    )
}