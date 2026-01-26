import { useDroppable } from '@dnd-kit/core';
import './styles.scss';
export const CollectPhrasesItem = ({
    imageUrl,
    title,
    currentValue
}: {
    imageUrl: string;
    title: string;
    currentValue: null | string;
}) => {
    const { setNodeRef } = useDroppable({ id: title })
    return (
        <div className="CollectPhrases__item">
            <div className="CollectPhrases__item_image">
                <img src={imageUrl} alt={title} />
            </div>
            <div className='CollectPhrases__item_info'>

                <span>{title}</span>
            </div>
            <div className={`CollectPhrases__item_slot ${currentValue ? "filled" : ""}`} ref={setNodeRef}>
                {currentValue || ""}
            </div>
        </div>
    )
}