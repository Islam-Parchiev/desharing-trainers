import { useState, useCallback } from "react";
import type { AlphabetCardType } from "../../widgets/Card/types";
import type { Status } from "../../types/types";
import { ChooseCorrectVariant } from "../../trainers/moduleThree/ChooseCorrectVariant";
import { Conclusion } from "../../trainers/moduleTwo/Сonclusion";
import { useStatistics } from "../useStatistics";

// Define the extended type for items with completed property
type AlphabetCardWithCompleted = AlphabetCardType & { completed: boolean };

// Define the return type for the hook
interface UseAlphabetCardReturn {
    renderTrainer: () => React.ReactNode;
    currentTaskId: number;
    status: Status;
    setStatus: React.Dispatch<React.SetStateAction<Status>>;
    dataLength: number;
    errors: number;
    setErrors: React.Dispatch<React.SetStateAction<number>>;
    currentTask: AlphabetCardWithCompleted | undefined;
    startTimer: () => void;
    getStatistics: () => {
        mistakes: number;
        time: number;
        accuracy: string;
        totalAttempts: number;
        correctAttempts: number;
    }
    handleNextTask: () => void;
}

export function useAlphabetCard({ data: fetchedData }: { data: AlphabetCardType[] }): UseAlphabetCardReturn {
    const [status, setStatus] = useState<Status>("idle");
    const [errors, setErrors] = useState<number>(0);
    const { handleMistake, handleCorrect, startTimer, pauseTimer, getStatistics } = useStatistics();
    const [currentTaskId, setCurrentTaskId] = useState<number>(0);

    const [data, setData] = useState<AlphabetCardWithCompleted[]>(
        fetchedData.map(item => ({
            ...item,
            completed: false
        }))
    );

    const currentTask = data[currentTaskId];

    const isLastTask = useCallback((): boolean => {
        return currentTaskId === data.length - 1;
    }, [currentTaskId, data.length]);

    const onError = useCallback((): void => {
        setErrors(prev => prev + 1);
        handleMistake();
        setStatus('error');
    }, [handleMistake]);

    const onSuccess = useCallback((): void => {
        handleCorrect();
        setData(prev => prev.map(item => {
            if (item.type === currentTask?.type) {
                return {
                    ...item,
                    completed: true
                };
            } else {
                return item;
            }
        }));
        setStatus("success");
    }, [handleCorrect, currentTask?.type]);

    const handleNextTask = useCallback((): void => {
        if (isLastTask()) {
            setStatus("finish");
            pauseTimer()
        } else {
            setCurrentTaskId(prev => prev + 1);
            setStatus("idle");
        }
    }, [isLastTask, pauseTimer]);

    const completedItems = data.filter(item => item.completed === true);

    const renderTrainer = (): React.ReactNode => {
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
            case "Conclusion": // Note: Typo in your original code - "Conlusion" vs "Conclusion"
                return (
                    <Conclusion
                        key={currentTaskId}
                        data={[currentTask]}
                        handleSuccess={onSuccess}
                        handleError={onError}
                    />
                );
            default:
                return "error";
        }
    };

    return {
        renderTrainer,
        currentTaskId: completedItems.length,
        status,
        setStatus,
        dataLength: data.length,
        errors,
        setErrors,
        currentTask,
        startTimer,
        getStatistics,
        handleNextTask
    };
}