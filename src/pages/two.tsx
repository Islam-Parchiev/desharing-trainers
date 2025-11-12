import { useState } from "react";
import { ChoiceRightVariant } from "../trainers/ChoiceRightVariant"
import { VariantTasks } from "../mocks/data";
import { type Id, type Status } from "../types/types";
import { Button } from "../shared/ui/Button";

export const Two = () => {
    const [currentTaskNumber, setCurrentTaskNumber] = useState(0);
    const currentTask = VariantTasks[currentTaskNumber];
    const [status, setStatus] = useState<Status>("idle");
    const [selectedVariantId, setSelectedVariantId] = useState<Id | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const nextTask = () => {
        setStatus("idle");
        if (currentTask.id !== VariantTasks[VariantTasks.length - 1].id) {

            setCurrentTaskNumber(prev => prev + 1);
        }
        if (currentTask.id === VariantTasks[VariantTasks.length - 1].id) {
            setStatus("finish");
        }

    }
    const handleError = () => {
        setStatus("error");
    }
    const handleSuccess = () => {
        setStatus("success");
    }
    return <main>
        {status !== "finish" ? <>
            <ChoiceRightVariant
                selectedVariantId={selectedVariantId}
                setIsSubmitted={setIsSubmitted}
                setSelectedVariantId={setSelectedVariantId}
                currentTaskNumber={currentTaskNumber}
                isSubmitted={isSubmitted}
                handleSuccess={handleSuccess}
                handleError={handleError}
                status={status}
                handleNextTask={nextTask}
                correctVariantId={currentTask.correctVariantId}
                id={currentTask.id} questionTitle={currentTask.questionTitle} variants={currentTask.variants} key="test-key1231231" />
            {status === "error" || status === "success" ? <Button variant="primary" onClick={nextTask}>next</Button> : null}
        </> : <div>finish</div>}
    </main>
}