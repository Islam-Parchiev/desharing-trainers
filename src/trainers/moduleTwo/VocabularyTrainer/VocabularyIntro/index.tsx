import './styles.scss';
import { TrainerTitle } from "../../../../components/TrainerTitle"
import { Icon } from '../../../../shared/ui/MoveBox';

export const VocabularyIntro = () => {
    return (
        <div className="VocabularyIntro">
            <div className="VocabularyIntro__inner">
                <TrainerTitle>Произнеси вслух</TrainerTitle>
                <div className="VocabularyIntro__main">
                    <button className='btn-reset VocabularyIntro__sound'><Icon /></button>
                    <span>человек</span>
                </div>
            </div>
        </div>
    )
}