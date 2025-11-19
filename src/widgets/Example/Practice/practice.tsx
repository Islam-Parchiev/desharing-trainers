// import { mockLearningPractice } from "../../../mocks/data"

import { useState } from "react";
import { useAppSelector } from "../../../redux"
import { ChoiceRightVariant } from "../../../trainers/ChoiceRightVariant";
import type { Status } from "../../../types/types";

export const Practice = () => {
    const { data, currentData, status } = useAppSelector(state => state.practiceReducer);
    const [trainerStatus, setTrainerStatus] = useState<Status>("idle");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleError = () => {
        setTrainerStatus("error");
    }
    const handleSuccess = () => {
        setTrainerStatus("success");
    }
    const renderTrainer = () => {
        if (!data[currentData]) return <>Error!</>
        switch (data[currentData].type) {
            case "ChoiceRightVariant":
                // data[currentData].data.
                return <ChoiceRightVariant
                    correctVariantId={data[currentData].data.correctVariantId}
                    questionTitle={data[currentData].data.title}
                    variants={data[currentData].data.variants}
                    id={data[currentData].data.id}
                    status={trainerStatus}
                    handleError={handleError}
                    handleSuccess={handleSuccess}
// isSubmitted={}
                />
        }
    }
    return <div className="Practice">

    </div>
}