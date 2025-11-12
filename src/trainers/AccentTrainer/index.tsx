import { useState } from 'react';
import { AccentLetter } from './AccentLetter';
import './styles.scss';
import type { Id, Status } from '../../types/types';

export const AccentTrainer = () => {
    const [letters, setLetters] = useState<{ id: Id; letter: string; checked: boolean; correct: boolean }[]>([
        { id: 1, letter: "Г", checked: false, correct: false },
        { id: 2, letter: "О", checked: false, correct: true },
        { id: 3, letter: "Р", checked: false, correct: false },
        { id: 4, letter: "О", checked: false, correct: false },
        { id: 5, letter: "Д", checked: false, correct: false },
    ]);
    const [status, setStatus] = useState<Status>("idle");
    const [checkedLetterId, setCheckedLetterId] = useState<null | Id>(null);
    // Функция для обработки нажатия на букву
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
                <h3 className="AccentTrainer__title">Нажми на букву, чтобы поставить ударение</h3>
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