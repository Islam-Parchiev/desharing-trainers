import { useState } from 'react'
import { TrainerTitle } from '../../../components/TrainerTitle'
import cn from 'classnames';
import './styles.scss'
import type { Status } from '../../../types/types';
import { Button } from '../../../shared/ui/Button';

export const DeleteExtraLetter = ({ content, extraLetters }: { content: string; extraLetters: string[] }) => {
    const [word] = useState<string[]>(content.split(""));
    const [selected, setSelected] = useState<string[]>([]);
    const [disabled, setDisabled] = useState<string[]>([])
    const [status, setStatus] = useState<Status>('idle');
    // const [letters] = useState(extraLetters);
    const handleLetterClick = (l: string) => {
        if (extraLetters.includes(l)) {
            setSelected(prev => [...prev, l]);
        } else {
            setDisabled(prev => [...prev, l])
        }
    }
    const handleCheck = () => {
        if (extraLetters.length !== selected.length) {
            setStatus('error');
            return;
        } else {
            for (let i = 0; i < extraLetters.length; i++) {
                if (!selected.includes(extraLetters[i])) {
                    setStatus("error");
                    return;
                }
            }
            setStatus('success');
            return
        }
    }
    const addClass = (l: string) => {
        if (selected.includes(l)) {
            return "hidden"
        }
        if (disabled.includes(l)) {
            return "disabled"
        }
        return ""
    }
    // useEffect(() => {
    //     handleCheck()
    // }, [selected])
    return (
        <div className="DeleteExtraLetter">
            <div className="DeleteExtraLetter__inner">
                <TrainerTitle>Нажми на лишнюю букву</TrainerTitle>
                {status === "error" && "ERROR"}
                {status === "success" && <div><span>
                    SUCCESS
                </span>
                    <div>
                        ERRORS:{disabled.length}
                    </div>
                </div>}
                <div className="DeleteExtraLetter__content">
                    {word.map(letter => (
                        <span
                            className={cn("DeleteExtraLetter__letter", addClass(letter))}
                            onClick={() => handleLetterClick(letter)}>{letter}</span>
                    ))}
                </div>
                <Button onClick={() => handleCheck()}>check</Button>
            </div>
        </div>
    )
}
