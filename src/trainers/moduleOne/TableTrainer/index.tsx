import { useEffect, useState } from 'react';
import { DragItem } from './DragItem';
import cn from 'classnames';
import './styles.scss';
import { TableSlot } from './TableSlot';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { Button } from '../../../shared/ui/Button';
import type { Id, Status } from '../../../types/types';
type TableQuestion = { id: Id; question: string; variants: { id: Id; content: string }[]; slots: { id: Id; correctValue: string; currentValue: string | null; }[]; };
export interface TableTrainerData {
    questions: TableQuestion[];
    tableCols: { colHeader: string; }[]
}
export const TableTrainer = (fetchedData: TableTrainerData) => {
    const [data, setData] = useState([...fetchedData.questions.map(item => {
        return {
            ...item,
            completed: false,
            currentValue: null,
        }
    })]);
    const [columns] = useState(fetchedData.tableCols);
    const [currentQuestionN, setCurrentQuestionN] = useState(0);
    const currentQuestion = data[currentQuestionN];
    const [status, setStatus] = useState<Status>("idle");
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
                // test
                // if (newData[questionIndex].slots[slotIndex].currentValue === null) {
                newData[questionIndex].slots[slotIndex].currentValue = draggedItem.content;
                // }
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
    const checkQuestion = () => {
        if (currentQuestion.slots.every(slot => slot.currentValue !== null)) {

            if (currentQuestion.slots.every(slot => slot.correctValue === slot.currentValue)) {
                setStatus("success");
                handleNext();
                return true;
            } else {
                setStatus("error");
                return false
            }
        }
    }
    useEffect(() => {
        checkQuestion();
    }, [data])
    const checkAllIsCorrect = () => {
        if (data.every(item => item.slots.every(slot => slot.currentValue === slot.correctValue))) {
            setStatus("finish");
            return;
        } else {
            setStatus("error");
            return;
        }
    }
    const handleNext = () => {
        if (currentQuestionN === data.length - 1) {
            return;
        }
        setStatus("idle");
        const tmpData = data;
        currentQuestion.completed = true;
        const index = tmpData.findIndex(item => item.id === currentQuestion.id);
        tmpData[index] = currentQuestion
        setCurrentQuestionN(prev => prev + 1);
    }
    return (
        <div className="TableTrainer">
            {status === "finish" && "Finish"}
            {status === "success" && "Success"}
            {status === "error" && "Error"}
            <DndContext onDragEnd={handleDragEnd}>
                <table className='TableTrainer__table'>
                    <thead className='TableTrainer__table-head'>
                        <tr>
                            <th className='TableTrainer__table--questionCol'></th>
                            {columns.map((h, index) => (
                                <th key={`${h.colHeader}-${index}`}>{h.colHeader}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((question, index) => <tr key={`question-${index}`} className={cn('TableTrainerItem', isVisible(question, index) && "visible")}>
                            <td className='TableTrainer__table--questionCol'><span>
                                {question.question}
                            </span>
                            </td>
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
            <Button variant="primary" onClick={checkAllIsCorrect}>Finish</Button>
        </div>
    );
};