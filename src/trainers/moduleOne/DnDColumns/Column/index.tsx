
import cn from 'classnames';
import './styles.scss';
import { useDroppable } from "@dnd-kit/core";
import { Button } from '../../../../shared/ui/Button';
import { Icon } from '../../../../shared/ui/MoveBox';
import type { Id } from '../../../../types/types';


export const Column = ({
    slotValue = "test",
    id,
    content
}: { id: Id; slotValue: string | null; content: string; }) => {
    const { setNodeRef } = useDroppable({ id })
    return (
        <div className="Column">
            <div className="Column__card">
                <Button className="Column__btn" variant="iconPrimary" size="iconBig"><Icon /></Button>
                <div className="Column__text">
                    <p>
                        {content}
                    </p>
                </div>
            </div>
            <div className={cn("Column__slot", slotValue && "filled")} ref={setNodeRef}>
                {slotValue || ""}
            </div>
        </div>
    )
}