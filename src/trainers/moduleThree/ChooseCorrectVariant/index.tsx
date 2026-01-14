import { useState } from "react";
import { TrainerTitle } from "../../../components/TrainerTitle";
import { Button } from "../../../shared/ui/Button";
import './styles.scss';
interface IChooseCorrectVariant {
    variants: string[];
    correctVariant: string;
    onSelect?: () => void;
    title: string;
    handleNext: () => void;
    handleError?: () => void;
    handleSuccess?: () => void;
}
export const ChooseCorrectVariant = ({ variants, correctVariant, handleSuccess, onSelect, title, handleError, handleNext }: IChooseCorrectVariant) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
    const handleVariantClick = (variant: string) => {
        if (isSubmitted) return;

        setSelectedVariant(variant);
        handleSubmit();
        onSelect?.();
    };

    const handleSubmit = () => {
        if (!selectedVariant) return;

        setIsSubmitted(true);

        if (selectedVariant === correctVariant) {
            handleSuccess?.();
            setTimeout(() => {
                handleNext();
                setSelectedVariant(null);
                setIsSubmitted(false);
            }, 1000);
        } else {
            handleError?.();
            setTimeout(() => {
                handleNext();
                setSelectedVariant(null);
                setIsSubmitted(false);
            }, 1000);
        }
    };
    const addClasses = (variant: string) => {
        if (!isSubmitted) return '';

        if (variant === correctVariant) {
            return "correct-v";
        } else if (variant === selectedVariant && variant !== correctVariant) {
            return "incorrect-v";
        }
        return '';
    };
    return (
        <div className="ChooseCorrectVariant">
            <div className="ChooseCorrectVariant__inner">
                <TrainerTitle>{title}</TrainerTitle>
                <div className="ChooseCorrectVariant__variants">
                    {
                        variants.length > 0 ? variants.map(variant => (
                            <Button variant="primary" className={`${addClasses(variant)}`} onClick={() => handleVariantClick(variant)}>{variant}</Button>
                        )) : "Error"
                    }
                </div>
            </div>
        </div>
    )
}