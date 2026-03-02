import { useState } from 'react';
import { TrainerTitle } from '../../components/TrainerTitle';
import { Button } from '../../shared/ui/Button';
import { Icon } from '../../shared/ui/MoveBox';
import './styles.scss';

interface TrainerItem {
    id: number | string;
    content: string;
    correctValue: boolean;
    media?: string;
}

interface UniversalBinaryTrainerProps {
    title: string;
    items: TrainerItem[];
    columns: [
        { btnLabel: string; value: boolean },
        { btnLabel: string; value: boolean }
    ];
    onSuccess?: () => void;
    onError?: () => void;
}

export const UniversalBinaryTrainer = ({
    title,
    items,
    columns,
    onError,
    onSuccess
}: UniversalBinaryTrainerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortedData, setSortedData] = useState<Record<string, string[]>>({
        "true": [],
        "false": []
    });

    const currentItem = items[currentIndex];
    const isFinished = currentIndex >= items.length;

    const handleChoice = (userChoice: boolean) => {
        if (isFinished) return;

        if (userChoice === currentItem.correctValue) {
            setSortedData(prev => ({
                ...prev,
                [String(userChoice)]: [...prev[String(userChoice)], currentItem.content]
            }));

            if (currentIndex + 1 >= items.length) {
                onSuccess?.();
            }
            setCurrentIndex(prev => prev + 1);
        } else {
            console.log('Неверно');
            onError?.();
        }
    };

    const playMedia = () => {
        if (currentItem?.media) {
            new Audio(currentItem.media).play().catch(() => { });
        }
    };

    if (isFinished) {
        return <div className="Trainer__finished">Упражнение завершено!</div>;
    }

    return (
        <div className='LetterRecognitionTrainer'>
            <div className="LetterRecognitionTrainer__inner">
                <TrainerTitle>{title}</TrainerTitle>

                <div className="LetterRecognitionTrainer__content">
                    <div className="LetterRecognitionTrainer__main">
                        <div className="LetterRecognitionTrainer__word_window">
                            {currentItem.media && (
                                <button
                                    className="btn-reset LetterRecognitionTrainer__sound"
                                    onClick={playMedia}
                                >
                                    <Icon />
                                </button>
                            )}
                            <span>{currentItem.content}</span>
                        </div>
                    </div>
                    {columns.map((col, index) => (
                        <div key={index} className="LetterRecognitionTrainer__contents-wrapper">

                            <div className="LetterRecognitionTrainer__col">
                                <Button
                                    className="LetterRecognitionTrainer__col_btn"
                                    onClick={() => handleChoice(col.value)}
                                >
                                    {col.btnLabel}
                                </Button>
                                <div className="LetterRecognitionTrainer__col-items">
                                    {sortedData[String(col.value)].map((text, i) => (
                                        <Button key={i} variant="secondary" className='LetterRecognitionTrainer__col-item'>
                                            {text}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};