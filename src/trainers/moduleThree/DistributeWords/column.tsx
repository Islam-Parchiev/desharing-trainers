import { Icon } from "../../../shared/ui/MoveBox";
import { DistributeWordsSlot } from "./Slot";

export const DistributeWordsColumn = ({ slots, title }: {
    slots: {
        id: number;
        correctValue: string;
        currentValue: string | null;
    }[];
    title: string;
}) => {
    return (
        <div className="DistributeWordsColumn">
            <div className="DistributeWordsColumn__inner">
                <div className="DistributeWordsColumn__slots">
                    {slots.map(slot => <DistributeWordsSlot key={`DistributeWords-slotF-${slot.id}`} id={slot.id} value={slot.currentValue} />)}

                </div>
                <div className="DistributeWordsColumn__footer">
                    <span>
                        <button className='btn-reset'><Icon /></button>
                    </span>
                    <span>{title}</span>
                </div>
            </div>
        </div>
    )
}