import { Card } from "../../widgets/Card"
// import type { CardDataType } from "../../widgets/Card/types";
import { useWhatIsSpeechCard } from "../../hooks/trainers/useWhatIsSpeechCard";
import type { AlphabetCardType } from "../../widgets/Card/types";
const cardData: AlphabetCardType[] = [
    {
        type: 'ChooseCorrectVariant',
        title: "Как располагаются буквы в алфавите ?",
        correctVariant: "по порядку",
        variants: ["по росту", "по порядку", "по красоте", "вперемешку"]
    },
    {
        type: "Conclusion",
    }
]
export const Alphabet = () => {
    const { currentTaskId, dataLength, renderTrainer, status } = useWhatIsSpeechCard({ data: cardData });
    return <Card status={status} currentTaskNumber={currentTaskId} trainersLength={dataLength}>
        {renderTrainer()}
    </Card>
}