// import { mockLearningPractice } from "../../../mocks/data"

import { useAppSelector } from "../../../redux"

export const Practice = () => {
    const { data, currentData, status } = useAppSelector(state => state.practiceReducer);
    const trainer = switch(data[currentData].) {

    }
    return <div className="Practice">

    </div>
}