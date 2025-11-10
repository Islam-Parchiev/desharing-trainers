
import type { Variant } from '../../App';
import './style.scss';
import cn from 'classnames'
interface VariantItemProps extends Variant {
    selected?: boolean;
    handleItemClick: () => void;
    className: string;
    title:string;

}
export const VariantItem = ({ title = "testVariant", selected = false, handleItemClick, className }: VariantItemProps) => {
    return <div className={cn("VariantItem", selected && "selected", className)} onClick={handleItemClick}>
        {title}
    </div>
}