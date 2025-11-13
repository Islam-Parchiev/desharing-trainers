import { TrainerTitle } from "../../components/TrainerTitle"
import { Icon } from "../../shared/ui/MoveBox"
import type { Id, Status } from "../../types/types";
import cn from 'classnames'
import './styles.scss';
export interface ImageVariant {
    id: Id;
    imageUrl: string;
    correct: boolean;
}
export const ChoiceRightImage = ({ title, variants, setStatus,isSubmitted,setIsSubmitted }: { isSubmitted: boolean; setIsSubmitted: (value:boolean) => void; title: string; variants: ImageVariant[]; status?: Status; setStatus: (value: Status) => void; }) => {
    const handleCheck = (variant: ImageVariant) => {
        if (variant.correct === false) {
            setStatus("error");
            setIsSubmitted(true);
        }
        if (variant.correct === true) {
            setStatus("success")
            setIsSubmitted(true);
        }
    }
    const handleClass = (variant: ImageVariant) => {
        if (isSubmitted) {
            if (variant.correct === true) {
                return "correct"
            }
            if (variant.correct === false) {
                return "incorrect"
            }
        }
    }
    return (
        <div className="ChoiceRightImage">
            <div className="ChoiceRightImage__inner">
                <div className="ChoiceRightImage__header">
                    <TrainerTitle>{title}</TrainerTitle>
                </div>
                <div className="ChoiceRightImage__content">
                    {variants.map((item) => <div key={`imageVariant-key-${item.id}-${item.imageUrl}`} className={cn("ImageVariant", handleClass(item))} onClick={() => handleCheck(item)}>
                        <button className="btn-reset"><Icon /></button>
                        <img src={item.imageUrl} alt="в" />
                    </div>)}
                </div>
            </div>
        </div>
    )
}