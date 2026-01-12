
const SVGArrow = ({
    start = { x: 0, y: 0 },
    end = { x: 100, y: 100 },
    color = '#000',
    strokeWidth = 2,
    arrowSize = 8,
    className = ''
}) => {
    // Рассчитываем угол поворота стрелки
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    // Укорачиваем линию для стрелки
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;
    const shortenedEnd = {
        x: end.x - unitX * arrowSize * 1.5,
        y: end.y - unitY * arrowSize * 1.5
    };

    return (
        <svg
            className={className}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                overflow: 'visible'
            }}
        >
            {/* Линия */}
            <line
                x1={start.x}
                y1={start.y}
                x2={shortenedEnd.x}
                y2={shortenedEnd.y}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />

            {/* Стрелка */}
            <polygon
                points={`0,${-arrowSize / 2} ${arrowSize * 2},0 0,${arrowSize / 2}`}
                fill={color}
                transform={`translate(${end.x - 15},${end.y - 4}) rotate(${angle + 3})`}
            />
        </svg>
    );
};

export default SVGArrow;