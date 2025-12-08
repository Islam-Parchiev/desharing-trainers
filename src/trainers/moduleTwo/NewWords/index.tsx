import { useState } from 'react';
import { NewWordItem } from './newWordItem';
import './styles.scss';
import { NewWordsModal } from './modal';
import { TrainerTitle } from '../../../components/TrainerTitle';
export const NewWords = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleWordClick = () => {
        setModalOpen(true)
    }
    return (
        <div className="NewWords">
            <TrainerTitle>Нажми на новое слово и узнай его значение</TrainerTitle>
            <div className="NewWords__inner">
                <div className="NewWords__content">
                    <p>
                        Представляешь, я подружился с настоящим <NewWordItem word='юнгой' onClick={handleWordClick} />
                    </p>
                </div>
            </div>
            {modalOpen && <NewWordsModal onClose={() => setModalOpen(false)} />}
        </div>
    )
}