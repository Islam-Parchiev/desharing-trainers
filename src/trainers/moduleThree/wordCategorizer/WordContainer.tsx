import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { SortableItem } from './SortableItem';
import type { WordItem } from '.';


interface WordContainerProps {
  id: string;
  title: string;
  words: WordItem[];
}

export const WordContainer = ({ id, title, words }: WordContainerProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div 
      className={`WordCategorizerCol ${isOver ? 'WordCategorizerCol--over' : ''}`}
      ref={setNodeRef}
    >
      <h6 className="WordCategorizerCol__title">{title}</h6>
      <div className="WordCategorizerCol__inner">
        <SortableContext 
          items={words.map(w => w.id)} 
          strategy={verticalListSortingStrategy}
        >
          <ul className="list-reset WordCategorizerCol__words">
            {words.map((word) => (
              <SortableItem key={word.id} word={word} />
            ))}
          </ul>
        </SortableContext>
      </div>
    </div>
  );
};