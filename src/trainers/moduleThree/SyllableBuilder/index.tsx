import { useState } from 'react';
import {
    DndContext,
    type DragEndEvent,
    type DragStartEvent,
    DragOverlay,
    useDraggable,
    useDroppable,
    type DragMoveEvent,
    type DragOverEvent,
    defaultDropAnimationSideEffects,
    type DropAnimation,
    PointerSensor,
    useSensor,
    useSensors,
    closestCenter,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import './styles.scss';
import { Button } from '../../../shared/ui/Button';
import type { Status } from '../../../types/types';

interface MissingWord {
    id: number;
    word: string;
    missedLetter: number;
}

interface Variant {
    id: number;
    value: string;
}

interface Slot {
    id: number;
    currentValue: string | null;
    correctValue: string;
    slotNum: number;
}

interface SyllableBuilderData {
    word: string;
    correctAnswer: string;
    variants: Variant[];
    slots: Slot[];
    missingWords?: MissingWord[];
}

const mockData: SyllableBuilderData = {
    word: 'ли-{{1}}',
    correctAnswer: 'лиса',
    variants: [
        { id: 1, value: 'са' },
        { id: 2, value: 'рт' },
        { id: 3, value: 'вп' },
        { id: 4, value: 'кр' },
    ],
    slots: [{ id: 1, currentValue: null, correctValue: 'са', slotNum: 1 }],
    missingWords: [],
};

interface DraggableVariantProps {
    variant: Variant;
    isDragging?: boolean;
    disabled?: boolean;
}

const DraggableVariant = ({ variant, isDragging, disabled }: DraggableVariantProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `variant-${variant.id}`,
        data: { type: 'variant', variant },
        disabled,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <Button
            variant="primary"
            ref={setNodeRef}
            className={`SyllableBuilderVariant ${disabled ? 'SyllableBuilderVariant--disabled' : ''}`}
            style={style}
            {...attributes}
            {...listeners}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            disabled={disabled}
        >
            <span>{variant.value}</span>
        </Button>
    );
};

interface DroppableSlotProps {
    slot: Slot;
    isOver?: boolean;
    isDragging?: boolean;
}

const DroppableSlot = ({ slot, isOver, isDragging }: DroppableSlotProps) => {
    const { setNodeRef, isOver: currentIsOver } = useDroppable({
        id: `slot-${slot.id}`,
        data: { type: 'slot', slot },
        disabled: !!slot.currentValue,
    });

    const showOverlay = isOver || (currentIsOver && isDragging);

    return (
        <div
            ref={setNodeRef}
            className={`SyllableSlot ${slot.currentValue ? 'SyllableSlot--filled' : ''} ${showOverlay ? 'SyllableSlot--dragging-over' : ''}`}
            data-slot-id={slot.id}
        >
            {slot.currentValue && (
                <span className="SyllableSlot__value">{slot.currentValue}</span>
            )}
        </div>
    );
};

export const SyllableBuilder = () => {
    const [data, setData] = useState(mockData);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [overId, setOverId] = useState<string | null>(null);
    const [setErrors] = useState<Record<number, boolean>>({});
    const [setInputValues] = useState<Record<number, string>>({});
    const [status, setStatus] = useState<Status>("idle");
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const dropAnimation: DropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
        setOverId(null);
    };

    const handleDragMove = (event: DragMoveEvent) => {
        setOverId(event.over?.id as string || null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        setOverId(event.over?.id as string || null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveId(null);
        setOverId(null);

        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        if (activeId.startsWith('variant-') && overId.startsWith('slot-')) {
            const variantId = parseInt(activeId.replace('variant-', ''), 10);
            const slotId = parseInt(overId.replace('slot-', ''), 10);

            const variant = data.variants.find((v) => v.id === variantId);
            const slot = data.slots.find((s) => s.id === slotId);

            if (variant && slot && !slot.currentValue) {
                const updatedSlots = data.slots.map((s) =>
                    s.id === slotId ? { ...s, currentValue: variant.value } : s
                );

                setData((prev) => ({ ...prev, slots: updatedSlots }));
                setInputValues((prev) => ({
                    ...prev,
                    [slotId]: variant.value,
                }));
            }
        }
    };

    const handleDragCancel = () => {
        setActiveId(null);
        setOverId(null);
    };


    const handleCheckAnswer = () => {
        const newErrors: Record<number, boolean> = {};

        data.slots.forEach((slot) => {
            if (slot.currentValue !== slot.correctValue) {
                newErrors[slot.id] = true;
            }
        });

        setErrors(newErrors);

        const isCorrect = data.slots.every(
            (slot) => slot.currentValue === slot.correctValue
        );

        if (isCorrect) {
            setStatus("success")
        } else {
            setStatus("error");
        }
    };

    const handleReset = () => {
        setData(mockData);
        setActiveId(null);
        setOverId(null);
        setErrors({});
        setInputValues({});
        setStatus("idle");
    };

    const renderWord = () => {
        const parts = data.word.split(/(\{\{\d+\}\})/g);

        return parts.map((part, index) => {
            const match = part.match(/\{\{(\d+)\}\}/);
            if (match) {
                const slotId = parseInt(match[1], 10);
                const slot = data.slots.find((s) => s.slotNum === slotId);

                if (!slot) return <span key={`missing-${index}`}>{part}</span>;

                const isActiveSlot = activeId?.startsWith('variant-') && overId === `slot-${slot.id}`;

                return (
                    <DroppableSlot
                        key={`slot-${slot.id}`}
                        slot={slot}
                        isOver={isActiveSlot}
                        isDragging={!!activeId}
                    />
                );
            }
            return (
                <span key={`text-${index}`} className="SyllableBuilder__fixed-part">
                    {part}
                </span>
            );
        });
    };

    const allSlotsFilled = data.slots.every((slot) => slot.currentValue !== null);


    const getActiveVariant = () => {
        if (!activeId || !activeId.startsWith('variant-')) return null;
        const variantId = parseInt(activeId.replace('variant-', ''), 10);
        return data.variants.find((v) => v.id === variantId);
    };

    const activeVariant = getActiveVariant();

    return (
        <div className="SyllableBuilder">
            <div className="SyllableBuilder__inner">
                <div className="SyllableBuilder__header">
                    <h2>Составьте слово</h2>
                    <p className="SyllableBuilder__instructions">
                        Выберите правильный слог, чтобы составить слово
                    </p>
                    {status === "success" && <h1>Success</h1>}
                    {status === "error" && <h1>Error</h1>}
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragMove={handleDragMove}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    <div className="SyllableBuilder__word-display">
                        <div className="SyllableBuilder__table">
                            <div className="SyllableBuilder__table__inner">{renderWord()}</div>
                        </div>

                    </div>

                    <div className="SyllableBuilder__variants">
                        <h4>Выберите слог:</h4>
                        <div className="SyllableBuilder__variants-list">
                            {data.variants.map((variant) => (
                                <DraggableVariant
                                    key={variant.id}
                                    variant={variant}
                                    isDragging={activeId === `variant-${variant.id}`}
                                    disabled={allSlotsFilled}
                                />
                            ))}
                        </div>
                    </div>

                    <DragOverlay dropAnimation={dropAnimation}>
                        {activeVariant ? (
                            <div className="SyllableBuilderVariant SyllableBuilderVariant--dragging">
                                <span>{activeVariant.value}</span>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>

                <div className="SyllableBuilder__controls">
                    <Button
                        variant="primary"
                        className="SyllableBuilder__check-button"
                        onClick={handleCheckAnswer}
                        disabled={!allSlotsFilled}
                    >
                        check
                    </Button>
                    <Button variant="primary" className="SyllableBuilder__reset-button" onClick={handleReset}>
                        reset
                    </Button>
                </div>

            </div>
        </div>
    );
};