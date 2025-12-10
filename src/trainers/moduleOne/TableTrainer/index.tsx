import { useState } from 'react';
import { DragItem } from './DragItem';
import cn from 'classnames';
import './styles.scss';
import { TableSlot } from './TableSlot';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Button } from '../../../shared/ui/Button';
import type { Id } from '../../../types/types';
const tableQuestions: { id: Id; question: string; variants: { id: Id; content: string }[]; slots: { id: Id; correctValue: string; currentValue: string | null; }[]; }[] = [
    {
        id: 1,
        question: "test",
        variants: [{ id: 1, content: "1" }, { id: 2, content: "2" }],
        slots: [{ id: 1, correctValue: "1", currentValue: null }, { id: 2, correctValue: "2", currentValue: null }]
    },
    {
        id: 2,
        question: "test2",
        variants: [{ id: 3, content: "3" }, { id: 4, content: "4" }],
        slots: [{ id: 3, correctValue: "2", currentValue: null }, { id: 4, correctValue: "1", currentValue: null }]
    },
    {
        id: 3,
        question: "test3",
        variants: [{ id: 5, content: "5" }, { id: 6, content: "6" }],
        slots: [{ id: 5, correctValue: "1", currentValue: null }, { id: 6, correctValue: "2", currentValue: null }]
    },
    {
        id: 4,
        question: "test4",
        variants: [{ id: 7, content: "7" }, { id: 8, content: "8" }],
        slots: [{ id: 7, correctValue: "2", currentValue: null }, { id: 8, correctValue: "1", currentValue: null }]
    }
]
const tableCols = [
    {
        colHeader: "test1"
    },
    {
        colHeader: "test2"
    }
]

export const TableTrainer = () => {
    const [data, setData] = useState([...tableQuestions.map(item => {
        return {
            ...item,
            completed: false,
            currentValue: null,
        }
    })]);
    const [currentQuestionN, setCurrentQuestionN] = useState(0);
    const currentQuestion = data[currentQuestionN];

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        console.log('Drag ended:', { active: active.id, over: over?.id });
        if (!over) {
            return;
        }
        const draggedVariantId = active.id;
        const targetSlotId = over.id;


        const draggedItem = currentQuestion.variants.find(v => v.id === draggedVariantId);

        if (!draggedItem) {
            return;
        }


        setData(prevData => {
            const newData = [...prevData];
            const questionIndex = newData.findIndex(q => q.id === currentQuestion.id);
            if (questionIndex === -1) return prevData;
            const slotIndex = newData[questionIndex].slots.findIndex(s => s.id === targetSlotId);
            if (slotIndex !== -1) {
                if (newData[questionIndex].slots[slotIndex].currentValue === null) {
                    newData[questionIndex].slots[slotIndex].currentValue = draggedItem.content;
                }
            }

            return newData;
        });
    };
    const isVisible = (question: { completed: boolean }, qIndex: number) => {
        if ((currentQuestionN === qIndex) || (question.completed === true)) {
            return true
        } else {
            return false
        }
    }
    const handleNext = () => {
        if (currentQuestionN === data.length - 1) {
            return;
        }
        const tmpData = data;
        currentQuestion.completed = true;
        const index = tmpData.findIndex(item => item.id === currentQuestion.id);
        tmpData[index] = currentQuestion
        setCurrentQuestionN(prev => prev + 1);
    }
    return (
        <div className="TableTrainer">
            <DndContext onDragEnd={handleDragEnd}>
                <table className='TableTrainer__table'>
                    <thead className='TableTrainer__table-head'>
                        <tr>
                            <th className='TableTrainer__table--questionCol'></th>
                            {tableCols.map((h, index) => (
                                <th key={`${h.colHeader}-${index}`}>{h.colHeader}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((question, index) => <tr key={`question-${index}`} className={cn('TableTrainerItem', isVisible(question, index) && "visible")}>
                            <td className='TableTrainer__table--questionCol'>{question.question}</td>
                            {question.slots.map(slot => <td key={`table-slot-${slot.id}`}>
                                <TableSlot
                                    value={slot.currentValue}
                                    id={slot.id}
                                />
                            </td>)}
                        </tr>)}
                    </tbody>
                </table>

                <div className="TableTrainer__dragItems">
                    {currentQuestion.variants.map((variant) => (
                        <DragItem
                            key={`drag-item-${variant.id}`}
                            id={variant.id}
                            value={variant.content}
                            isDisabled={false}
                        />
                    ))}

                </div>

            </DndContext>
            <Button variant="primary" onClick={handleNext}>next</Button>
        </div>
    );
};