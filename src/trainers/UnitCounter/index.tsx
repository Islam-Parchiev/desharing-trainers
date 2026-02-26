import { TrainerTitle } from '../../components/TrainerTitle';
import './styles.scss';

export const UnitCounter = ({ title, content, correctVariant, variants, handleSuccess, handleError }: { title: string; content: string; correctVariant: number | string; variants: string[] | number[]; handleSuccess: () => void; handleError: () => void }) => {
    const handleClick = (variant: number | string) => {
        if (variant === correctVariant) {
            handleSuccess();
        } else {
            handleError();
        }
    }
    return <div className='UnitCounter__main_wrapper'>
        <TrainerTitle>{title}</TrainerTitle>
        <div className='UnitCounter'>
            <div className="UnitCounter__inner">
                <div className="UnitCounter__window">
                    <div className="UnitCounter__window_content">
                        <span>{content}</span>
                    </div>
                </div>
                <div className="UnitCounter__content">
                    {variants.map((item, index) => <span key={index} onClick={() => handleClick(item)}>{item}</span>)}
                </div>
            </div>
        </div>
    </div>;
}
