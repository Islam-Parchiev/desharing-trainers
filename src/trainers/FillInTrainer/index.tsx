import { useState } from 'react';
import { TrainerTitle } from '../../components/TrainerTitle';
import { FillInInput } from './FillInInput';
import { FillInVariant } from './FillInVariant';
import './styles.scss';
import type { Id, Status } from '../../types/types';
import { Button } from '../../shared/ui/Button';
interface IVariant { id: Id; variant: string; correct: boolean; }
export const FillInTrainer = () => {
    const [slot, setSlot] = useState<IVariant | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [variants] = useState<IVariant[]>([
        {
            id: 1,
            variant: "башкирский",
            correct: false
        },
        {
            id: 2,
            variant: "калмыцкий",
            correct: true,
        },
        {
            id: 3,
            variant: "чувашский",
            correct: false
        },
        {
            id: 4,
            variant: "якутский",
            correct: false
        },
    ])
    const isDisabled = (variant: IVariant) => {
        if (slot?.variant === variant.variant) {
            return true;
        }
        return false;
    }
    const handleClickVariant = (variant: IVariant) => {
        setSlot(variant);
    }
    const handleCheck = () => {
        if (!slot || slot && slot.correct === false) {
            setStatus("error");
        } else {
            setStatus("success");
        }
    }
    return (
        <div className='FillInTrainer'>
            <div className="FillInTrainer__inner">
                {/* <h3 className="FillInTrainer__title"></h3> */}
                <TrainerTitle>Нажми на родной язык ребёнка</TrainerTitle>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
                <div className="FillInTrainer__content">
                    <span>Я из Калмыкии, мой родной язык - <FillInInput value={slot?.variant || null} /></span>
                </div>
                <div className="FillInTrainer__variants">
                    {/* <FillInVariant value='' />
                    <FillInVariant />
                    <FillInVariant />
                    <FillInVariant /> */}
                    {variants.map(variant => <FillInVariant onClick={() => handleClickVariant(variant)} value={variant.variant} key={variant.id} isDisabled={isDisabled(variant)} />)}
                </div>
                <Button variant="primary" onClick={handleCheck}>check</Button>
            </div>
        </div>
    )
}