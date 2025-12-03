import { useDroppable } from '@dnd-kit/core';
import { useCallback } from 'react';

export const ElementB = ({ id }: { id: string }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const ref = useCallback((node: HTMLElement | null) => {
    if (node) {
      node.setAttribute('data-id', String(id));
    }
    setNodeRef(node);
  }, [setNodeRef, id]);

  const style = {
    border: isOver ? '2px solid green' : '1px solid #ccc',
  };

  return (
    <div
      ref={ref}
      style={style}
      className="droppable-element"
    >
      Элемент B: {id}
    </div>
  );
};