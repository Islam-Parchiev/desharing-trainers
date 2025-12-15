import { useState, useMemo } from "react";
import './styles.scss';

interface TicketWordProps {
    words: string[];
    itemHeight?: number;
    selectedIndex: number;
    onSelect: (index: number) => void;
    handleClickBlot?: () => void;
}

export const TicketWord = ({
    words,
    itemHeight = 25,
    selectedIndex,
    onSelect,
    handleClickBlot
}: TicketWordProps) => {
    const [isBlotHidden, setIsBlotHidden] = useState(false);

    const onClickWord = () => {
        if (!isBlotHidden) return;

        const nextIndex = selectedIndex >= words.length - 1 ? 0 : selectedIndex + 1;
        onSelect(nextIndex);
    };

    const handleBlotClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsBlotHidden(true);
        if (handleClickBlot) {
            handleClickBlot();
        }
        return
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