import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export type CurrentStepType = "intro" | "theory" | "practice";
interface IInitialState {
    currentStep: CurrentStepType;
}
const initialState: IInitialState = {
    currentStep: "intro"
}
const vocabularyTrainerSlice = createSlice({
    name: "vocabularyTrainer",
    initialState,
    reducers: {
        changeCurrentStep: (state, action: PayloadAction<CurrentStepType>) => {
            state.currentStep = action.payload;
        }
    }
});
export const { changeCurrentStep } = vocabularyTrainerSlice.actions;
export default vocabularyTrainerSlice.reducer;