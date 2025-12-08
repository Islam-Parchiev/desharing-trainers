import { useState } from "react"
import { TrainerTitle } from "../../../components/TrainerTitle"
import { CryptItem, type CryptItemType } from "../DecryptMessage/CryptItem"
import './styles.scss';
import { Button } from "../../../shared/ui/Button";
import type { Status } from "../../../types/types";
export const CryptMessage = () => {
    const correctMessage = ["start", "word", "word", "word", "word", "end"];
    const [currentMsg, setCurrentMsg] = useState<CryptItemType[]>([])
    const [variants] = useState<{ type: CryptItemType; value: string; }[]>([{ type: "start", value: "|_" }, { type: "word", value: "_" }, { type: "end", value: "." }])
    const [status, setStatus] = useState<Status>("idle")
    const handleVariantClick = (variant: { type: CryptItemType; value: string; }) => {
        if (currentMsg.length !== correctMessage.length) {

            setCurrentMsg(prev => [...prev, variant.type])
        }
        return;
    }
    const handleReset = () => {
        setCurrentMsg([]);
        return;
    }
    const handleCheck = () => {
        if (correctMessage.join("") === currentMsg.join("")) {
            setStatus("success");
            return;
        } else {
            setStatus("error");
            return;
        }
    }
    return (
        <div className="CryptMessage">
            <div className="CryptMessage__inner">
                <TrainerTitle>Зашифруй ответ и отправь</TrainerTitle>
                {status === "error" && "Error"}
                {status === "success" && "Success"}
                <div className="CryptMessage__main">
                    <div className="CryptMessage__message">
                        <span>Встретимся в бухте через два дня.</span>
                    </div>
                    <div className="DecryptMessage__cryptWindow">
                        <div className="DecryptMessage__cryptWindow_inner">
                            <ul className="list-reset DecryptMessage__crypt_items">
                                {currentMsg.map(item => (
                                    <CryptItem

                                        type={item}
                                        selected={false}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="CryptMessage__variants">
                        <ul className="list-reset">
                            {
                                variants.map(variant => <Button asChild variant="primary" size="medium" onClick={() => handleVariantClick(variant)}>
                                    <li>

                                        {variant.value}
                                    </li>
                                </Button>
                                )}
                        </ul>
                    </div>
                    <Button onClick={handleCheck} variant="primary" disabled={currentMsg.length !== correctMessage.length}>Check</Button>
                    {status === "error" && <Button onClick={handleReset}>Reset</Button>}
                </div>
            </div>
        </div >
    )
}