import { useDraggable } from '@dnd-kit/core';
import { useCallback } from 'react';

export const ElementA = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  
  // Устанавливаем data-id и ссылку для dnd-kit
  const ref = useCallback((node: HTMLElement | null) => {
    if (node) {
      node.setAttribute('data-id', id);
    }
    setNodeRef(node);
  }, [setNodeRef, id]);

  return (
    <div 
      ref={ref} 
      {...listeners} 
      {...attributes}
      className="draggable-element"
    >
      Элемент A: {id}
    </div>
  );
};