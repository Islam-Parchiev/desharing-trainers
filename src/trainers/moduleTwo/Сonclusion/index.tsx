import { useState } from "react";
import { TrainerTitle } from "../../../components/TrainerTitle"
import { Button } from "../../../shared/ui/Button";
import { SlotInput } from "./SlotInput"
import './styles.scss';
import type { Status } from "../../../types/types";
export const Conclusion = () => {
    const [slot, setSlot] = useState<{ current: string | null; correct: string }>({ current: null, correct: 'по смыслу' })
    const [variants] = useState<{ value: string; }[]>([
        {
            value: "изменять"
        },
        {
            value: "заглавная"
        },
        {
            value: "по смыслу"
        },
        {
            value: "точка"
        }
    ])
    const [status, setStatus] = useState<Status>("idle");
    const handleCheck = () => {
        if (slot.correct === slot.current) {
            setStatus("success");
            return;
        } else {
            setStatus("error");
        }
    }
    const handleVariantClick = ({ value }: { value: string }) => {
        setSlot({ ...slot, current: value })
    }
    return (
        <div className="Conclusion__wrapper">
            <TrainerTitle>Сделай вывод</TrainerTitle>
            <div className="Conclusion">
                <div className="Conclusion__main">
                    <span>Слова в предложении связаны между собой <SlotInput value={slot.current} />.</span>
                </div>
                <ul className="list-reset Conclusion__variants">
                    {
                        variants.map(variant => <Button asChild size="small" variant="primary" onClick={() => handleVariantClick(variant)}>
                            <li>

                                {variant.value}
                            </li>
                        </Button>)
                    }
                </ul>
                <Button onClick={handleCheck} size="small">check</Button>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
            </div>
        </div>
    )
}