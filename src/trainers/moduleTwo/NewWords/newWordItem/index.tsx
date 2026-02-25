import { useState } from 'react';
import { NewWordsModal } from '../modal';
import './styles.scss';

export const NewWordItem = ({ word, content, description }: { word: string; content: string; description: string }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return <>
        <button
            className='btn-reset NewWordItem NewWordItem--btn-link'
            onClick={() => setModalOpen(true)}
            type="button"
        >
            {content}
        </button>
        {modalOpen && <NewWordsModal onClose={() => setModalOpen(false)} title={word} description={description} />}
    </>
}