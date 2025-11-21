import { useState } from 'react';

import { Column } from './Column';
import './styles.scss';

import { Variant } from './Variant';
import { type DragEndEvent, DndContext } from '@dnd-kit/core';
import type { TrainerTitle } from '../../../components/TrainerTitle';
import type { Button } from '../../../shared/ui/Button';
import type { Id, Status } from '../../../types/types';

interface IVariant {
    id: Id;
    value: string;
}
export const DnDColumns = () => {
    const [slots, setSlots] = useState<{ id: Id; currentValue: string | null; correctValue: string; content: string; }[]>([
        {
            id: 1,
            currentValue: null,
            correctValue: "книга сказок",
            content: "Катись, катись, яблочко наливное, по серебряному блюдечку!"
        },
        {
            id: 2,
            currentValue: null,
            correctValue: "энциклопедия",
            content: "Яблоко - плод яблони, один из самых доступных источников витаминов."
        },
        {
            id: 3,
            currentValue: null,
            correctValue: "разговор",
            content: "Хочешь куснуть яблоко ?"

        }
    ])
    const [variants] = useState<IVariant[]>([
        {
            id: 1,
            value: "энциклопедия"
        },
        {
            id: 2,
            value: "разговор"
        },
        {
            id: 3,
            value: "книга сказок"
        }
    ])
    const [status, setStatus] = useState<Status>("idle")
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        console.log(active, over);
        if (over) {
            setSlots(
                slots.map(slot => (slot.id === over.id ? { ...slot, currentValue: active.data.current?.value } : slot)),
            )
        }
    }
    const disableVariant = (variant: IVariant) => {
        if (slots.find(item => item.currentValue === variant.value)) {
            return true
        }
        return false
    }
    const handleCheck = () => {
        if (slots.every(item => item.correctValue === item.currentValue)) {
            setStatus("success")
            return;
        } else {
            setStatus("error");
            return;
        }
    }
    return (
        <div className="DnDColumns">
            <DndContext onDragEnd={handleDragEnd}>

                <div className="DnDColumns__inner">
                    <TrainerTitle>Перемести под текст подходящее слово</TrainerTitle>
                    {status === "error" && <div>error</div>}
                    {status === "success" && <div>succes</div>}
                    <div className="DnDColumns__row DnDColumns__row--cols">
                        {slots.map(slot => <Column content={slot.content} id={slot.id} slotValue={slot.currentValue || ""} key={`dnd-slot-${slot.id}`} />)}
                    </div>
                    <div className="DnDColumns__row DnDColumns__row--variants">
                        {variants.map(variant => <Variant id={variant.id} key={`dnd-variant-${variant.id}-${variant.value}`} value={variant.value} isDisabled={disableVariant(variant)} />)}
                    </div>
                </div>
            </DndContext>
            <Button variant="primary" onClick={handleCheck} size="medium">check</Button>
        </div>
    )
}