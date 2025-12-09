import { useState, useMemo } from "react";
import './styles.scss';

interface TicketWordProps {
    words: string[];
    itemHeight?: number;
    selectedIndex: number;
    onSelect: (index: number) => void;
}

export const TicketWord = ({
    words,
    itemHeight = 25,
    selectedIndex,
    onSelect
}: TicketWordProps) => {
    // Состояние для отслеживания, скрыт ли blot
    const [isBlotHidden, setIsBlotHidden] = useState(false);

    const onClickWord = () => {
        // Если blot еще не скрыт, игнорируем клик
        if (!isBlotHidden) return;

        const nextIndex = selectedIndex >= words.length - 1 ? 0 : selectedIndex + 1;
        onSelect(nextIndex);
    };

    // Обработчик клика по blot
    const handleBlotClick = (e: React.MouseEvent) => {
        // Останавливаем всплытие, чтобы не сработал onClickWord
        e.stopPropagation();
        // Скрываем blot
        setIsBlotHidden(true);
    };

    const boxStyle = useMemo(() => ({
        transform: `translateY(-${selectedIndex * itemHeight}px)`,
        transition: 'transform 0.3s ease-in-out'
    }), [selectedIndex, itemHeight]);

    return (
        <div className="TicketWord" onClick={onClickWord} role="button" tabIndex={0}
            style={{ maxHeight: itemHeight + "px" }}>
            <div className="TicketWord__window" style={boxStyle}>
                {words.map((word, index) => (
                    <span key={`${word}-${index}`} className="TicketWord__item">
                        {word}
                    </span>
                ))}
            </div>

            {/* Blot - только если не скрыт */}
            {!isBlotHidden && (
                <div
                    className="TicketWord__blot"
                    onClick={handleBlotClick}
                    role="button"
                    tabIndex={0}
                    title="Click to reveal words"
                />
            )}
        </div>
    );
};