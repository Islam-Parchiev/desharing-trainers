import { useDroppable } from '@dnd-kit/core'
import type { Id } from '../../../types/types';
import './styles.scss';
export const DropBox = ({ id, imageUrl, title }: { id: Id; imageUrl: string; title: string | null; }) => {
    const { setNodeRef } = useDroppable({ id })
    return (
        <div className="DropBox">
            <div ref={setNodeRef} className="DropBox__box">
                {/* {title || ''} */}
                {title ? <div className='DropBox__card'>{title}</div> : ''}
            </div>
            <div className="DropBox__bottom">

                <div className="DropBox__image">
                    <img src={`/${imageUrl}`} alt="" />
                </div>
            </div>
        </div>
    )
}