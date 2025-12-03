import { DndContext, type DragEndEvent, type UniqueIdentifier } from '@dnd-kit/core';
import './styles.scss';
import { useState } from 'react';

import SVGConnector from './connector';
import { ElementA } from './a';
import { ElementB } from './b';
import type { Id } from '../../../types/types';
export interface Connection {
    fromId: UniqueIdentifier;
    toId: UniqueIdentifier;
    id: string;
}
export const MatchingGame = () => {

    const [connections, setConnections] = useState<Connection[]>([]);
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setConnections(prev => [...prev, {
                fromId: active.id,
                toId: over.id,
                id: `${active.id}-${over.id}`
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