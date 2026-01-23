import { useState } from "react";
import cn from 'classnames';

import './styles.scss';
import { Button } from "../../../../shared/ui/Button";

interface WordWithMistakeProps { content: string; variants: string[]; correctVariant: string; handleSuccess: () => void; handleError: () => void; }

export const WordWithMistake = ({ content, correctVariant, variants, handleSuccess, handleError }: WordWithMistakeProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContent, setCurrentContent] = useState(content);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleVariantClick = (v: string) => {
        if (!isSubmitted) {

            if (v === correctVariant) {
                handleSuccess()
                setCurrentContent(v);
                setIsModalOpen(false);
                setIsSubmitted(true);
            } else {
                handleError()
            }
        }
        return;
    }
    const handleOpenModal = () => {
        if (!isSubmitted) {
            setIsModalOpen(true);
        }
        return;
    }
    return <div className="WordWithMistake">
        {variants ? isModalOpen && <div className="WordWithMistake-variantsModal">
            {variants.map(variant => <Button variant="primary" size="small" asChild className="WordWithMistake__variant" onClick={() => handleVariantClick(variant)}><span>
                {variant}
            </span>
            </Button>)}
        </div> : <>something went wrong</>
        }
        <span className={cn('WordWithMistake__content', isModalOpen ? 'modal-opened' : '')} onClick={handleOpenModal}>
            {currentContent}
        </span>
    </div>
}