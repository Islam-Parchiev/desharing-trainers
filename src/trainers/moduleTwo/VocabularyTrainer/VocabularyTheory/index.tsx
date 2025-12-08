import { TrainerTitle } from "../../../../components/TrainerTitle"
import { Icon } from "../../../../shared/ui/MoveBox"
import './styles.scss';

export const VocabularyTheory = () => {
    return (
        <div className="VocabularyTheory">
            <div className="VocabularyTheory__inner">
                <div className="VocabularyTheory__compare">
                    <TrainerTitle>Сравни!</TrainerTitle>
                    <span>так слышим: [ч'илав'эк]</span>
                    <span>так пишем: <b>человек</b></span>
                </div>
                <div className="VocabularyTheory__text">
                    <button className="btn-reset VocabularyTheory__sound_btn"><Icon /></button>
                    <p>В старые времена было слово "человече" - участник собрания ("чело"- лоб и "вече" - собрание).</p>
                </div>
            </div>
        </div>
    )
}