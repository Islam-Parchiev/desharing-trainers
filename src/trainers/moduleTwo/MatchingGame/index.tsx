import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import './styles.scss';
import { useState } from 'react';
import { ElementA, ElementB } from './components';
import SVGConnector from './connector';
interface Connection {
    fromId: string;
    toId: string;
    id: string;
}
export const MatchingGame = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [connections, setConnections] = useState<Connection[]>([]);
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            // Добавляем новую связь: из active.id в over.id
            setConnections(prev => [...prev, {
                fromId: active.id,
                toId: over.id,
                id: `${active.id}-${over.id}` // Уникальный ключ
            }]);
        }
    }
    return (
        <div className="MatchingGame">
            <div className="MatchingGame__inner">
                <DndContext onDragEnd={handleDragEnd}>
                    <SVGConnector connections={connections} />
                    <ElementA id="a1" />
                    <ElementB id="b1" />
                </DndContext>
            </div>
        </div>
    )
}