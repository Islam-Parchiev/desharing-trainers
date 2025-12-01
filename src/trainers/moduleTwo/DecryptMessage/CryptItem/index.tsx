import cn from 'classnames';
import './styles.scss';
export type CryptItemType = 'start' | 'word' | 'end';
export const CryptItem = ({ type, selected }: { type: CryptItemType; selected: boolean; }) => {
    const renderContent = () => {

        switch (type) {
            case "start":
                return "|__"
            case "word":
                return "__"
            case "end":
                return "."
            default:
                return "error"
        }
    }

    return (
        <li className={cn("CryptItem", selected && "CryptItemSelected")}>
            <span>

                {renderContent()}
            </span>
        </li>
    )
}