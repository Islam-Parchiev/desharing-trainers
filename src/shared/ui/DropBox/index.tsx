import { useDroppable } from '@dnd-kit/core'
import type { Id } from '../../../types/types';
export const DropBox = ({ id, imageUrl, title }: { id: Id; imageUrl: string; title: string | null; }) => {
    const { setNodeRef } = useDroppable({ id })
    return (
        <div className="DropBox">
            <div ref={setNodeRef} className="DropBox__box">{title || ''}</div>
            <div className="DropBox__image">
                <img src={`/${imageUrl}`} alt="" />
            </div>
        </div>
    )
}