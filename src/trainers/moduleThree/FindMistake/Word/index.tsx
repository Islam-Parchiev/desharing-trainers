import { useState } from "react";
import cn from 'classnames';

interface WordWithMistakeProps { content: string; variants: string[]; correctVariant: string; handleSuccess: () => void; handleError: () => void; }

export const WordWithMistake = ({ content, correctVariant, variants, handleSuccess, handleError }: WordWithMistakeProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleVariantClick = (v: string) => {
        if (v === correctVariant) {
            handleSuccess()
        } else {
            handleError()
        }
        return;
    }
    return <div className="WordWithMistake">
        {isModalOpen && variants ?
            <div className="WordWithMistake-variantsModal">
                {variants.map(variant => <span className="WordWithMistake__variant" onClick={() => handleVariantClick(variant)}>{variant}</span>)}
            </div> : <>something went wrong</>
        }
        <span className={cn('WordWithMistake__content', isModalOpen ? 'modal-opened' : '')} onClick={() => setIsModalOpen(true)}>
            {content}
        </span>
    </div>
}