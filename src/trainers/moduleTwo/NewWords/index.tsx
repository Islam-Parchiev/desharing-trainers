import { NewWordItem } from './newWordItem';
import './styles.scss';
import { TrainerTitle } from '../../../components/TrainerTitle';
export const NewWords = () => {
    return (
        <div className="NewWords">
            <TrainerTitle>Нажми на новое слово и узнай его значение</TrainerTitle>
            <div className="NewWords__inner">
                <div className="NewWords__content">
                    <p>
                        Представляешь, я подружился с настоящим <NewWordItem word='Юнга' content='юнгой' description='Юнга — это подросток или молодой человек на судне (парусном или военном), проходящий обучение морскому делу для подготовки к службе в качестве матроса.' />
                    </p>
                </div>
            </div>
        </div>
    )
}