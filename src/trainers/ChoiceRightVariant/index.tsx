
import { VariantItem } from "../../components/VariantItem";
import './styles.scss';
import { Button } from "../../shared/ui/Button";
import type { ITask } from "../../App";

type VariantStatus = "default" | "correct" | "incorrect" | "disabled";

export const ChoiceRightVariant = ({
    task
}: { task: ITask }) => {


    return (
        <div className="ChoiceRightVariant">
            <div className="ChoiceRightVariant__inner">
                <h6 className="ChoiceRightVariant__title">{task.questionTitle}</h6>



                {/* Variants List */}
                <div className="ChoiceRightVariant__variants">
                    {task.variants.length > 0 ? (
                        task.variants.map((variant) => (
                            <VariantItem
                                className={getVariantStatus(variant)}
                                handleItemClick={() => handleVariantClick(variant)}
                                title={variant.title}
                                key={"variant-key-" + variant.id}
                                id={variant.id}
                            />
                        ))
                    ) : (
                        <div className="ChoiceRightVariant__empty">No variants available</div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="ChoiceRightVariant__actions">
                    {!isSubmitted ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedItemId === null}
                        >
                            Проверить
                        </Button>
                    ) : (
                        <Button onClick={handleReset}>
                            Попробовать снова
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
// import { useState } from "react";
// import { VariantItem } from "../../components/VariantItem";
// import type { Id } from "../../types/types";
// import './styles.scss';
// import { Button } from "../../shared/ui/Button";
// export interface Variant {
//     id: Id;
//     title: string;
//     correct: boolean;
// }
// export const ChoiceTrainer = ({ title, variants }: { title: string; variants: Variant[]; }) => {
//     // const selectedVariants: Variant[] = [];
//     const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
//     const [error, setError] = useState(false);
//     const [success, setSuccess] = useState(false);
//     const handleSelectVariant = (variant: Variant) => {
//         const itemVar = selectedVariants.find((item => item.id === variant.id));
//         if (itemVar) {
//             setSelectedVariants(prev => prev.filter((item) => item.id !== itemVar.id));
//         } else {
//             setSelectedVariants(prev => [...prev, variant])
//         }
//     }
//     const handleCheck = () => {
//         if (selectedVariants.length > 0 && selectedVariants.find(item => item.correct === false)) {
//             setError(true);
//             setSuccess(false);
//         } else {
//             setError(false);
//             setSuccess(true);
//         }
//     }
//     return (
//         <div className="ChoiceTrainer">
//             <div className="ChoiceTrainer__inner">
//                 <h6 className="ChoiceTrainer__title">{title}</h6>
//                 {error && "ОШИБКА"}
//                 {success && "УСПЕХ"}
//                 <div className="ChoiceTrainer__variants">
//                     {
//                         variants.length > 0 ? variants.map((variant) => <VariantItem selected={selectedVariants.includes(variant)} handleItemClick={() => handleSelectVariant(variant)} title={variant.title} correct={variant.correct} key={"variant-key-" + variant.id} id={variant.id} />) : "error"
//                     }
//                 </div>
//                 <Button onClick={handleCheck}>check</Button>
//             </div>
//         </div>
//     )
// }