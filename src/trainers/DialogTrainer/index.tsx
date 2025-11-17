import { useState } from 'react';
import { DialogSentence } from './DialogSentence';
import { DialogVariant } from './DialogVariant';
import './styles.scss';
import type { Id, Status } from '../../types/types';
import { DialogSlot } from './DialogSlot';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Button } from '../../shared/ui/Button';
interface DialogSentence {
    id: Id;
    type: "sentence";
    value: string;
}
interface DialogSlot {
    id: Id;
    type: "slot";
    currentValue: string | null;
    correctValue: string;
}
interface DialogVariant {
    id: Id;
    value: string;
}
type DialogItem = DialogSentence | DialogSlot;
export const DialogTrainer = () => {
    const [data, setData] = useState<DialogItem[]>([
        { id: 1, type: "sentence", value: "Привет, Маша!" },
        { id: 2, type: "slot", correctValue: "Привет, Серёжа!", currentValue: null },
        { id: 3, type: "sentence", value: "Ты куда спешишь ?" },
        { id: 4, type: "slot", correctValue: "В музыкальную школу!", currentValue: null }
    ])
    const [variants] = useState<DialogVariant[]>([
        {
            id: 1,
            value: "Привет, Серёжа!"
        },
        {
            id: 2,
            value: "В музыкальную школу!"
        }
    ])
    const [status, setStatus] = useState<Status>("idle");
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        console.log(over);
        if (over) {
            setData(
                // slots.map(slot => (slot.id === over.id ? { ...slot, current: active.data.current?.title } : slot)),
                data.map(item => {
                    if (item.type === "slot" && item.id === over.id) {
                        return {
                            ...item,
                            currentValue: active.data.current?.value
                        }
                    } else {
                        return item
                    }
                })
            )
        }
    }
    const handleCheck = () => {
        const slotItems = data.filter(item => item.type === "slot");

        if (slotItems.length > 0 && slotItems.every(item =>
            item.currentValue === item.correctValue
        )) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    }
    const disableVariant = (variant: DialogVariant) => {
        const slotItems = data.filter(item => item.type === "slot");
        if (slotItems.find(item => item.currentValue === variant.value)) {
            return true
        }
        return false
    }
    return (
        <div className="DialogTrainer">
            <div className="DialogTrainer__inner">
                <div className="DialogTrainer__content">
                    {status === "error" && "Ошибка"}
                    {status === "success" && "Успех"}
                    <DndContext onDragEnd={handleDragEnd}>


                        <div className="DialogTrainer__window DialogWindow">
                            <div className="DialogWindow__inner">
                                <div className="DialogWindow__text">
                                    {
                                        data.map((item) => {
                                            if (item.type === "sentence") {
                                                return <DialogSentence content={item.value} key={`${item.value}-${item.id}`} />
                                            }
                                            if (item.type === "slot") {
                                                return <DialogSlot id={item.id} value={item.currentValue} key={`dialog-slot-${item.id}`} />
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="DialogTrainer__variants">
                            {variants.map(variant => <DialogVariant id={variant.id} isDisabled={disableVariant(variant)} value={variant.value} key={`${variant.value}-${variant.id}`} />)}
                        </div>
                    </DndContext>
                    <Button variant="primary" size="medium" onClick={handleCheck}>Готово</Button>
                </div>
            </div>
        </div>
    )
}

// .card.player-1 .ajax-loader.dino-apple
// Specificity: (0,4,0)
//  {
//     position: absolute;
//     top: 180px;
//     left: 50%;
//     margin-left: -85px;
//     width: 170px;
//     height: 120px;
//     background-image: url(/fp/109/fat_player/players/player-1/src/loader/img/loader-dino-apple-39118b1….png);
//     -webkit-background-size: 1360px 480px;
//     background-size: 1360px 480px;
//     background-repeat: no-repeat;
//     -ms-animation: "_card_player-1_dino_apple" 1.5s steps(1) infinite;
//     -moz-animation: "_card_player-1_dino_apple" 1.5s steps(1) infinite;
//     -webkit-animation: "_card_player-1_dino_apple" 1.5s steps(1) infinite;
//     animation: "_card_player-1_dino_apple" 1.5s steps(1) infinite;
// }