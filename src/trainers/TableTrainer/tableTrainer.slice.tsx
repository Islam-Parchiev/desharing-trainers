import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Id } from '../../types/types';

interface TableSlot {
    id: Id;
    correctValue: string;
    currentValue: string | null;
}

interface TableQuestion {
    id: Id;
    question: string;
    slots: TableSlot[];
    completed: boolean;
}

interface TableVariant {
    id: Id;
    value: string;
}

interface TableColumn {
    colHeader: string;
}

interface TableTrainerState {
    tableQuestions: TableQuestion[];
    tableColumns: TableColumn[];
    tableVariants: TableVariant[];
}

const initialState: TableTrainerState = {
    tableQuestions: [
        {
            id: 1,
            question: 'Есть строгие правила ?',
            completed: false,
            slots: [
                {
                    id: 1,
                    correctValue: "да",
                    currentValue: null
                },
                {
                    id: 2,
                    correctValue: "нет",
                    currentValue: null
                }
            ]
        }
    ],
    tableColumns: [
        { colHeader: "Книжная речь" },
        { colHeader: "Разговорная речь" }
    ],
    tableVariants: [
        {
            id: 1,
            value: "да"
        },
        {
            id: 2,
            value: "нет"
        }
    ]
};

const tableTrainerSlice = createSlice({
    name: 'tableTrainer',
    initialState,
    reducers: {
        moveVariantToSlot: (state, action: PayloadAction<{ dragItemId: Id; slotId: Id }>) => {
            const { dragItemId, slotId } = action.payload;

            const draggedItem = state.tableVariants.find(item => item.id === dragItemId);
            if (!draggedItem) return;

            // Update table questions
            state.tableQuestions = state.tableQuestions.map(question => {
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

            // Remove used variant
            state.tableVariants = state.tableVariants.filter(item => item.id !== dragItemId);
        },

        resetSlot: (state, action: PayloadAction<{ slotId: Id }>) => {
            const { slotId } = action.payload;

            state.tableQuestions = state.tableQuestions.map(question => {
                const updatedSlots = question.slots.map(slot => {
                    if (slot.id === slotId && slot.currentValue) {
                        // Return variant back to available variants
                        state.tableVariants.push({
                            id: Date.now(),
                            value: slot.currentValue
                        });

                        return {
                            ...slot,
                            currentValue: null
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
        },

        // Добавьте другие действия по мере необходимости
        setTableQuestions: (state, action: PayloadAction<TableQuestion[]>) => {
            state.tableQuestions = action.payload;
        },

        setTableVariants: (state, action: PayloadAction<TableVariant[]>) => {
            state.tableVariants = action.payload;
        }
    }
});

export const { moveVariantToSlot, resetSlot, setTableQuestions, setTableVariants } = tableTrainerSlice.actions;
export default tableTrainerSlice.reducer;