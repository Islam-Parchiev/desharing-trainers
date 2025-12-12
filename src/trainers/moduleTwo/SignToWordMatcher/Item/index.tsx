import cn from 'classnames';
import './styles.scss';
import type { Id } from '../../../../types/types';
import { useDroppable } from '@dnd-kit/core';

export const SignToWordMatcherItem = ({ id, imageUrl = "/apt.png", value }: { id: Id; value: string | null; imageUrl: string; }) => {
    const { setNodeRef } = useDroppable({ id })
    return (

        <div className="SignToWordMatcherItem">
            <div className="SignToWordMatcherItem__image">
                <img src={imageUrl} alt="test" />
            </div>
            <div className={cn("SignToWordMatcherItem__slot", value && "filled")} ref={setNodeRef}>
                {value || ""}
            </div>
        </div>
    )
}