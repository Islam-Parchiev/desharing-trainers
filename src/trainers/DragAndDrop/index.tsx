import { useEffect, type Dispatch, type SetStateAction } from "react"
import { DropBox } from "../../shared/ui/DropBox"
import { MoveBox } from "../../shared/ui/MoveBox"
import { type DragEndEvent, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { Id } from "../../types/types"
export interface IWord {
    id: Id;
    title: string;
}
export interface ISlot {

    id: Id;
    current: string | null;
    imageUrl: string;
    correctValue: string;

}
interface IProps {
    words: IWord[];
    slots: ISlot[];
    setSlots: Dispatch<SetStateAction<ISlot[]>>;
    handleSuccess?: () => void;
    handleError?: () => void;
    type: "primary" | "secondary";
}
export const DragAndDrop = ({
    setSlots,
    slots,
    words,
}: IProps) => {
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
    return (
        <div className="DragAndDropImage">
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
                    </ul>
                    <div className="DropBoxes">
                        {slots.map(slot => <DropBox
                            imageUrl={slot.imageUrl}
                            id={slot.id}
                            title={slot && slot.current} />)}
                    </div>
                </div>
            </DndContext>
        </div>
    )
}