import { useDraggable } from "@dnd-kit/core"
import { Button } from "../../../../shared/ui/Button"

export const DistributeWordsVariant = ({ id, isDisabled, value }: { id: number, value: string, isDisabled: boolean }) => {
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
    return <Button disabled={isDisabled} size="small" variant="primary" asChild>
        <div className="DistributeWordsVariant" style={style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}>
            {value}
        </div>
    </Button>
}