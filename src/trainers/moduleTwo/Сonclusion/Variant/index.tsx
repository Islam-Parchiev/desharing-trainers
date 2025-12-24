import { useDraggable } from "@dnd-kit/core";
import { Button } from "../../../../shared/ui/Button"
import type { Id } from "../../../../types/types";
export const ConclusionVariant = ({ id, isDisabled, value }: { id: Id; value: string; isDisabled: boolean }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
        data: { value },
        disabled: isDisabled,


    })
    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined
    return (
        <Button
            asChild
            size="small"
            variant="primary"
            style={style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            disabled={isDisabled}>
            <li>
                {value}
            </li>
        </Button>
    )
}