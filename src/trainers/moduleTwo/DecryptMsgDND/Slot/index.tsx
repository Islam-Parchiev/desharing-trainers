import cn from 'classnames';
import './styles.scss';


export const Slot = ({ value }: { value: string | null; }) => {
    return (
        <div className={cn("Slot", value && "SlotFilled")}>
            {value || ""}
        </div >
    )
}