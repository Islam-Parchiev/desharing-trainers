import cn from 'classnames';
import './styles.scss';
export const AccentLetter = ({ checked = false, letter = "Д", onClick }: { onClick: () => void; checked: boolean; letter: string; }) => {
    return <div className={cn("AccentLetter", checked && "checked")} onClick={onClick}>
        <span className='AccentLetter__content'>
            <span className="AccentLetter__mark">'</span>
            {letter}
        </span>
    </div>
}