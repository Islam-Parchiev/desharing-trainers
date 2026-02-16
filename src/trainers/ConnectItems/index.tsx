import { ArcherContainer, ArcherElement } from 'react-archer'
import { TrainerTitle } from '../../components/TrainerTitle';
import './styles.scss';
import type { RelationType } from 'react-archer/lib/types';
import { useEffect, useState } from 'react';
import { Button } from '../../shared/ui/Button';
interface QuizItem {
    id: string;
    label: string;
    correct: string;
}

interface Category {
    id: string;
    label: string;
}

interface Connection {
    source: string;
    target: string;
}

const WORDS: QuizItem[] = [
    { id: 'w0', label: 'Яблоко', correct: 'cat-1' },
    { id: 'w1', label: 'Морковь', correct: 'cat-0' },
    { id: 'w2', label: 'Банан', correct: 'cat-1' },
    { id: 'w3', label: 'Картофель', correct: 'cat-0' },
];

const CATS: Category[] = [
    { id: 'cat-0', label: 'Овощи' },
    { id: 'cat-1', label: 'Фрукты' },
];

export const ConnectItems = () => {
    const [connections, setConnections] = useState<Connection[]>([]);
    const [activeSource, setActiveSource] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (activeSource) {
                setMousePos({ x: e.clientX, y: e.clientY });
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [activeSource]);

    const startConnection = (id: string): void => {
        if (connections.some((c) => c.source === id)) return;
        setActiveSource(id);
    };

    const endConnection = (catId: string): void => {
        if (activeSource) {
            setConnections((prev) => [...prev, { source: activeSource, target: catId }]);
            setActiveSource(null);
        }
    };

    const checkConnections = (): void => {
        if (connections.length !== WORDS.length) {
            alert('Пожалуйста, соедините все слова с категориями');
            return;
        }

        const allCorrect = connections.every((conn) => {
            const word = WORDS.find((w) => w.id === conn.source);
            return word && word.correct === conn.target;
        });

        if (allCorrect) {
            setIsSuccess(true);
        } else {
            alert('Некоторые связи неправильные. Попробуйте еще раз!');
        }
    };
    return (
        <div className='ConnectItems'>
            <TrainerTitle>Соедини слова с категорией</TrainerTitle>
            {isSuccess && <div className="success-message">Поздравляем! Все связи правильные!</div>}
            <ArcherContainer
                key={activeSource ? `drawing-${mousePos.x}-${mousePos.y}` : 'idle'}
                strokeColor="#4f46e5"
                strokeWidth={3}
                endShape={{ arrow: { arrowLength: 0 } }}
                offset={0}
            >

                <div className="ConnectItems__content" style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>
                    <div className="ConnectItems__column" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {WORDS.map((w) => {
                            const conn = connections.find((c) => c.source === w.id);
                            const isDragging = activeSource === w.id;

                            const relations: RelationType[] = [];

                            if (conn) {
                                relations.push({
                                    targetId: conn.target,
                                    targetAnchor: 'left',
                                    sourceAnchor: 'right',
                                    // lineStyle: 'polyline' делает линию прямой между точками
                                    style: { strokeColor: '#4f46e5', lineStyle: 'straight' },
                                });
                            } else if (isDragging) {
                                relations.push({
                                    targetId: 'mouse-pointer',
                                    targetAnchor: 'left',
                                    sourceAnchor: 'right',
                                    style: { strokeDasharray: '5,5', strokeColor: '#94a3b8', lineStyle: 'straight' },
                                });
                            }

                            return (
                                <ArcherElement key={w.id} id={w.id} relations={relations}>
                                    {/* <div
                                        onClick={() => startConnection(w.id)}
                                        className={`node ${conn ? 'connected' : ''} ${isDragging ? 'dragging' : ''}`}
                                        style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', cursor: 'pointer' }}
                                    >
                                        {w.label}
                                    </div> */}
                                    <Button variant="primary" onClick={() => startConnection(w.id)}>
                                        <div>

                                            {w.label}
                                        </div>

                                    </Button>
                                </ArcherElement>
                            );
                        })}
                    </div>
                    <div className="ConnectItems__column">
                        {CATS.map((c) => (
                            <ArcherElement key={c.id} id={c.id}>
                                <Button asChild variant="primary" onClick={() => endConnection(c.id)}>
                                    <div>

                                        {c.label}
                                    </div>
                                </Button>
                                {/* <div
                                    onClick={() => endConnection(c.id)}
                                    className="category"
                                    style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', cursor: 'pointer' }}
                                >
                                    {c.label}
                                </div> */}
                            </ArcherElement>
                        ))}
                    </div>
                </div>
                {activeSource && (
                    <ArcherElement id="mouse-pointer">
                        <div
                            style={{
                                position: 'fixed',
                                left: mousePos.x,
                                top: mousePos.y,
                                width: '1px',
                                height: '1px',
                                pointerEvents: 'none',
                            }}
                        />
                    </ArcherElement>
                )}
            </ArcherContainer>
            {connections.length > 0 && (
                <button className="reset-btn" onClick={() => setConnections([])}>
                    Сбросить
                </button>
            )}
            {connections.length === WORDS.length && (
                <button className="check-btn" onClick={checkConnections}>
                    Проверить
                </button>
            )}
        </div>
    )
}