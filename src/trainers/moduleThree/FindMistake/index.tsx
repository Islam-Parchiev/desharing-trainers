import { useEffect, useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import './styles.scss';
import { WordWithMistake } from './Word';
import type { Status } from '../../../types/types';

const mockData = {
    trainerTitle: "Найди ошибку",
    content: "В старом доме есть {{горячяя}} {{вада.}}",
    words: [
        {
            content: "горячяя",
            variants: ["горячаа", "горячая"],
            correctVariant: 'горячая'
        },
        {
            content: "вада.",
            variants: ["вода.", "водя."],
            correctVariant: 'вода.'
        }
    ]
}

export const FindMistake = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [words, setWords] = useState(mockData.words.map(item => ({
        ...item,
        submitted: false
    })));
    const [data] = useState(mockData);

    const submittedOfWord = (value: string) => {
        setWords(prevWords =>
            prevWords.map(item =>
                item.content === value
                    ? { ...item, submitted: true }
                    : item
            )
        );
    };

    const handleWordSuccess = (content: string) => {
        submittedOfWord(content);
    };

    const handleWordError = () => {
        setStatus("error");
    };

    const renderContent = (sentence: string) => {
        const parts = sentence.split(/\{\{([^{}]+)\}\}/g);

        return parts.map((part, index) => {
            const word = words.find(w => w.content === part);

            if (word) {
                return (
                    <WordWithMistake
                        key={`WordWithMistake-${word.content}-${index}`}
                        content={word.content}
                        correctVariant={word.correctVariant}
                        variants={word.variants}
                        handleError={handleWordError}
                        handleSuccess={() => handleWordSuccess(word.content)}
                    />
                );
            }

            return <span key={`text-${index}`}>{part}</span>;
        });
    };

    const checkCompletion = () => {
        if (words.every(word => word.submitted)) {
            setStatus('success');
        }
    };

    useEffect(() => {
        checkCompletion();
    }, [words]);

    return (
        <div className='FindMistake'>
            <div className="FindMistake__inner">
                <TrainerTitle>{data.trainerTitle}</TrainerTitle>
                <h3>Нажми на слово, которое написано неправильно</h3>

                {status === "success" && <div className="success-message">Success</div>}
                {status === "error" && <div className="error-message">Error</div>}

                <div className="FindMistake__content">
                    {renderContent(data.content)}
                </div>
            </div>
        </div>
    );
};