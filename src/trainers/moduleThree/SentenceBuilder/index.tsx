// SentenceBuilder.tsx
import { TrainerTitle } from '../../../components/TrainerTitle';
import './styles.scss';
import { SentenceItem } from './SentenceItem';
import { useState } from 'react';
import type { Status } from '../../../types/types';
import { Button } from '../../../shared/ui/Button';

const sentenceItemsData = [
    {
        title: "Выберите подлежащее:",
        words: ["Я", "Ты", "Он", "Мы"],
        correctAnswer: "Я"
    },
    {
        title: "Выберите сказуемое:",
        words: ["читаю", "пишу", "говорю", "слушаю"],
        correctAnswer: "читаю"
    },
    {
        title: "Выберите дополнение:",
        words: ["книгу", "письмо", "рассказ", "музыку"],
        correctAnswer: "книгу"
    }
];

type SentenceData = {
    title: string;
    words: string[];
    correctAnswer: string;
    currentAnswer: string | null;
};
export const SentenceBuilder = () => {
    const [status, setStatus] = useState<Status>("idle");
    const [data, setData] = useState<SentenceData[]>(
        sentenceItemsData.map(item => ({
            ...item,
            currentAnswer: null
        }))
    );

    const handleAnswerUpdate = (index: number, answer: string | null) => {
        setData(prev => prev.map((item, i) =>
            i === index ? { ...item, currentAnswer: answer } : item
        ));
    };

    const checkAllAnswers = () => {
        const allAnswered = data.every(item => item.currentAnswer !== null);
        const allCorrect = data.every(item => item.currentAnswer === item.correctAnswer);

        if (!allAnswered) {
            setStatus("idle");
            return;
        }

        if (allCorrect) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="SentenceBuilder">
            <div className="SentenceBuilder__inner">
                <TrainerTitle>Соберите предложение</TrainerTitle>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
                <div className="SentenceBuilder__main">
                    <div className="SentenceBuilder__items">
                        {data.map((item, index) => (
                            <SentenceItem
                                key={index}
                                title={item.title}
                                words={item.words}
                                correctAnswer={item.correctAnswer}
                                currentAnswer={item.currentAnswer}
                                onAnswerChange={(answer) => handleAnswerUpdate(index, answer)}
                                status={status}
                            />
                        ))}
                    </div>
                </div>
                <Button variant="primary" onClick={checkAllAnswers}>check</Button>
            </div>
        </div>
    );
};