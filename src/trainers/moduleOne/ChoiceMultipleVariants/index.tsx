import { useState } from "react";
import type { Variant } from "../../../App";
import { VariantItem } from "../../../components/VariantItem";
import type { Id, Status } from "../../../types/types";
import { Button } from "../../../shared/ui/Button";

export interface ChoiceRightVariant {
    id: Id;
    questionTitle: string;
    correctVariants: string[];
    variants: Variant[];
    handleNext: () => void;
}

export const ChoiceMultipleVariants = ({ questionTitle, handleNext, correctVariants, variants }: ChoiceRightVariant) => {
    const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [status, setStatus] = useState<Status>("idle")

    const handleCheck = () => {
        setIsSubmitted(true);

        if (selectedVariants.length === correctVariants.length) {
            if (selectedVariants.every(item => correctVariants.includes(item))) {
                setStatus("success")
                return true;
            }
            setStatus("error")
        } else {
            setStatus("error")
        }
        return false;
    };

    const handleVariantClick = (item: Variant) => {
        if (isSubmitted) {
            setIsSubmitted(false);
            setStatus("idle");
        }

        if (selectedVariants.find(variant => variant === item.title)) {
            setSelectedVariants(prev => prev.filter(variant => variant !== item.title));
        } else {
            if (selectedVariants.length < correctVariants.length) {
                setSelectedVariants(prev => [...prev, item.title]);
            }
        }
    };

    const addClasses = (item: Variant) => {
        let className = "";

        if (selectedVariants.find(variant => variant === item.title)) {
            className += "selected-var ";
        }

        if (isSubmitted) {
            if (correctVariants.includes(item.title)) {
                className += "correct-variant ";
            } else if (selectedVariants.includes(item.title) && !correctVariants.includes(item.title)) {
                className += "incorrect-variant ";
            }
            if (!selectedVariants.includes(item.title) && !correctVariants.includes(item.title)) {
                className += "other-variants "
            }
        }

        return className.trim();
    };

    return (
        <div className="ChoiceRightVariant">
            <div className="ChoiceRightVariant__inner">
                <h5 className="ChoiceRightVariant__title">{questionTitle}</h5>
                {status === "error" && <div className="error-message">error</div>}
                {status === "success" && <div className="success-message">success</div>}
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

                {selectedVariants.length === correctVariants.length && !isSubmitted && (
                    <Button variant="primary" onClick={handleCheck}>Check Answer</Button>
                )}
                {isSubmitted && <Button variant="primary" onClick={handleNext}>next</Button>}
            </div>
        </div>
    );
};