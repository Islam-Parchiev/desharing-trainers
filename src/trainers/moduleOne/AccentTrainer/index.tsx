import { useState } from 'react';
import { AccentLetter } from './AccentLetter';
import './styles.scss';
import type { Id, Status } from '../../../types/types';
interface IAccentTrainerLetter {
    id: Id;
    letter: string;
    checked: boolean;
    correct: boolean;
}
interface AccentLetterProps {
    title: string;
    data: IAccentTrainerLetter[]
}
export const AccentTrainer = ({ data, title }: AccentLetterProps) => {
    const [letters, setLetters] = useState<IAccentTrainerLetter[]>(data);
    const [status, setStatus] = useState<Status>("idle");
    const [checkedLetterId, setCheckedLetterId] = useState<null | Id>(null);

    const handleLetterClick = (clickedId: Id) => {
        setCheckedLetterId(clickedId);
        setLetters(prevLetters =>
            prevLetters.map(letter => ({
                ...letter,
                checked: letter.id === clickedId
            }))
        );
    };
    const handleCheck = () => {
        const correctLetter = letters.find(letter => letter.correct === true);
        console.log(correctLetter, checkedLetterId);
        if (correctLetter?.id === checkedLetterId) {
            setStatus("success")
            return;
        }
        setStatus("error")
        return;
    }
    return (
        <div className='AccentTrainer'>
            <div className="AccentTrainer__inner">
                <h3 className="AccentTrainer__title">{title}</h3>
                {status === "error" && <div>error</div>}
                {status === "success" && <div>success</div>}
                <div className="AccentTrainer__letters">
                    {letters.map(letter => (
                        <AccentLetter
                            key={letter.id}
                            letter={letter.letter}
                            checked={letter.checked}
                            onClick={() => handleLetterClick(letter.id)}
                        />
                    ))}
                </div>
                {checkedLetterId && <button onClick={handleCheck}>check</button>}
            </div>
        </div>
    )
}