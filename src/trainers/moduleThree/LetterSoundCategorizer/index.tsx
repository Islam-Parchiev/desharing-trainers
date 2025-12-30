import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { Icon } from '../../../shared/ui/MoveBox';
import './styles.scss';
import { Button } from '../../../shared/ui/Button';
import type { Status } from '../../../types/types';

const mock = {
    word: "пароход",
    correctItems: ["а", "о", "о"],
}

export const LetterSoundCategorizer = ({ title = "Нажми на буквы, которые обозначают ГЛАСНЫЕ звуки" }: { title: string; }) => {
    const [data] = useState(mock);
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
    const [status, setStatus] = useState<Status>("idle");

    const lettersWithIndexes = data.word.split("").map((letter, index) => ({
        letter,
        id: `${letter}-${index}`
    }));

    const handleLetterClick = (letter: string, index: number) => {
        const letterId = `${letter}-${index}`;

        setSelectedLetters(prev => {
            const letterIndex = prev.findIndex(l => l === letterId);
            if (letterIndex > -1) {
                return prev.filter((_, i) => i !== letterIndex);
            } else {
                return [...prev, letterId];
            }
        });
        setStatus("idle");
    }

    const handleCheck = () => {
        const selectedLettersOnly = selectedLetters.map(id => id.split('-')[0]);
        const selectedSorted = [...selectedLettersOnly].sort();
        const correctSorted = [...data.correctItems].sort();
        if (selectedSorted.length !== correctSorted.length) {
            setStatus("error")
            return;
        }

        const isCorrect = selectedSorted.every((letter, index) => letter === correctSorted[index]);

        if (isCorrect) {
            setStatus("success");
        } else {
            setStatus("error")
        }
    }

    const handleReset = () => {
        setSelectedLetters([]);
        setStatus("idle");
    }

    return (
        <div className="LetterSoundCategorizer">
            <div className="LetterSoundCategorizer__inner">
                <TrainerTitle>{title}</TrainerTitle>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
                <div className="LetterSoundCategorizer__main">
                    <div className="LetterSoundCategorizer__content">
                        <button className='btn-reset sound-btn'>
                            <Icon />
                        </button>
                        <div className='LetterSoundCategorizer__word'>
                            {lettersWithIndexes.map(({ letter, id }, index) => {
                                const isSelected = selectedLetters.includes(id);

                                return (
                                    <span
                                        key={id}
                                        className={`LetterSoundCategorizer__word-letter ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleLetterClick(letter, index)}
                                    >
                                        {letter}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="LetterSoundCategorizer__controls">
                <Button onClick={handleCheck} disabled={selectedLetters.length === 0}>
                    Проверить
                </Button>
                <Button onClick={handleReset} variant="secondary">
                    Сбросить
                </Button>
            </div>
        </div>
    )
}