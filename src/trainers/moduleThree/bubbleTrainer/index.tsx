import { useEffect, useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { Button } from '../../../shared/ui/Button';
import './styles.scss';
import type { Status } from '../../../types/types';
interface WordData {
    id: number;
    word: string;
    isCorrect: boolean;
    position?: unknown;
}

export const BubbleTrainer = () => {
    const [words, setWords] = useState<WordData[]>([
        { id: 1, word: "мёд", isCorrect: true },
        { id: 2, word: "топот", isCorrect: false },
        { id: 3, word: "кран", isCorrect: true },
        { id: 4, word: "квадрат", isCorrect: false },
        { id: 5, word: "пароход", isCorrect: false },
        { id: 6, word: "гроза", isCorrect: false },
        { id: 7, word: "край", isCorrect: true },
        { id: 8, word: "плёнка", isCorrect: true }
    ]);
    const [status, setStatus] = useState<Status>("idle");
    const [selectedItems, setSelectedItems] = useState<WordData[]>([]);
    const positions = [
        { top: "0%", left: "0%" },
        { top: "50%", left: "26%" },
        { top: "25%", left: "76%" },
        { top: "50%", left: "55%" },
        { top: "20%", left: "35%" },
        { top: "15%", left: "55%", width: 130, height: 130 },
        { top: "35%", left: "5%" },
        { top: "5%", left: "20%" },
    ];

    useEffect(() => {
        const wordsWithPositions = words.map((word: WordData, index: number) => ({
            ...word,
            position: positions[index] || positions[0]
        }));
        setWords(wordsWithPositions);
    }, []);


    const handleBubbleClick = (item: WordData) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(prev => prev.filter(pItem => pItem.id !== item.id))
        } else {

            setSelectedItems(prev => [...prev, item])
        }
    }
    const isSelected = (item: WordData) => {
        if (selectedItems.includes(item)) {
            return true;
        } else {
            return false;
        }
    }
    const handleCheck = () => {
        const correctWordsCount = words.filter(word => word.isCorrect).length;
        const selectedCorrectCount = selectedItems.filter(item => item.isCorrect).length;
        const isCompleteSuccess = selectedCorrectCount === correctWordsCount &&
            selectedCorrectCount === selectedItems.length;

        if (isCompleteSuccess) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    }
    return (
        <div className="BubbleTrainer">
            <div className="BubbleTrainer__inner">
                <TrainerTitle>Выбери слова, в которых НЕ ставится знак ударения</TrainerTitle>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
                <div className="BubbleTrainer__main">
                    {words.map((item, index) => (
                        <div
                            key={item.id}
                            className="BubbleTrainerSlot"
                            style={item.position || { top: 0, left: 0 }}
                        >
                            <Button className={isSelected(item) ? "BubbleTrainerSlot__selected" : ""} variant="secondary" size="medium" onClick={() => handleBubbleClick(item)}>
                                {item.word}
                            </Button>
                        </div>
                    ))}
                    <Button style={{ position: "absolute", bottom: 0, left: "50%" }} onClick={handleCheck}>check</Button>
                </div>
            </div>
        </div>
    );
};