import { TrainerTitle } from '../../components/TrainerTitle';
import './styles.scss';
export const ConversationFinder = () => {
    return (
        <div className="ConversationFinder">
            <div className="ConversationFinder__inner">
                <TrainerTitle>Нажимай на кнопки и ищи того, с кем говорит Стёпа</TrainerTitle>
                <div className="ConversationFinder__content">
                    <div className="ConversationFinder__col">
                        <div className="ConversationFinder__col_text">
                            <span>
                                Привет, Катя
                            </span>
                        </div>
                        <div className="ConversationFinder__image">
                            <img src="/gr1.png" alt="" />
                        </div>
                    </div>
                    <div className="ConversationFinder__col">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}