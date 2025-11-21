import { DragItem } from './DragItem';
import './styles.scss';
import { TableSlot } from './TableSlot';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { moveVariantToSlot } from './tableTrainer.slice';
import { useAppDispatch, useAppSelector } from '../../../redux';
import type { Id } from '../../../types/types';



export const TableTrainer = () => {
    const dispatch = useAppDispatch();
    const { tableQuestions, tableColumns, tableVariants } = useAppSelector((state) => state.tableTrainerReducer);

    const calcTableHeight = (80 * 1) + 50;

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        console.log('Drag ended:', { active: active.id, over: over?.id });
        if (!over) {
            return;
        }

        const dragItemId = active.id as Id;
        const slotId = over.id as Id;

        dispatch(moveVariantToSlot({ dragItemId, slotId }));
    };

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

                {tableQuestions.some(q => q.completed) && (
                    <div className="TableTrainer__completion-message">
                        Задание завершено!
                    </div>
                )}
            </DndContext>
        </div>
    );
};