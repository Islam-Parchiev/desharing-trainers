import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import type { WordClicker } from '../../../types/types';
import './styles.scss';

type WordState = {
    text: string;
    isPolite: boolean;
    isSelected: boolean;
}

interface PoliteWordsClickerProps extends WordClicker {
    handleError: () => void;
    handleSuccess: () => void;
}
export const PoliteWordsClicker = ({ correctValues, text, title, handleError, handleSuccess }: PoliteWordsClickerProps) => {
    const [words, setWords] = useState<WordState[]>(() => {

        const regex = /([^\s"']+|"[^"]*"|'[^']*')/g;
        const matches = text.match(regex) || [];

        return matches.map(word => ({
            text: word,
            isPolite: correctValues.some(correct =>
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





    const handleReset = () => {
        setWords(prev => prev.map(word => ({ ...word, isSelected: false })));
    };
    const handleCheck = () => {
        if (words.filter(word => word.isPolite).every(word => word.isSelected)) {
            handleSuccess()
            return
        } else {
            handleError()
            return
        }
    }
    return (
        <div className="PoliteWordsClicker">
            <div className="PoliteWordsClicker__inner">
                <TrainerTitle>{title}</TrainerTitle>

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
                    <button onClick={handleCheck}>check</button>
                </div>
            </div>
        </div>
    )
}