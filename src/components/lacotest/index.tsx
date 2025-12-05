import React, { useState, useRef, useEffect, useCallback } from 'react';
import './styles.scss';

const LineDragApp: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
    const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    // Рассчитываем длину и угол линии
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Начало перетаскивания
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setIsActive(true);

        if (divRef.current) {
            const rect = divRef.current.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            setLineStart({ x: startX, y: startY });
            setLineEnd({ x: e.clientX, y: e.clientY });
        }
    }, []);

    // Перемещение
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        setLineEnd({ x: e.clientX, y: e.clientY });
    }, [isDragging]);

    // Завершение перетаскивания
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <div className="container">
            {/* Начальная точка (div.laco) */}
            <div
                ref={divRef}
                className={`laco ${isDragging ? 'dragging' : ''}`}
                onMouseDown={handleMouseDown}
            />

            {/* Линия */}
            {isActive && (
                <div
                    className="line"
                    style={{
                        left: `${lineStart.x}px`,
                        top: `${lineStart.y}px`,
                        width: `${length}px`,
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: '0 0',
                    }}
                />
            )}

            {/* Конечная точка */}
            {isActive && (
                <div
                    className="line-end"
                    style={{
                        left: `${lineEnd.x - 10}px`,
                        top: `${lineEnd.y - 10}px`,
                    }}
                />
            )}

            <div className="instructions">
                Кликните и тяните синий круг чтобы создать линию
            </div>
        </div>
    );
};

export default LineDragApp;