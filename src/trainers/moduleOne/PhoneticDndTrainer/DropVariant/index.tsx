import { useDroppable } from "@dnd-kit/core";
import type { Id } from "../../../types/types";
export const DropVariant = ({
    id,
    content,
    imageUrl,
    className,
    correct
}: {
    id: Id;
    correct: boolean;
    content: string;
    imageUrl: string;
    className: string;
}) => {
    const { setNodeRef } = useDroppable({ id, data: { correct: correct } })
    return (
        <div ref={setNodeRef} className={`PhoneticTrainer__variant ${className}`}>
            <div className="PhoneticTrainer__variant_content">
                {content}
            </div>
            <div className="PhoneticTrainer__variant_image">

                <img src={imageUrl} alt="var1" />
            </div>
        </div>
    )
}