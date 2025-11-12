import { useEffect, useState } from "react"
import { DropBox } from "../../shared/ui/DropBox"
import { MoveBox } from "../../shared/ui/MoveBox"
import { type DragEndEvent, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { Id } from "../../types/types"
export interface ISlot {
    id: string | number
    correct: string
    current: null | string
}
export const DragAndDropImage = () => {
    const [words] = useState([{ id: 1, title: "Мяуканье" }, { id: 2, title: "V8" }, { id: 3, title: "Лай" }])
    const [slots, setSlots] = useState<{
        id: Id;
        current: string | null;
        imageUrl: string;
        correctValue: string;
    }[]>([
        {
            id: 1,
            current: null,
            imageUrl: "dog.png",
            correctValue: "Лай"
        },
        {
            id: 2,
            current: null,
            imageUrl: "cat.png",
            correctValue: "Мяуканье"
        },
        {
            id: 3,
            current: null,
            imageUrl: "v8.png",
            correctValue: "V8"
        }
    ])
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });
    const sensors = useSensors(
        mouseSensor,
    )
    useEffect(() => {
        console.log(slots);
    }, [slots])
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        console.log(over);
        if (over) {
            setSlots(
                slots.map(slot => (slot.id === over.id ? { ...slot, current: active.data.current?.title } : slot)),
            )
        }
    }
    const disableMoveBox = (value: string) => {
        if (slots.find(item => item.current === value)) {
            return true
        }
        return false
    }
    const handleCheck = () => {
        if (slots.every(slot => slot.current === slot.correctValue)) {
            setSuccess(true);
        } else {
            setError(true);
        }
    }
    return (
        <div className="DragAndDropImage">
            {success && <div>
                success
            </div>}
            {error && <div>
                error
            </div>}
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>

                <div className="DragAndDropImage__inner">
                    <ul className="MoveBoxes">
                        {words.map(word => (

                            <MoveBox
                                title={word.title}
                                key={`wordBox-${word.title}+${word.id}`}
                                id={word.id}
                                isDisabled={disableMoveBox(word.title)} />
                        ))}
                        {/* <MoveBox title="V8" /> */}
                        {/* <MoveBox title="Лай" /> */}
                    </ul>
                    <div className="DropBoxes">
                        {slots.map(slot => <DropBox
                            imageUrl={slot.imageUrl}
                            id={slot.id}
                            title={slot && slot.current} />)}
                    </div>
                </div>
            </DndContext>
            <button onClick={handleCheck}>check</button>
        </div>
    )
}