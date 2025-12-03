import React, { useEffect, useState, useCallback } from 'react';

interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

interface Connection {
    fromId: string;
    toId: string;
    id: string;
}

interface SVGConnectorProps {
    connections: Connection[];
}

function SVGConnector({ connections }: SVGConnectorProps) {
    const [lines, setLines] = useState<Line[]>([]);

    // Функция обновления линий
    const updateLines = useCallback(() => {
        const newLines = connections.map(conn => {
            const startEl = document.querySelector(`[data-id="${conn.fromId}"]`);
            const endEl = document.querySelector(`[data-id="${conn.toId}"]`);

            if (!startEl || !endEl) return null;

            const startRect = startEl.getBoundingClientRect();
            const endRect = endEl.getBoundingClientRect();

            const scrollX = window.scrollX;
            const scrollY = window.scrollY;

            return {
                x1: startRect.right + scrollX,
                y1: startRect.top + startRect.height / 2 + scrollY,
                x2: endRect.left + scrollX,
                y2: endRect.top + endRect.height / 2 + scrollY,
            };
        }).filter((line): line is Line => line !== null);

        setLines(newLines);
    }, [connections]);

    useEffect(() => {
        updateLines();

        // Обновляем при изменении размера окна и прокрутке
        window.addEventListener('resize', updateLines);
        window.addEventListener('scroll', updateLines);

        return () => {
            window.removeEventListener('resize', updateLines);
            window.removeEventListener('scroll', updateLines);
        };
    }, [updateLines]);

    return (
        <svg
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 999,
            }}
        >
            {lines.map((line, index) => (
                <line
                    key={index}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                />
            ))}
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
            </defs>
        </svg>
    );
}

export default SVGConnector;