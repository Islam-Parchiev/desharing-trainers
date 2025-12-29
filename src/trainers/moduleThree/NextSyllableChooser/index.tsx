import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import './styles.scss';
import cn from 'classnames';
import type { Id, Status } from '../../../types/types';
interface SyllableItem {
    id: Id;
    content: string;
    selected: boolean;
    correct: boolean;
}

interface CurrentPoint {
    id: Id;
    content: string;
}

interface MockData {
    title: string;
    data: SyllableItem[];
    currentPoint: CurrentPoint;
    correctAnswers: string[];
}
const mockData: MockData = {
    title: "Выберите следующий слог, чтобы получилось слово из двух слогов",
    data: [
        { id: 1, content: "ло", selected: false, correct: false },
        { id: 2, content: "рик", selected: false, correct: false },
        { id: 3, content: "ду", selected: false, correct: false },
        { id: 4, content: "за", selected: false, correct: false },
        { id: 5, content: "тин", selected: false, correct: false },
        { id: 6, content: "ка", selected: false, correct: false },
        { id: 7, content: "па", selected: false, correct: false },
        { id: 8, content: "мо", selected: false, correct: true },
        { id: 9, content: "ре", selected: false, correct: true },
        { id: 10, content: "си", selected: false, correct: false },
        { id: 11, content: "ход", selected: false, correct: false },
        { id: 12, content: "ва", selected: false, correct: false },
        { id: 13, content: "у", selected: false, correct: false },
        { id: 14, content: "се", selected: false, correct: false },
        { id: 15, content: "ян", selected: false, correct: false },
        { id: 16, content: "па", selected: false, correct: true },
        { id: 17, content: "ре", selected: false, correct: false },
        { id: 18, content: "ша", selected: false, correct: false },
        { id: 19, content: "мар", selected: false, correct: false },
        { id: 20, content: "по", selected: false, correct: false },
        { id: 21, content: "на", selected: false, correct: false },
        { id: 22, content: "мар", selected: false, correct: false },
        { id: 23, content: "ра", selected: false, correct: true },
        { id: 24, content: "ма", selected: false, correct: true },
        { id: 25, content: "жи", selected: false, correct: false },
        { id: 26, content: "ду", selected: false, correct: false },
        { id: 27, content: "рь", selected: false, correct: true },
        { id: 28, content: "те", selected: false, correct: false },
        { id: 29, content: "со", selected: false, correct: false },
        { id: 30, content: "па", selected: false, correct: false },
        { id: 31, content: "ска", selected: false, correct: true },
        { id: 32, content: "ла", selected: false, correct: true },
        { id: 33, content: "ка", selected: false, correct: false },
        { id: 34, content: "да", selected: false, correct: true },
        { id: 35, content: "ча", selected: false, correct: true },
        { id: 36, content: "дик", selected: false, correct: false },
        { id: 37, content: "пог", selected: false, correct: false },
        { id: 38, content: "ди", selected: false, correct: false },
        { id: 39, content: "ма", selected: false, correct: true },
        { id: 40, content: "сло", selected: false, correct: true },
        { id: 41, content: "во", selected: false, correct: true },
        { id: 42, content: "ни", selected: false, correct: false },
        { id: 43, content: "ход", selected: false, correct: false },
        { id: 44, content: "ро", selected: false, correct: false },
        { id: 45, content: "то", selected: false, correct: false },
        { id: 46, content: "чка", selected: false, correct: false },
        { id: 47, content: "ни", selected: false, correct: false },
        { id: 48, content: "са", selected: false, correct: false },
        { id: 49, content: "ви", selected: false, correct: false }
    ],
    currentPoint: { id: 8, content: "мо" },
    correctAnswers: ["море", "репа", "пара", "рама", "маска", "скала", "лама", "масло", "слово", "вода", "дача",]
}
export const NextSyllableChooser = () => {
    const [data, setData] = useState(mockData);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [status, setStatus] = useState<Status>("idle");
    const handleItemClick = (clickedCell: SyllableItem) => {
        if (selectedAnswers.length === data.correctAnswers.length || clickedCell.selected) {
            return;
        }

        const currentAnswer = data.currentPoint.content + clickedCell.content;
        const isCorrectAnswer = clickedCell.correct && data.correctAnswers.includes(currentAnswer);

        if (isCorrectAnswer) {
            const newSelectedAnswers = [...selectedAnswers, currentAnswer];
            setSelectedAnswers(newSelectedAnswers);

            setData(prev => {
                const updatedData = prev.data.map(item =>
                    item.id === prev.currentPoint.id || item.id === clickedCell.id
                        ? { ...item, selected: true }
                        : item
                );

                return {
                    ...prev,
                    data: updatedData,
                    currentPoint: {
                        id: clickedCell.id,
                        content: clickedCell.content
                    }
                };
            });

            if (newSelectedAnswers.length === data.correctAnswers.length) {
                setStatus("success");
            }
        } else {
            setStatus("error");
        }
    };
    const render = () => {
        return data.data.map(cell => {
            return <div onClick={() => handleItemClick(cell)} className={cn("maze__cell", cell.id === data.currentPoint.id ? "maze__cell--start" : "", cell.selected && "maze__cell--selected")}>{cell.content}</div>
        })
    }
    return (
        <div className="NextSyllableChooser">
            <div className="NextSyllableChooser__inner">
                <TrainerTitle>{data.title}</TrainerTitle>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
                <div className="maze">
                    <div className="maze_container">
                        {render()}
                    </div>
                </div>
            </div>
        </div>
    )
}