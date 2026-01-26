import { useState } from "react"
import { WordClick } from "."
import { Card } from "../../../components/Card"
import type { Status, WordClicker } from "../../../types/types"

export const WordClickerWithWrapper = ({ data }: { data: WordClicker }) => {
    const [status, setStatus] = useState<Status>("idle");
    const onError = () => {
        setStatus("error");
        return;
    }
    const onSuccess = () => {
        setStatus("success");
        return;
    }
    return <Card status={status} onBack={() => console.log('test')}>
        {status === "success" && "Success"}
        {status === "error" && "Error"}
        <WordClick handleError={onError} handleSuccess={onSuccess} correctValues={data.correctValues} text={data.text} title={data.title} />
    </Card>
}