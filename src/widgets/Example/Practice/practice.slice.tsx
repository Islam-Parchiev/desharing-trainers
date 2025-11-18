import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockLearningPractice } from "../../../mocks/data";
import type { TrainerTypes } from "../../../types/types";
type practiceStatus = "loading" | "pending" | "idle" | "finish";
interface ITheory {
    data: TrainerTypes[];
    currentData: number;
    status: practiceStatus
}
const initialState: ITheory = {
    data: mockLearningPractice,
    currentData: 0,
    status: "pending",
}
const practiceSlice = createSlice({
    name: 'practiceSlice',
    initialState,
    reducers: {
        changeStatus: (state, action: PayloadAction<practiceStatus>) => {
            state.status = action.payload;
        },
        next: (state) => {
            state.currentData += 1;
        },
        prev: (state) => {
            state.currentData -= 1;
        }
    }
})


export const { changeStatus } = practiceSlice.actions;
export default practiceSlice.reducer;