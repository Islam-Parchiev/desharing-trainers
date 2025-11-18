import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, type TypedUseSelectorHook, useSelector } from "react-redux";
import learningReducer from "../widgets/Example/learningStatus.slice";
import theoryReducer from "../widgets/Example/Theory/theory.slice";
import practiceReducer from "../widgets/Example/Practice/practice.slice";
export const store = configureStore({
    reducer: {
        learningReducer,
        theoryReducer,
        practiceReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector