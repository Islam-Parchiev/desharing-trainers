import { useState } from "react";
import type { Variant } from "../../App";
import { VariantItem } from "../../components/VariantItem";
import type { Id } from "../../types/types";

export interface ChoiceRightVariant {
    id: Id;
    questionTitle: string;
    correctVariants: Id[];
    variants: Variant[]
}

export const ChoiceMultipleVariants = ({ questionTitle, correctVariants, variants }: ChoiceRightVariant) => {
    const [selectedVariantIds, setSelectedVariantIds] = useState<Id[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleCheck = () => {
        setIsSubmitted(true);

        if (selectedVariantIds.length === correctVariants.length) {
            if (selectedVariantIds.every(item => correctVariants.includes(item))) {
                setSuccess(true);
                setError(false);
                return true;
            }
            setError(true);
            setSuccess(false);
        } else {
            setError(true);
            setSuccess(false);
        }
        return false;
    };

    const handleVariantClick = (item: Variant) => {
        if (isSubmitted) {
            setIsSubmitted(false);
            setSuccess(false);
            setError(false);
        }

        if (selectedVariantIds.find(id => id === item.id)) {
            setSelectedVariantIds(prev => prev.filter(id => id !== item.id));
        } else {
            if (selectedVariantIds.length < correctVariants.length) {
                setSelectedVariantIds(prev => [...prev, item.id]);
            }
        }
    };

    const addClasses = (item: Variant) => {
        let className = "";

        if (selectedVariantIds.find(id => id === item.id)) {
            className += "selected-var ";
        }

        if (isSubmitted) {
            if (correctVariants.includes(item.id)) {
                className += "correct-variant ";
            } else if (selectedVariantIds.includes(item.id) && !correctVariants.includes(item.id)) {
                className += "incorrect-variant ";
            }
            if(!selectedVariantIds.includes(item.id)&& !correctVariants.includes(item.id)) {
                className+="other-variants "
            }
        }

        return className.trim();
    };

    return (
        <div className="ChoiceRightVariant">
            <div className="ChoiceRightVariant__inner">
                <h5 className="ChoiceRightVariant__title">{questionTitle}</h5>
                {error && <div className="error-message">error</div>}
                {success && <div className="success-message">success</div>}
                <div className="variants">
                    {variants.map((item) => (
                        <VariantItem
                            className={addClasses(item)}
                            handleItemClick={() => handleVariantClick(item)}
                            id={item.id}
                            title={item.title}
                            key={"variant-" + item.id}
                        />
                    ))}
                </div>

                {selectedVariantIds.length === correctVariants.length && !isSubmitted && (
                    <button onClick={handleCheck}>Check Answer</button>
                )}
                {isSubmitted && <button onClick={() => {/* Add your next logic here */ }}>next</button>}
            </div>
        </div>
    );
};