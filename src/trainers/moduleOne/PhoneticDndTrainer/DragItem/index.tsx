import { useDraggable } from "@dnd-kit/core"
import type { Id } from "../../../../types/types";

export const DragItem = ({ id, imageUrl = "/apple.png", isDisabled }: { id: Id; isDisabled: boolean; imageUrl: string; }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        disabled: isDisabled,
    })
    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined
    return (
        <div
            style={style}
            className="PhoneticDndTrainer__draggableItem"
            {...listeners}
            {...attributes}
            ref={setNodeRef}>
            <img src={imageUrl} alt="" />
        </div>
    )
}