import { useState } from "react";

import './styles.scss';
import { TrainerTitle } from "../../../components/TrainerTitle";
import type { Status } from "../../../types/types";

interface Variant {
    content: string;
    imageUrl: string;
    correct: boolean;
}
const mockDAta = {
    title: "Кто говорит грамотно и без ошибок ?",
    variants: [
        {
            content: "Смотри, какой красивый у них щенок!",
            imageUrl: "/gr1.png",
            correct: true,
        },
        {
            content: "И чё ? Мой щенок красивше ихнего!",
            imageUrl: "/gr2.png",
            correct: false,
        }
    ]
}
export const PhoneticTrainer = () => {
    const [status, setStatus] = useState<Status>("idle")
    // const []
    const handleClick = (variant: Variant) => {
        if (variant.correct === true) {
            setStatus("success");
            return;
        }
        setStatus("error");
        return;
    }
    return (
        <div className="PhoneticTrainer">
            <div className="PhoneticTrainer__inner">
                <TrainerTitle>Кто говорит грамотно и без ошибок ?</TrainerTitle>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
                <div className="PhoneticTrainer__content">
                    {mockDAta.variants.map((variant) => <div onClick={() => handleClick(variant)} className={`PhoneticTrainer__variant ${mockDAta.variants[0].imageUrl === variant.imageUrl ? "PhoneticTrainer__variant--left" : "PhoneticTrainer__variant--right"}`}>
                        <div className="PhoneticTrainer__variant_content">
                            {variant.content}
                        </div>
                        <div className="PhoneticTrainer__variant_image">

                            <img src={variant.imageUrl} alt="var1" />
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}