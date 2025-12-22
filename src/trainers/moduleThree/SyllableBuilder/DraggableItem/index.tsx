import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './styles.scss';
interface DraggableVariantProps {
    id: string;
    value: string;
    isDragging: boolean;
}

export const DraggableVariant = ({ id, value, isDragging }: DraggableVariantProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging: isSortableDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isSortableDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`SyllableBuilderVariant ${isDragging ? 'dragging' : ''}`}
            {...attributes}
            {...listeners}
        >
            <span>{value}</span>
        </div>
    );
};