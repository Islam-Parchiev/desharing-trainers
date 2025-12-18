import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import './styles.scss';
// import type { Status } from '../../../types/types';

const mockData = {
    text: "Муха | Жу, | хоть | не | хотела, | В | скорый | поезд | залетела.| Ей | букашки | Фло | и | Фти | Скажут: | 'Доброго пути!' | Здравствуйте ",
    correctItems: ["'Доброго пути!'", "Здравствуйте"]
}

type WordState = {
    text: string;
    isPolite: boolean;
    isSelected: boolean;
}

export const PoliteWordsClicker = () => {
    const [data] = useState(mockData);
    // const [status, setStatus] = useState<Status>("idle");
    const [words, setWords] = useState<WordState[]>(() => {
        const splittedWords = data.text.split("|").filter(word => word.trim() !== '');
        return splittedWords.map(word => ({
            text: word,
            isPolite: data.correctItems.some(correct =>
                word.includes(correct) || correct.includes(word)
            ),
            isSelected: false
        }));
    });


    const handleWordClick = (index: number) => {

        setWords(prev => prev.map((word, i) =>
            i === index ? { ...word, isSelected: !word.isSelected } : word
        ));
    };


    const allPoliteSelected = words
        .filter(word => word.isPolite)
        .every(word => word.isSelected);


    const handleReset = () => {
        setWords(prev => prev.map(word => ({ ...word, isSelected: false })));
    };

    return (
        <div className="PoliteWordsClicker">
            <div className="PoliteWordsClicker__inner">
                <TrainerTitle>Нажми на вежливые слова</TrainerTitle>

                {allPoliteSelected && (
                    <div className="PoliteWordsClicker__success">
                        Success
                    </div>
                )}

                <div className="PoliteWordsClicker__content">
                    {words.map((word, index) => (
                        <span
                            key={'polite-word-' + index}
                            className={`PoliteWordsClicker__word ${word.isSelected && word.isPolite ? 'PoliteWordsClicker__word--selected' : ''} ${word.isSelected && !word.isPolite ? "disabled" : ""}`}
                            onClick={() => handleWordClick(index)}
                        >
                            {word.text}
                        </span>
                    ))}
                </div>

                <div className="PoliteWordsClicker__controls">
                    <button
                        className="PoliteWordsClicker__reset"
                        onClick={handleReset}
                    >
                        Сбросить выбор
                    </button>

                </div>
            </div>
        </div>
    )
}