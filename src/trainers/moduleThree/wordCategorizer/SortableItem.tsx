import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { WordItem } from '.';


interface SortableItemProps {
  word: WordItem;
}

export const SortableItem = ({ word }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: word.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="WordCategorizerWord"
      {...attributes}
      {...listeners}
    >
      <span>{word.text}</span>
    </li>
  );
};