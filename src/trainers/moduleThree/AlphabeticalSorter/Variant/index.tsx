import { useDraggable } from "@dnd-kit/core";
import { Button } from "../../../../shared/ui/Button"
import type { Id } from "../../../../types/types";

export const Variant = ({ id, value, isDisabled }: { id: Id; value: string; isDisabled: boolean; }) => {
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
            variant={"primary"}
            size="small"
            style={style}
            {...listeners}
            {...attributes}
            disabled={isDisabled}
            ref={setNodeRef}>
            <li className="AlphabeticalSorter__variant">
                {value}
            </li>
        </Button>
    )
}