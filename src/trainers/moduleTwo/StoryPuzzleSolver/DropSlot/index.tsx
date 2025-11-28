import cn from 'classnames';
import { useDroppable } from "@dnd-kit/core";
import './styles.scss'
import { Icon } from "../../../../shared/ui/MoveBox"
import type { Id } from "../../../../types/types";

export const DropSlot = ({
    content,
    value,
    id,
}: {
    id: Id;
    content: string;
    value: string | null;
}) => {
    const { setNodeRef } = useDroppable({ id })
    return (
        <div className={cn("PuzzleDropSlot", value && "filled")} ref={setNodeRef}>
            <div className="PuzzleDropSlot_inner">
                {value === null ? <>
                    <button className="btn-reset"><Icon /></button>
                    <span>{content}</span>
                </> :
                    value
                }

            </div>
        </div>
    )
}