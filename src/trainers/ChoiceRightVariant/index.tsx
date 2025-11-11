import { useEffect, useState } from "react";
import type { ITask, Variant } from "../../App";
import { VariantItem } from "../../components/VariantItem";
// import cn from 'classnames'
import type { Id } from "../../types/types";
interface IChoiceRightVariant extends ITask {
    handleNextTask?: () => void;
    success: boolean;
    handleSuccess: () => void;
    error: boolean;
    handleError: () => void;
    currentTaskNumber: number;
}
export const ChoiceRightVariant = ({ currentTaskNumber, handleNextTask, questionTitle, variants, correctVariantId, error, success, handleError, handleSuccess }: IChoiceRightVariant) => {
    const [selectedVariantId, setSelectedVariantId] = useState<Id | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleVariantClick = (item: Variant) => {
        if (!isSubmitted) {

            setSelectedVariantId(item.id);
            if (item.id === correctVariantId) {
                handleSuccess();
            } else {
                handleError();
            }
        }
        setIsSubmitted(true);
    }
    const addClasses = (item: Variant) => {
        if (isSubmitted) {
            if (item.id === correctVariantId) {
                return "correct-variant"
            }
            if (item.id === selectedVariantId && item.id !== correctVariantId) {

                return "incorrect-variant"
            }
            return "other-variants"
        }
        return ""
    }
    useEffect(() => {
        // setError(false);
        // setSuccess(false)
        setSelectedVariantId(null);
        setIsSubmitted(false);
    }, [currentTaskNumber])
    return <div className="ChoiceRightVariant">
        <div className="ChoiceRightVariant__inner">
            <h5 className="ChoiceRightVariant__title">{questionTitle}</h5>
            {error && "error"}
            {success && "success"}
            <div className="ChoiceRightVariant__variants">
                {variants.map((item) => <VariantItem className={addClasses(item)} handleItemClick={() => handleVariantClick(item)} id={item.id} title={item.title} key={"variant-" + item.id} />)}
            </div>
        </div>
    </div>
}