import { useDroppable } from "@dnd-kit/core"

export const DistributeWordsSlot = ({ id, value }: { id: number, value: string | null }) => {
    const { setNodeRef } = useDroppable({ id })
    return (
        <div className={`DistributeWordsColumn__slot ${value ? "filled" : ""}`} ref={setNodeRef}>
            {value || ""}
        </div>
    )
}