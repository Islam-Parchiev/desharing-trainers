import { useEffect } from "react";
import type { ITask, Variant } from "../../App";
import { VariantItem } from "../../components/VariantItem";
// import cn from 'classnames'
import type { Id, Status } from "../../types/types";
interface IChoiceRightVariant extends ITask {
    handleNextTask?: () => void;
    handleSuccess: () => void;
    status: Status;
    handleError: () => void;
    currentTaskNumber: number;
    isSubmitted: boolean;
    setSelectedVariantId: (value: Id | null) => void;
    setIsSubmitted: (value: boolean) => void;
    selectedVariantId: Id | null;
}
export const ChoiceRightVariant = ({ isSubmitted, selectedVariantId, setIsSubmitted, setSelectedVariantId, currentTaskNumber, questionTitle, variants, correctVariantId, status, handleError, handleSuccess }: IChoiceRightVariant) => {
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
        setSelectedVariantId(null);
        setIsSubmitted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTaskNumber])
    return <div className="ChoiceRightVariant">
        <div className="ChoiceRightVariant__inner">
            <h5 className="ChoiceRightVariant__title">{questionTitle}</h5>
            {status === "error" && "error"}
            {status === "success" && "success"}
            <div className="ChoiceRightVariant__variants">
                {variants.map((item) => <VariantItem className={addClasses(item)} handleItemClick={() => handleVariantClick(item)} id={item.id} title={item.title} key={"variant-" + item.id} />)}
            </div>
        </div>
    </div>
}