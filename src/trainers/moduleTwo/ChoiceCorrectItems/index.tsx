import { useEffect, useState } from 'react';
import './styles.scss';
import { TrainerTitle } from '../../../components/TrainerTitle';
import type { Id, Status } from '../../../types/types';
import cn from 'classnames';

interface Item {
    id: Id;
    value: string;
    position: number;
    submitted?: boolean;
}

const mockData = {
    data: [
        { id: 1, value: "test1", position: 1 },
        { id: 2, value: "ехать", position: 2 },
        { id: 3, value: "г1рп", position: 3 },
        { id: 4, value: "поле", position: 4 },
        { id: 5, value: "тр-пм", position: 5 },
        { id: 6, value: "сказка", position: 6 },
        { id: 7, value: "test7", position: 7 }
    ],
    correctVariants: [
        { id: 11, value: "ехать" },
        { id: 14, value: "поле" },
        { id: 16, value: "сказка" }
    ]
};

export const ChoiceCorrectItems = () => {
    const [items, setItems] = useState<Item[]>(
        mockData.data.map(item => ({ ...item, submitted: false }))
    );
    const [correct, setCorrect] = useState<{ value: string; }[]>(mockData.correctVariants);
    const [submittedItems, setSubmittedItems] = useState<Item[]>([]);
    const [status, setStatus] = useState<Status>("idle");
    const totalSlots = 9;
    const slots = Array.from({ length: totalSlots }, (_, i) => i + 1);
    const firstRowSlots = slots.slice(0, 4);
    const secondRowSlots = slots.slice(4);

    const getItemByPosition = (position: number) => {
        return items.find(item => item.position === position);
    };
    const handleCheck = () => {
        const submitted = items.filter(item => item.submitted);

        if (submitted.length !== 3) return;

        const isCorrect = submitted.every(item =>
            correct.some(correctItem => correctItem.value === item.value)
        );

        setStatus(isCorrect ? "success" : "error");
    }
    const handleItemClick = (item: Item) => {
        setItems(prevItems =>
            prevItems.map(prevItem =>
                prevItem.id === item.id
                    ? { ...prevItem, submitted: true }
                    : prevItem
            )
        );
    };
    useEffect(() => {
        handleCheck();
    }, [items])
    const addClass = (item: Item) => {
        if (item.submitted) {
            if (correct.find(el => el.value === item.value)) {
                return "hidden";
            } else {
                return "error";
            }
        }
        return "";
    };

    return (
        <div className="ChoiceCorrectItems">
            <div className="ChoiceCorrectItems__inner">
                <TrainerTitle>Выбери ТРИ яблока со словами на русском языке</TrainerTitle>
                {status === "error" && "Error"}
                {status === "success" && "Success"}
                <div className="ChoiceCorrectItems__content">
                    <div className="ChoiceCorrectItems__apples">
                        <div className="ChoiceCorrectItems__row">
                            {firstRowSlots.map(slotPosition => {
                                const item = getItemByPosition(slotPosition);
                                return (
                                    <div
                                        key={slotPosition}
                                        className={"ChoiceCorrectItems__slot"}
                                        onClick={() => item && !item.submitted && handleItemClick(item)}
                                    >
                                        {item && (
                                            <div className={cn("ChoiceCorrectItem", item && addClass(item))}>
                                                <span>{item.value}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="ChoiceCorrectItems__row">
                            {secondRowSlots.map(slotPosition => {
                                const item = getItemByPosition(slotPosition);
                                return (
                                    <div
                                        key={slotPosition}
                                        className="ChoiceCorrectItems__slot"
                                        onClick={() => item && !item.submitted && handleItemClick(item)}
                                    >
                                        {item && (
                                            <div className={cn("ChoiceCorrectItem", item && addClass(item))}>
                                                <span>{item.value}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};