import { useDroppable } from "@dnd-kit/core";
import type { Id } from "../../../../types/types";
import './styles.scss';
import cn from 'classnames';
export const AlphabeticalSlot = ({ id, value, title }: { id: Id; value: string | null; title: string | null; }) => {
    const { setNodeRef } = useDroppable({ id })
    return (
        <div className={cn("AlphabeticalSlot", value && "filled")}>
            {title && <span className="AlphabeticalSlot__title">{title}</span>}
            <div className="AlphabeticalSlot__slot" ref={setNodeRef}>{value || ""}</div>
        </div >
    )
}