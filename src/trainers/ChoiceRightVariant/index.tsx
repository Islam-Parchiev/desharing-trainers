import { useState } from "react";
import type { ITask, Variant } from "../../App";
import { VariantItem } from "../../components/VariantItem";
import cn from 'classnames'
import type { Id } from "../../types/types";
interface IChoiceRightVariant extends ITask {
    handleNextTask: () => void;
}
export const ChoiceRightVariant = ({ questionTitle, variants, correctVariantId, handleNextTask }: IChoiceRightVariant) => {
    const [selectedVariantId, setSelectedVariantId] = useState<Id | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleVariantClick = (item: Variant) => {
        if (!isSubmitted) {

            setSelectedVariantId(item.id);
            if (item.id === correctVariantId) {
                setSuccess(true);
            } else {
                setError(true);
            }
        }
        setIsSubmitted(true);
    }
    const addClasses = (item: Variant) => {
        if (isSubmitted) {
            if (item.id === correctVariantId) {
                return "correct-variant"
            }
            if (item.id === selectedVariantId) {

                return "incorrect-variant"
            }
            return "other-variants"
        }
        return ""
    }
    const nextTask = () => {
        setError(false);
        setSuccess(false)
        setSelectedVariantId(null);
        setIsSubmitted(false);
        handleNextTask()
    }
    return <div className="ChoiceRightVariant">
        <div className="ChoiceRightVariant__inner">
            <h5 className="ChoiceRightVariant__title">{questionTitle}</h5>
            {error && "error"}
            {success && "success"}
            <div className="variants">
                {variants.map((item) => <VariantItem className={addClasses(item)} handleItemClick={() => handleVariantClick(item)} id={item.id} title={item.title} key={"variant-" + item.id} />)}
            </div>

            {success && <button onClick={nextTask}>next</button>}
        </div>
    </div>
}