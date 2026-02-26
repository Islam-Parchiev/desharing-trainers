import { Modal } from "../../../../widgets/modal"
import './styles.scss';
export const NewWordsModal = ({ onClose, title, description }: { title: string; description: string; onClose: () => void; }) => {
    return (
        <Modal onClose={onClose}>
            <div className="NewWordsModal__content">
                <h2 className="NewWordsModal__title">
                    {title}
                </h2>
                <p className="NewWordsModal__descr">
                    {description}
                </p>
            </div>
        </Modal>
    )
}