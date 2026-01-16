import { Card } from "../../widgets/Card"
import type { CardDataType } from "../../widgets/Card/types";
import { useWhatIsSpeechCard } from "../../hooks/trainers/useWhatIsSpeechCard";
const cardData: CardDataType[] = [
    {
        type: 'ChooseCorrectVariant',
        title: "Речь - это умение...",
        correctVariant: "говорить",
        variants: ["хрюкать", "говорить", "молчать"]
    },
    {
        type: 'ChooseCorrectVariant',
        title: "Речью обладают только...",
        correctVariant: "люди",
        variants: ["предметы", "животные", "люди"]
    },
    {
        type: "ChooseMultipleVariants",
        correctVariants: ["спрашивают", "просят", "рассказывают"],
        title: "Что делают люди с помощью речи ? Выбери 3 ответа",
        variants: [
            { id: 1, title: "рычат" },
            { id: 2, title: "спрашивают" },
            { id: 3, title: "молчат" },
            { id: 4, title: "просят" },
            { id: 5, title: "рассказывают" }
        ]
    },
    {
        type: 'ChooseCorrectVariant',
        title: "Речью обладают только2...",
        correctVariant: "люди",
        variants: ["предметы", "животные", "люди"]
    },
]
export const WhatIsSpeech = () => {
    const { currentTaskId, dataLength, renderTrainer, status } = useWhatIsSpeechCard({ data: cardData });
    return <Card status={status} currentTaskNumber={currentTaskId} trainersLength={dataLength}>
        {renderTrainer()}
    </Card>
}