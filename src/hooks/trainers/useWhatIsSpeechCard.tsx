import { useState } from "react";
import type { Status } from "../../types/types";
import type { CardDataType } from "../../widgets/Card/types";
import { ChooseCorrectVariant } from "../../trainers/moduleThree/ChooseCorrectVariant";
import { ChoiceMultipleVariants } from "../../trainers/moduleOne/ChoiceMultipleVariants";

export function useWhatIsSpeechCard({ data: fetchedData }: { data: CardDataType[] }) {
    const [status, setStatus] = useState<Status>("idle");
    const [errors, setErrors] = useState(0);
    const [currentTaskId, setCurrentTaskId] = useState(0);

    const [data, setData] = useState([...fetchedData.map(item => ({
        ...item,
        completed: false
    }))]);
    const currentTask = data[currentTaskId];

    const isLastTask = () => currentTaskId === data.length - 1;

    const onError = () => {
        setErrors(prev => prev + 1);
    }

    const onSuccess = () => {
        setData(prev => [...prev.map(item => {
            if (item.title === currentTask.title) {
                return {
                    ...item,
                    completed: true
                }
            } else {
                return item
            }
        })])
        setStatus("success");
    }

    const handleNextTask = () => {
        if (isLastTask()) {
            setStatus("finish");
        } else {
            setCurrentTaskId(prev => prev + 1);
            setStatus("idle");
        }
    };
    const completedItems = data.filter(item => item.completed === true);
    const renderTrainer = () => {
        if (!currentTask) return null;

        switch (currentTask.type) {
            case "ChooseCorrectVariant":
                return (
                    <ChooseCorrectVariant
                        key={currentTaskId}
                        correctVariant={currentTask.correctVariant}
                        variants={currentTask.variants}
                        handleError={onError}
                        title={currentTask.title}
                        handleNext={handleNextTask}
                        handleSuccess={onSuccess}
                    />
                );
            case "ChooseMultipleVariants":
                return (
                    <ChoiceMultipleVariants
                        key={currentTaskId}
                        correctVariants={currentTask.correctVariants}
                        questionTitle={currentTask.title}
                        variants={currentTask.variants}
                        id={currentTask.title}
                        handleNext={handleNextTask}
                        handleSuccess={onSuccess}
                    />
                );
            default:
                return "error";
        }
    }

    return {
        renderTrainer,
        currentTaskId: completedItems.length,
        status,
        setStatus,
        dataLength: data.length,
        errors,
        setErrors,
        currentTask
    }
}