import './styles.scss';

import { DragItem } from './DragItem';
import { DropVariant } from './DropVariant';
import { useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { TrainerTitle } from '../../../components/TrainerTitle';
import type { Id, Status } from '../../../types/types';
const mockData = {
    title: "Передай яблоко тому, кто просит вежливо",
    variants: [
        {
            id: 1,
            imageUrl: "/gr1.png",
            content: "Дай мне, пожалуйста, яблоко.",
            correct: true,
        },
        {
            id: 2,
            imageUrl: "/gr2.png",
            content: "А ну-ка дай мне яблоко!",
            correct: false,
        }
    ],
    dragItem: {
        id: 1,
        imageUrl: "/apple.png",
    }
}
export const PhoneticDndTrainer = () => {
    const [variants] = useState<{ id: Id; imageUrl: string; content: string; correct: boolean; }[]>(mockData.variants);
    const [status, setStatus] = useState<Status>("idle");
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        console.log("over:", over?.data.current);
        console.log("active:", active);
        if (over?.data.current) {
            if (over?.data.current.correct === true) {

                setStatus("success");
            } else {
                setStatus("error");
            }
        }
    }
    return (
        <div className="PhoneticDndTrainer">
            <div className="PhoneticDndTrainer__inner">
                <TrainerTitle>{mockData.title}</TrainerTitle>
                {status === "success" && "success"}
                {status === "error" && "error"}
                <DndContext onDragEnd={handleDragEnd}>

                    <div className="PhoneticDndTrainer__content">
                        <div className="PhoneticDndTrainer__variants">

                            {variants.map((variant) => (


                                <DropVariant id={variant.id} imageUrl={variant.imageUrl} content={variant.content} className="" correct={variant.correct} />
                            )
                            )}
                            {/* <DropVariant imageUrl='/gr2.png' /> */}

                        </div>
                    </div>
                    <DragItem id={mockData.dragItem.id} imageUrl={mockData.dragItem.imageUrl} isDisabled={false} />
                </DndContext>
            </div>
        </div>
    )
}