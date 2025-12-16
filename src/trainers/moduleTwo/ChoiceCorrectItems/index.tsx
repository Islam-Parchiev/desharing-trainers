import { useState } from 'react';
import './styles.scss';
import { TrainerTitle } from '../../../components/TrainerTitle';
import type { Id } from '../../../types/types';
import cn from 'classnames';

interface Item {
    id: Id;
    value: string;
    correct: boolean;
    position: number;
    submitted?: boolean;
}

const mockData = {
    data: [
        { id: 1, value: "test1", correct: false, position: 1 },
        { id: 2, value: "ехать", correct: true, position: 2 },
        { id: 3, value: "г1рп", correct: false, position: 3 },
        { id: 4, value: "поле", correct: true, position: 4 }, // Изменено position с 7 на 4
        { id: 5, value: "тр-пм", correct: false, position: 5 },
        { id: 6, value: "сказка", correct: true, position: 6 }, // Изменено position с 7 на 6
        { id: 7, value: "test7", correct: false, position: 7 }
    ]
};

export const ChoiceCorrectItems = () => {
    // Используем state для отслеживания submitted состояния
    const [items, setItems] = useState<Item[]>(
        mockData.data.map(item => ({ ...item, submitted: false }))
    );

    const totalSlots = 9;
    const slots = Array.from({ length: totalSlots }, (_, i) => i + 1);
    const firstRowSlots = slots.slice(0, 4);
    const secondRowSlots = slots.slice(4);

    const getItemByPosition = (position: number) => {
        return items.find(item => item.position === position);
    };

    const handleItemClick = (item: Item) => {
        // Не обновляем напрямую, используем setItems
        setItems(prevItems =>
            prevItems.map(prevItem =>
                prevItem.id === item.id
                    ? { ...prevItem, submitted: true }
                    : prevItem
            )
        );
    };

    const addClass = (item: Item) => {
        if (item.submitted) {
            return item.correct ? "hidden" : "error";
        }
        return "";
    };

    return (
        <div className="ChoiceCorrectItems">
            <div className="ChoiceCorrectItems__inner">
                <TrainerTitle>Выбери ТРИ яблока со словами на русском языке</TrainerTitle>
                <div className="ChoiceCorrectItems__content">
                    <div className="ChoiceCorrectItems__apples">
                        {/* Первая строка */}
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

                        {/* Вторая строка */}
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