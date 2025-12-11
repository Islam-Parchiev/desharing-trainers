import React, { useState, useRef, useEffect, useCallback } from 'react';
import './styles.scss';

interface Point {
    id: number;
    x: number;
    y: number;
}

const LineDragApp: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
    const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);
    const [connectedTarget, setConnectedTarget] = useState<Point | null>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Целевые точки для соединения (оставляем только две)
    const [targetPoints] = useState<Point[]>([
        { id: 1, x: 400, y: 200 },
        { id: 2, x: 600, y: 300 },
    ]);

    // Радиус примагничивания (в пикселях)
    const SNAP_RADIUS = 30;

    // Рассчитываем длину и угол линии
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    // Функция для проверки близости к целевой точке
    const getNearestTarget = useCallback((x: number, y: number): Point | null => {
        for (const target of targetPoints) {
            const distance = Math.sqrt(
                Math.pow(x - target.x, 2) + Math.pow(y - target.y, 2)
            );
            if (distance <= SNAP_RADIUS) {
                return target;
            }
        }
        return null;
    }, [targetPoints]);

    // Начало перетаскивания
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setIsActive(true);
        setConnectedTarget(null); // Сбрасываем соединение при начале перетаскивания

        if (divRef.current && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const rect = divRef.current.getBoundingClientRect();

            // Вычисляем центр круга относительно контейнера
            const startX = rect.left - containerRect.left + rect.width / 2;
            const startY = rect.top - containerRect.top + rect.height / 2;

            setLineStart({ x: startX, y: startY });
            setLineEnd({ x: startX, y: startY });
        }
    }, []);

    // Перемещение
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();

        // Вычисляем координаты относительно контейнера
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        // Проверяем, находимся ли рядом с целевой точкой
        const nearestTarget = getNearestTarget(x, y);

        if (nearestTarget) {
            // Примагничиваемся к целевой точке
            setLineEnd({ x: nearestTarget.x, y: nearestTarget.y });
            setConnectedTarget(nearestTarget);
        } else {
            // Используем текущие координаты мыши
            setLineEnd({ x, y });
            setConnectedTarget(null);
        }
    }, [isDragging, getNearestTarget]);

    // Завершение перетаскивания
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);

        // Если соединение установлено, фиксируем линию
        if (connectedTarget) {
            // Линия останется соединенной с целевой точкой
            console.log(`Соединено с точкой ${connectedTarget.id}`);
        }
    }, [connectedTarget]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={containerRef}
            className="container"
        >
            {/* Начальная точка (div.laco) */}
            <div
                ref={divRef}
                className={`laco ${isDragging ? 'dragging' : ''}`}
                onMouseDown={handleMouseDown}
            />

            {/* Целевые точки для соединения */}
            {targetPoints.map(point => (
                <div
                    key={point.id}
                    className={`target-point ${connectedTarget?.id === point.id ? 'connected' : ''}`}
                    style={{
                        left: `${point.x - 10}px`,
                        top: `${point.y - 10}px`,
                    }}
                    title={`Точка ${point.id}`}
                />
            ))}

            {/* Линия */}
            {isActive && (
                <div
                    className={`line ${connectedTarget ? 'connected' : ''}`}
                    style={{
                        left: `${lineStart.x}px`,
                        top: `${lineStart.y}px`,
                        width: `${length}px`,
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: '0 0',
                    }}
                />
            )}

            {/* Конечная точка (отображается только если не соединена) */}
            {isActive && !connectedTarget && (
                <div
                    className="line-end"
                    style={{
                        left: `${lineEnd.x - 10}px`,
                        top: `${lineEnd.y - 10}px`,
                    }}
                />
            )}

            {/* Индикатор соединения */}
            {connectedTarget && (
                <div className="connection-indicator">
                    Соединено с точкой {connectedTarget.id}
                </div>
            )}

        </div>
    );
};

export default LineDragApp;