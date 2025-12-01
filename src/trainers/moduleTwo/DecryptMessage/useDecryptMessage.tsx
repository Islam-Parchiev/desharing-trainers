import { useCallback, useEffect, useState } from "react";
import type { CryptItemType } from "./CryptItem";
import type { Status } from "../../../types/types";
type CryptData = {
    id: number;
    value: CryptItemType;
    selected: boolean;
    completed: boolean;
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
            completed: false
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

            // Обновляем массив данных правильно
            setData(prevData =>
                prevData.map(item =>
                    item.id === currentItem.id
                        ? { ...item, completed: true }
                        : item
                )
            );

            if (currentItemIndex < data.length - 1) {
                setCurrentItemIndex(prev => prev + 1);
            } else {
                setStatus("finish");
            }
        } else {
            setStatus("error");
        }
    };
    const checkAllCompleted = useCallback(() => {
        if (data.every(item => item.completed === true)) {
            setStatus("finish");
            return;
        }
    }, [data])
    useEffect(() => {
        checkAllCompleted();
        console.log(data);
    }, [data, checkAllCompleted])
    return {
        data,
        variants,
        currentItem,
        handleAnswer,
        status
    }
}