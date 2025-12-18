/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import type { Id } from '../../types/types';

// 1. Компонент Pin (Точка)
const Pin = ({ id, x, y }: any) => {
    const updateXarrow = useXarrow(); // Хук для обновления линий
    const [position, setPosition] = useState({ x, y });

    const handleDrag = (e: any) => {
        // Простая логика перетаскивания для примера
        if (e.buttons === 1) {
            setPosition({ x: e.clientX, y: e.clientY });
            updateXarrow(); // Критически важно: обновляем линии при движении
        }
    };

    return (
        <div
            id={id}
            onMouseMove={handleDrag}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                cursor: 'grab',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
            }}
        />
    );
};

// 2. Компонент Lace (Линия) - это просто обертка вокруг Xarrow
const Lace = ({ fromId, toId }: any) => {
    return (
        <Xarrow
            start={fromId} // ID начального Pin
            end={toId}     // ID конечного Pin
            color="#94a3b8"
            strokeWidth={2}
            showHead={false} // Прячем стрелку, получаем просто линию
            path="straight"  // Прямая линия. Используйте "smooth" для изогнутой.
        />
    );
};

// 3. Основной компонент приложения
export default function LaceApp() {
    const [connections] = useState<{ id: Id; from: Id; to: Id; }[]>([]);
    // const startPinRef = useRef(null);

    // Функция для начала создания связи
    // const handlePinMouseDown = (pinId) => {
    //     startPinRef.current = pinId;
    // };

    // // Функция для завершения создания связи
    // const handlePinMouseUp = (endPinId) => {
    //     if (startPinRef.current && startPinRef.current !== endPinId) {
    //         // Добавляем новую связь в массив
    //         setConnections([...connections, {
    //             id: `conn_${connections.length}`,
    //             from: startPinRef.current,
    //             to: endPinId
    //         }]);
    //     }
    //     startPinRef.current = null;
    // };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Xwrapper> {/* 4. Обязательно оборачиваем в Xwrapper */}
                {/* Создаем точки */}
                <Pin id="pin1" x={100} y={100} />
                <Pin id="pin2" x={300} y={200} />
                <Pin id="pin3" x={200} y={300} />

                {/* Рисуем все существующие связи */}
                {connections.map(conn => (
                    <Lace key={conn.id} fromId={conn.from} toId={conn.to} />
                ))}

                {/* Пример статической связи для демонстрации */}
                <Lace fromId="pin1" toId="pin3" />
            </Xwrapper>

            <div style={{ position: 'absolute', top: 20, left: 20, background: 'white', padding: '10px' }}>
                <p>Нажмите на точку и перетащите к другой, чтобы создать связь.</p>
                <p>Активных связей: {connections.length}</p>
            </div>
        </div>
    );
}