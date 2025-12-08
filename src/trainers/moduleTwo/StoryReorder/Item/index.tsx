import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './styles.scss';
import { Icon } from "../../../../shared/ui/MoveBox"
import type { Id } from '../../../../types/types';
export const StoryReorderItem = ({ id, content }: { id: Id; content: string; }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id:id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div className="StoryReorderItem" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="StoryReorderItem__inner">
                <button className="btn-reset StoryReorderItem__sound">
                    <Icon />
                </button>
                <span>{content}</span>
            </div>
        </div>
    )
}