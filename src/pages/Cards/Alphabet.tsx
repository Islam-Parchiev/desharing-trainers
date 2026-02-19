import { useEffect } from "react";
import { Card } from "../../widgets/Card"
import type { AlphabetCardType } from "../../widgets/Card/types";
import { useAlphabetCard } from "../../hooks/trainers/useAlphabetCard";
const cardData: AlphabetCardType[] = [
    {
        type: 'ChooseCorrectVariant',
        title: "Как располагаются буквы в алфавите ?",
        correctVariant: "по порядку",
        variants: ["по росту", "по порядку", "по красоте", "вперемешку"]
    },
    {
        id: 2,
        completed: false,
        value: "Слова в предложении {{связаны}} между собой {{по смыслу}} .",
        type: "Conclusion",
        variants: [
            {
                id: 1,
                value: "изменять"
            },
            {
                id: 2,
                value: "заглавная"
            },
            {
                id: 3,
                value: "по смыслу"
            },
            {
                id: 4,
                value: "точка"
            },
            {
                id: 5,
                value: "связаны"
            }
        ],
        slots: [
            { id: 1, current: null, correct: 'по смыслу' },
            { id: 2, current: null, correct: 'связаны' },
        ]
    },

]
export const AlphabetCard = () => {
    const {
        currentTaskId, dataLength, renderTrainer, status, startTimer, getStatistics,
        handleNextTask
    } = useAlphabetCard({ data: cardData })

    useEffect(() => {
        if (currentTaskId === 0 && status === 'idle') {
            startTimer();
        }
    }, [currentTaskId, status, startTimer]);

    return <Card getStatistics={getStatistics} status={status} currentTaskNumber={currentTaskId} trainersLength={dataLength}>
        {renderTrainer()}
        <button onClick={handleNextTask}>next</button>
    </Card>
}