import { useDraggable } from "@dnd-kit/core";

export const Variant = ({ variant, isDisabled }: { variant: string; isDisabled: boolean; }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: variant,
        data: { variant },
        disabled: isDisabled,


    })
    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined
    return (
        <div style={style} className={`CollectPhrasesVariant ${isDisabled ? "disabled" : ""}`} {...attributes} {...listeners} ref={setNodeRef}>
            <span>{variant}</span>
        </div>
    )
}