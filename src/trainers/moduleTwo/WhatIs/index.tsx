import { useState } from 'react';
import { Button } from '../../../shared/ui/Button';
import './styles.scss';
import type { Status } from '../../../types/types';
const mockData = {
    content: "Синие волны бьются о берег.",
    question: "Что это ?",
    variants: [
        {
            value: "Слово",
            correct: false,
        },
        {
            value: "Предложение",
            correct: true,
        },
        {
            value: "Текст",
            correct: false,
        }
    ]

}
export const WhatIs = () => {
    const [status, setStatus] = useState<Status>("idle");
    const handleCheck = (variant: { correct: boolean }) => {
        if (variant.correct) {
            setStatus("success");
            return;
        } else {
            setStatus("error");
            return
        }
    }
    const handleRetry = () => {
        setStatus("idle");
    }
    return (
        <div className="WhatIs">
            {status === "success" && "Success"}
            {status === "error" && "Error"}
            <div className="WhatIs__content">
                <span>{mockData.content}</span>
            </div>
            <div className="WhatIs__question">
                <span>{mockData.question}</span>
            </div>
            <div className="WhatIs__variants">
                <ul className="list-reset WhatIs__variants_list">
                    {mockData.variants.map(variant => <Button asChild size="small" variant="primary" onClick={() => handleCheck(variant)} disabled={status === "success" || status === "error"}>
                        <li>
                            {variant.value}
                        </li>
                    </Button>)}
                </ul>
            </div>
            {status === "error" && <Button size="small" onClick={handleRetry}>Retry</Button>}
        </div>
    )
}