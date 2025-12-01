import './styles.scss';
import { useState } from "react"
import type { Id, Status } from "../../../types/types"
import { CryptItem, type CryptItemType } from "../DecryptMessage/CryptItem";
import { Slot } from "./Slot";
import { Button } from "../../../shared/ui/Button";
import { TrainerTitle } from '../../../components/TrainerTitle';

export const DecryptMsgDND = () => {
    const [status, setStatus] = useState<Status>("idle");

    const [data, setData] = useState<{
        title: string;
        correctAnswer: string;
        cryptedMsg: { id: Id; value: CryptItemType; }[];
        variants: { id: Id; value: string; }[]
    }>({
        title: "Подбери предложение к схеме",
        correctAnswer: "Желаем попутного ветра.",
        cryptedMsg: [
            {
                id: 1,
                value: "start"
            },
            {
                id: 2,
                value: "word"
            },
            {
                id: 3,
                value: "word"
            },
            {
                id: 5,
                value: "end"
            }
        ],
        variants: [{
            id: 1,
            value: "Желаем попутного ветра."
        },
        {
            id: 2,
            value: "Плывите строго на запад."
        },
        {
            id: 3,
            value: "С востока надвигается шторм."
        },
        {
            id: 4,
            value: "Желаем попутного ветра."
        }]
    })
    const [currentVariant, setCurrentVariant] = useState<{ id: Id; value: string; } | null>(null)
    const onVariantClick = (variant: { id: Id; value: string; }) => {
        setCurrentVariant(variant);
    }
    const handleCheck = () => {
        if (currentVariant?.value === data.correctAnswer) {
            setStatus("success");
            return;
        } else {
            setStatus("error");
            return;
        }
    }
    return (
        <div className="DecryptMsgDND">
            <div className="DecryptMsgDND__inner">
                <TrainerTitle>{data.title}</TrainerTitle>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
                <div className="DecryptMessage__cryptWindow">
                    <div className="DecryptMessage__cryptWindow_inner">
                        <ul className="list-reset DecryptMessage__crypt_items">
                            {data.cryptedMsg.map(item => (
                                <CryptItem
                                    key={item.id}
                                    type={item.value}
                                    selected={false}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="DecryptMsgDND__slot_wrapper">
                    <Slot value={currentVariant?.value || null} />
                </div>
                <ul className="list-reset DecryptMsgDND__variants">
                    {
                        data.variants.map(variant => <Button onClick={() => onVariantClick(variant)} key={variant.id + variant.value} asChild variant="primary" size="small">
                            <li>
                                {variant.value}
                            </li>
                        </Button>)
                    }

                </ul>
                {currentVariant && <Button variant="primary" size="big" onClick={handleCheck}>Check</Button>}
            </div>
        </div>
    )
}