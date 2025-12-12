import { SignToWordMatcherItem } from './Item';
import { SignToWordMoveItem } from './Move';
import './styles.scss';
import { type DragEndEvent, DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import type { Id, Status } from '../../../types/types';
import { Button } from '../../../shared/ui/Button';
export const SignToWordMatcher = () => {
    const [dropItems, setDropItems] = useState<{ id: Id; currentValue: string | null; correctValue: string; imageUrl: string; }[]>([
        {
            id: 1,
            currentValue: null,
            correctValue: "аптека",
            imageUrl: "/apt.png"
        },
        {
            id: 2,
            currentValue: null,
            correctValue: "кафе",
            imageUrl: "/kafe.png"
        },
        {
            id: 3,
            currentValue: null,
            correctValue: "магазин",
            imageUrl: "/mag.jpg"
        }
    ])
    const [variants] = useState<{ id: Id; value: string; }[]>([{ id: 1, value: "аптека" }, { id: 3, value: "магазин" }, { id: 2, value: "кафе" }])
    const [status, setStatus] = useState<Status>("idle");
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        console.log(active, over);
        if (over) {
            setDropItems(
                dropItems.map(slot => (slot.id === over.id ? { ...slot, currentValue: active.data.current?.content } : slot)),
            )
        }
    }
    const handleCheck = () => {
        if (dropItems.every(item => item.currentValue === item.correctValue)) {
            setStatus("success");
            return
        } else {
            setStatus("error");
            return;
        }
    }
    return (
        <div className="SignToWordMatcher">
            {status === "error" && "Error"}
            {status === "success" && "Success"}
            <DndContext onDragEnd={handleDragEnd}>

                <div className="SignToWordMatcher__inner">
                    <div className="SignToWordMatcher__dropItems">
                        {dropItems.map(item => <SignToWordMatcherItem id={item.id} key={`SignToWordSlot-${item.id}`} imageUrl={item.imageUrl} value={item.currentValue} />)}
                    </div>
                    <ul className="list-reset SignToWordMatcher__moveItems">
                        {variants.map(variant => <SignToWordMoveItem content={variant.value} id={variant.id} key={variant.value + variant.id} isDisabled={false} />)}
                    </ul>
                    <Button variant="primary" onClick={handleCheck}>check</Button>
                </div>
            </DndContext>
        </div>
    )
}