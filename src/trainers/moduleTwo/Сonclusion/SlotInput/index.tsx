import cn from 'classnames'
import './styles.scss';

export const SlotInput = ({ value }: { value: string | null }) => {
    return <span className={cn("SlotInput", value && "SlotInput__filled")}>
        {value || ""}
    </span>
}