import { TrainerTitle } from '../../../components/TrainerTitle';
import './styles.scss';
import { SentenceItem } from './SentenceItem';
import { useState } from 'react';
import type { Status } from '../../../types/types';
import { Button } from '../../../shared/ui/Button';

const SENTENCE_ITEMS_DATA = [
    {
        title: 'Выберите подлежащее:',
        words: ['Я', 'Ты', 'Он', 'Мы'],
        correctAnswer: 'Я'
    },
    {
        title: 'Выберите сказуемое:',
        words: ['читаю', 'писать', 'говорить', 'слушать'],
        correctAnswer: 'читаю'
    },
    {
        title: 'Выберите дополнение:',
        words: ['книгу', 'музыку'],
        correctAnswer: 'книгу'
    }
];

interface SentenceData {
    title: string;
    words: string[];
    correctAnswer: string;
    currentAnswer: string | null;
}

export const SentenceBuilder = () => {
    const [status, setStatus] = useState<Status>('idle');
    const [data, setData] = useState<SentenceData[]>(
        SENTENCE_ITEMS_DATA.map(item => ({
            ...item,
            currentAnswer: null
        }))
    );

    const handleAnswerUpdate = (index: number, answer: string | null) => {
        setData(prev => prev.map((item, i) =>
            i === index ? { ...item, currentAnswer: answer } : item
        ));
        setStatus('idle');
    };

    const checkAllAnswers = () => {
        const allAnswered = data.every(item => item.currentAnswer !== null);

        if (!allAnswered) {
            setStatus('idle');
            return;
        }

        const allCorrect = data.every(item => item.currentAnswer === item.correctAnswer);
        setStatus(allCorrect ? 'success' : 'error');
    };

    const statusMessage = (() => {
        switch (status) {
            case 'success':
                return <div className="SentenceBuilder__message SentenceBuilder__message--success">Success</div>;
            case 'error':
                return <div className="SentenceBuilder__message SentenceBuilder__message--error">Error</div>;
            default:
                return null;
        }
    })();

    return (
        <div className="SentenceBuilder">
            <div className="SentenceBuilder__inner">
                <TrainerTitle>Соберите предложение</TrainerTitle>
                {statusMessage}
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
                            />
                        ))}
                    </div>
                </div>
                <Button
                    variant="primary"
                    onClick={checkAllAnswers}
                    disabled={status === 'success'}
                >
                    check
                </Button>
            </div>
        </div>
    );
};