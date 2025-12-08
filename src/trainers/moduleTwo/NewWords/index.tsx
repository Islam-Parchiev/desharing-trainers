import { useState } from 'react';
import { NewWordItem } from './newWordItem';
import './styles.scss';
import { NewWordsModal } from './modal';
export const NewWords = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const handleWordClick = () => {
        setModalOpen(true)
    }
    return (
        <div className="NewWords">
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