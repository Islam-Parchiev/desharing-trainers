import { useState } from "react";
import { Button } from "../../../shared/ui/Button"
import { Icon } from "../../../shared/ui/MoveBox"
import './styles.scss';
import type { Status } from "../../../types/types";
const mockData = {
    content: "река желтеть пёстрый",
    question: "Это предложение ?",
    variants: [
        {
            value: "Да",
            correct: false,
        },
        {
            value: "Нет",
            correct: true,
        }
    ]
}
export const IsCorrect = () => {
    const [status, setStatus] = useState<Status>("idle");
    const handleCheck = (variant: { correct: boolean }) => {
        if (variant.correct) {
            setStatus("success");
            return;
        } else {
            setStatus("error");
            return;
        }
    }
    return (
        <div className="IsCorrect__wrapper">
            {status === "success" && "Success"}
            {status === "error" && "Error"}
            <div className="IsCorrect__main">

                <div className="IsCorrect">
                    <div className="IsCorrect__divider" />
                    <div className="IsCorrect__inner">
                        <span>{mockData.content}</span>
                    </div>
                    <div className="IsCorrect__divider" />
                </div>
            </div>
            <div className="IsCorrect__bottom">
                <div>
                    <button className="btn-reset">
                        <Icon />
                    </button>
                    <span>{mockData.question}</span>
                </div>
                <div className="IsCorrect__variants">
                    {mockData.variants.map(variant => <Button size="small" onClick={() => handleCheck(variant)}>{variant.value}</Button>)}
                </div>
            </div>
        </div>
    )
}