import { TrainerTitle } from '../../components/TrainerTitle';
import { Button } from '../../shared/ui/Button';
import './styles.scss';

import { useState } from 'react';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { DraggableLetter, DroppableSlot } from './draggable';

export const AnagramPuzzle = () => {
    const [variants] = useState([
        { id: '1', label: 'шин' },
        { id: '2', label: 'щин' },
        { id: '3', label: 'шен' }
    ]);

    const [placedItem, setPlacedItem] = useState<{ id: string; label: string } | null>(null);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && over.id === 'word-slot') {
            const dragged = variants.find(v => v.id === active.id);
            if (dragged) {
                setPlacedItem(dragged);
                // setVariants(prev => prev.filter(v => v.id !== active.id));
            }
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className='AnagramPuzzle'>
                <div className="AnagramPuzzle__inner">
                    <TrainerTitle>Подпиши картинку</TrainerTitle>
                    <h3>Собери слово из букв</h3>

                    <div className="AnagramPuzzle__content">

                        <div className="AnagramPuzzleItem">
                            <div className="AnagramPuzzleItem__image">
                                <img src="/car2d.png" alt="car" />
                            </div>
                            <h4 className='AnagramPuzzleItem__title'>
                                <span>Машина</span>
                            </h4>
                        </div>

                        <div className="AnagramPuzzleItem">
                            <div className="AnagramPuzzleItem__image">
                                <img src="/car2d.png" alt="car" />
                            </div>
                            <div className="AnagramPuzzleItemDroppableWord">
                                <div>
                                    <span>Ма</span>
                                    <DroppableSlot id="word-slot">
                                        {placedItem && <Button variant="primary">{placedItem.label}</Button>}
                                    </DroppableSlot>
                                    <span>ка</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Банк вариантов */}
                    <div className="AnagramPuzzle__variants">
                        {variants.map((item) => (
                            <DraggableLetter key={item.id} id={item.id} label={item.label} />
                        ))}
                    </div>
                </div>
            </div>
        </DndContext>
    );
};