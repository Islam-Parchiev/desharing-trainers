import { ArcherContainer, ArcherElement } from 'react-archer'
import { TrainerTitle } from '../../components/TrainerTitle';
import './styles.scss';
import type { RelationType } from 'react-archer/lib/types';
import { useEffect, useState } from 'react';
import { Button } from '../../shared/ui/Button';
interface QuizItem {
    id: string;
    label: string;
    correctCategory: string;
}

interface Category {
    id: string;
    name: string;
    label: string;
}

interface Connection {
    source: string;
    target: string;
}

const WORDS: QuizItem[] = [
    { id: 'w0', label: 'Яблоко', correctCategory: 'Fruits' },
    { id: 'w1', label: 'Морковь', correctCategory: 'Vegetables' },
    { id: 'w2', label: 'Банан', correctCategory: 'Fruits' },
    { id: 'w3', label: 'Картофель', correctCategory: 'Vegetables' },
];

const CATS: Category[] = [
    { id: 'cat-0', name: "Vegetables", label: 'Овощи' },
    { id: 'cat-1', name: "Fruits", label: 'Фрукты' },
];

export const ConnectItems = () => {
    const [connections, setConnections] = useState<Connection[]>([]);
    const [activeSource, setActiveSource] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (activeSource) setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [activeSource]);

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            if (!activeSource) return;
            const target = e.target as HTMLElement;
            if (!target.closest('[data-name="test-end"]') && !target.closest('.ConnectItems__column')) {
                setActiveSource(null);
            }
        };
        window.addEventListener('mousedown', handleGlobalClick);
        return () => window.removeEventListener('mousedown', handleGlobalClick);
    }, [activeSource]);

    const startConnection = (e: React.MouseEvent, id: string): void => {
        if (connections.some((c) => c.source === id)) return;
        setMousePos({ x: e.clientX, y: e.clientY });
        setActiveSource(id);
    };

    const endConnection = (catId: string): void => {
        if (activeSource) {
            setConnections((prev) => [...prev.filter(c => c.source !== activeSource), { source: activeSource, target: catId }]);
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
            const category = CATS.find((c) => c.id === conn.target);
            return word && category && word.correctCategory === category.name;
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

            <ArcherContainer strokeColor="#4f46e5" strokeWidth={3} endShape={{ arrow: { arrowLength: 0 } }} offset={0}>
                <div className="ConnectItems__content" style={{ display: 'flex', justifyContent: 'space-between', padding: '50px' }}>

                    <div className="ConnectItems__column" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {WORDS.map((w) => {
                            const conn = connections.find((c) => c.source === w.id);
                            const isDragging = activeSource === w.id;
                            const relations: RelationType[] = [];

                            if (conn) {
                                relations.push({
                                    targetId: conn.target,
                                    targetAnchor: 'left',
                                    sourceAnchor: 'right',
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
                                    <Button variant={conn ? "secondary" : "primary"} onClick={(e) => startConnection(e, w.id)}>
                                        {w.label}
                                    </Button>
                                </ArcherElement>
                            );
                        })}
                    </div>

                    <div className="ConnectItems__column" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {CATS.map((c) => (
                            <ArcherElement key={c.id} id={c.id}>
                                <Button variant="primary" onClick={() => endConnection(c.id)} data-name="test-end">
                                    {c.label}
                                </Button>
                            </ArcherElement>
                        ))}
                    </div>
                </div>

                {activeSource && (
                    <ArcherElement id="mouse-pointer">
                        <div style={{ position: 'fixed', left: mousePos.x, top: mousePos.y, width: '1px', height: '1px', pointerEvents: 'none' }} />
                    </ArcherElement>
                )}
            </ArcherContainer>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {connections.length > 0 && (
                    <button className="reset-btn" onClick={() => { setConnections([]); setIsSuccess(false); }}>Сбросить</button>
                )}
                {connections.length === WORDS.length && !isSuccess && (
                    <button className="check-btn" onClick={checkConnections}>Проверить</button>
                )}
            </div>
        </div>
    );
};