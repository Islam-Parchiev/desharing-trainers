import { useState } from 'react';
import { DragItem } from './DragItem';
import './styles.scss';
import { TableSlot } from './TableSlot';
import type { Id } from '../../types/types';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';

export const TableTrainer = () => {
    const calcTableHeight = (80 * 1) + 50;
    const [tableQuestions, setTableQuestions] = useState<{
        id: Id;
        question: string;
        slots: {
            id: Id;
            correctValue: string;
            currentValue: string | null
        }[];
        completed: boolean;
    }[]>([
        {
            id: 1,
            question: 'Есть строгие правила ?',
            completed: false,
            slots: [{
                id: 1,
                correctValue: "да",
                currentValue: null
            },
            {
                id: 2,
                correctValue: "нет",
                currentValue: null
            }]
        }
    ]);

    const [tableColumns] = useState<{ colHeader: string }[]>([
        { colHeader: "Книжная речь" },
        { colHeader: "Разговорная речь" }
    ]);

    const [tableVariants, setTableVariants] = useState<{
        id: Id;
        value: string;
    }[]>([
        {
            id: 1,
            value: "да"
        },
        {
            id: 2,
            value: "нет"
        }
    ]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        console.log('Drag ended:', { active: active.id, over: over?.id });
        if (!over) {
            return;
        }

        const dragItemId = active.id as Id;
        const slotId = over.id as Id;


        const draggedItem = tableVariants.find(item => item.id === dragItemId);

        if (!draggedItem) {
            return;
        }
        const updatedTableQuestions = tableQuestions.map(question => {
            const updatedSlots = question.slots.map(slot => {
                if (slot.id === slotId) {
                    return {
                        ...slot,
                        currentValue: draggedItem.value
                    };
                }
                return slot;
            });


            const allFilled = updatedSlots.every(slot => slot.currentValue !== null);
            const allCorrect = updatedSlots.every(slot =>
                slot.currentValue === slot.correctValue
            );

            return {
                ...question,
                slots: updatedSlots,
                completed: allFilled && allCorrect
            };
        });

        const updatedVariants = tableVariants.filter(item => item.id !== dragItemId);

        setTableQuestions(updatedTableQuestions);
        setTableVariants(updatedVariants);
    };

    // const resetSlot = (slotId: Id) => {
    //     const updatedTableQuestions = tableQuestions.map(question => {
    //         const updatedSlots = question.slots.map(slot => {
    //             if (slot.id === slotId && slot.currentValue) {
    //                 // Return the drag item to available variants
    //                 const returnedValue = slot.currentValue;
    //                 setTableVariants(prev => [
    //                     ...prev,
    //                     { id: Date.now(), value: returnedValue }
    //                 ]);

    //                 return {
    //                     ...slot,
    //                     currentValue: null
    //                 };
    //             }
    //             return slot;
    //         });


    //         const allFilled = updatedSlots.every(slot => slot.currentValue !== null);
    //         const allCorrect = updatedSlots.every(slot =>
    //             slot.currentValue === slot.correctValue
    //         );

    //         return {
    //             ...question,
    //             slots: updatedSlots,
    //             completed: allFilled && allCorrect
    //         };
    //     });

    //     setTableQuestions(updatedTableQuestions);
    // };

    return (
        <div className="TableTrainer">
            <DndContext onDragEnd={handleDragEnd}>
                <table className='TableTrainer__table' style={{ height: calcTableHeight + "px" }}>
                    <thead className='TableTrainer__table-head'>
                        <tr>
                            <th className='TableTrainer__table--questionCol'></th>
                            {tableColumns.map((h, index) => (
                                <th key={`${h.colHeader}-${index}`}>{h.colHeader}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableQuestions.map(q => (
                            <tr key={`question-${q.id}`} className='TableTrainerItem'>
                                <td className='TableTrainer__table--questionCol'>{q.question}</td>
                                {q.slots.map(s => (
                                    <td key={`table-slot-${s.id}`}>
                                        <TableSlot
                                            value={s.currentValue}
                                            id={s.id}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="TableTrainer__dragItems">
                    {tableVariants.map((variant) => (
                        <DragItem
                            key={`drag-item-${variant.id}`}
                            id={variant.id}
                            value={variant.value}
                            isDisabled={false}
                        />
                    ))}
                </div>

                {/* Completion status */}
                {tableQuestions.some(q => q.completed) && (
                    <div className="TableTrainer__completion-message">
                        Задание завершено!
                    </div>
                )}
            </DndContext>
        </div>
    );
};