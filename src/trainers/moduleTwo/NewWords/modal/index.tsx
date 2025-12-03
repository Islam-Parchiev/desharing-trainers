import { Modal } from "../../../../widgets/modal"
import './styles.scss';
export const NewWordsModal = ({ onClose }: { onClose: () => void; }) => {
    return (
        <Modal onClose={onClose}>
            <div className="NewWordsModal__content">
                <h2 className="NewWordsModal__title">
                    Юнга
                </h2>
                <p className="NewWordsModal__descr">
                    Младший матрос на корабле
                </p>
            </div>
         </Modal>
    )
}