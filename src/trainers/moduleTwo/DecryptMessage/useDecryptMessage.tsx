import { useState } from "react";
import type { CryptItemType } from "./CryptItem";
import type { Status } from "../../../types/types";
type CryptData = {
    id: number;
    value: CryptItemType;
    selected: boolean;
};
type Variant = {
    value: string;
    type: CryptItemType
}
export const useDecryptMessage = () => {
    const testData = ["start", "word", "word", "word", "end"];
    const [status, setStatus] = useState<Status>("idle")
    const [data, setData] = useState<CryptData[]>(() =>
        testData.map((item, index) => ({
            id: index,
            value: item as CryptItemType,
            selected: false,
        }))
    );
    const [variants, setVariants] = useState<{
        value: string;
        type: CryptItemType
    }[]>([
        {
            value: "слово",
            type: "word",
        },
        {
            value: "начало предложения",
            type: "start",
        },
        {
            value: "конец предложения",
            type: "end"
        }
    ])
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const currentItem = data[currentItemIndex];

    const handleAnswer = (variant: Variant) => {
        console.log('Selected answer:', variant);
        if (variant.type === currentItem.value) {
            setStatus("idle");
            if (data[currentItemIndex].id !== data[data.length - 1].id) {
                setCurrentItemIndex(prev => prev + 1);
            } else {
                setStatus("finish");

            }
            return
        } else {
            setStatus("error");
            return;
        }
    };
    return {
        data,
        variants,
        currentItem,
        handleAnswer,
        status
    }
}