import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { WordSwitcher } from './WordSwitcher';
import './styles.scss';
import type { Status } from '../../../types/types';

const mockData = {
    text: "{{1}} утреннее {{2}} {{3}} в тёмной морской воде.",
    correctText: "Мягкое утреннее солнце отражается в тёмной морской воде.",
    words: [
        { id: 1, wordN: 1, variants: ["Мягкое", "мягкое"], correct: "Мягкое" },
        { id: 2, wordN: 2, variants: ["Солнце", "солнце.", "солнце"], correct: "солнце" },
        { id: 3, wordN: 3, variants: ["Отражается", "отражается"], correct: "отражается" }
    ]
}


export const FixMistakesInText = () => {
    const [data] = useState(mockData);
    const [selectedIndices, setSelectedIndices] = useState<number[]>(
        new Array(data.words.length).fill(0)
    );
    const [status, setStatus] = useState<Status>("idle");
    const [checkResults, setCheckResults] = useState<boolean[] | null>(null);

    const handleSelect = (wordNumber: number, index: number) => {
        setSelectedIndices(prev => {
            const newIndices = [...prev];
            newIndices[wordNumber - 1] = index;
            return newIndices;
        });
        if (checkResults || status !== "idle") {
            setCheckResults(null);
            setStatus("idle");
        }
    };

    const checkAnswers = () => {
        const results = data.words.map((word, index) => {
            const selectedVariant = word.variants[selectedIndices[index]];
            return selectedVariant === word.correct;
        });

        const allCorrect = results.every(result => result === true);

        setCheckResults(results);
        setStatus(allCorrect ? "success" : "error");
    };

    const resetAnswers = () => {
        setSelectedIndices(new Array(data.words.length).fill(0));
        setCheckResults(null);
        setStatus("idle");
    };
    const render = () => {
        const parts = data.text.split(/(\{\{\d+\}\})/);

        return parts.map((part, index) => {
            if (part.match(/\{\{\d+\}\}/)) {
                const n = part.match(/\d+/g)?.[0];
                if (!n) return <span key={index}>error</span>;

                const wordNumber = Number(n);
                const wordData = data.words.find(ar => ar.wordN === wordNumber);

                if (wordData) {
                    const wordIndex = wordNumber - 1;
                    return (
                        <WordSwitcher
                            key={`word-${wordNumber}`}
                            variants={wordData.variants}
                            selectedIndex={selectedIndices[wordIndex] || 0}
                            onSelect={(index) => handleSelect(wordNumber, index)}
                            isCorrect={checkResults ? checkResults[wordIndex] : undefined}
                            isChecked={checkResults !== null}
                        />
                    );
                } else {
                    return <span key={index}>error</span>;
                }
            }

            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className={`FixMistakesInText FixMistakesInText--${status}`}>
            <div className="FixMistakesInText__inner">
                <TrainerTitle>Исправь ошибки в тексте</TrainerTitle>

                <div className="FixMistakesInText__content">
                    {render()}
                </div>

                <div className="FixMistakesInText__result">
                    {status === "success" && (
                        <div className="FixMistakesInText__success">
                            Success
                        </div>
                    )}

                    {status === "error" && checkResults && (
                        <div className="FixMistakesInText__error">
                            Error
                        </div>
                    )}
                </div>

                <div className="FixMistakesInText__controls">
                    <button
                        className="FixMistakesInText__button FixMistakesInText__button--check"
                        onClick={checkAnswers}
                        disabled={status === "success"}
                    >
                        check
                    </button>

                    <button
                        className="FixMistakesInText__button FixMistakesInText__button--reset"
                        onClick={resetAnswers}
                    >
                        reset
                    </button>
                </div>
            </div>
        </div>
    );
};