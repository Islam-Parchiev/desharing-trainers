import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { TheoryDataItem } from "../../../theory/Child";
import { mockTheoryData } from "../../../mocks/data";
type theoryStatus = "loading"|"pending"|"idle"|"finish";
interface ITheory {
    data:TheoryDataItem[];
    currentData:number;
    status:theoryStatus
}
const initialState:ITheory={
    data:mockTheoryData,
    currentData:0,
    status:"pending",
}
const theorySlice = createSlice({
    name:'theorySlice',
    initialState,
    reducers:{
        next:(state)=> {
                        if(state.currentData===state.data.length-1) return;
            state.currentData+=1;
        },
        prev:(state)=> {
                if(state.currentData===0) return;
            state.currentData-=1;
        },
        changeCurrentData:(state,action:PayloadAction<number>)=> {
            state.currentData=action.payload;
        },
        changeStatus:(state,action:PayloadAction<theoryStatus>) =>{
            state.status=action.payload;
        }
    }
})


export const {next,prev,changeStatus,changeCurrentData} = theorySlice.actions;
export default theorySlice.reducer;