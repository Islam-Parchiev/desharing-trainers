import cn from 'classnames';
import './styles.scss';
export const FillInVariant = ({ isDisabled, value = "test", onClick }: { onClick: () => void; value: string; isDisabled: boolean; }) => {
    return (
        <div className={cn("FillInVariant", isDisabled && "disabled")} onClick={onClick}>
            <span>{value}</span>
        </div>
    )
}