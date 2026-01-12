import { useState } from 'react';
import SVGArrow from '../../../components/Arrow';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { Letter } from './letter';
import './styles.scss';
import type { Status } from '../../../types/types';
import { Button } from '../../../shared/ui/Button';

const mock = [
    {
        id: 1,
        coordinates: { x: 50, y: 50 },
        letter: 'а',
        nextConnectLetter: 'б',
        start: true,
        end: false,
    },
    {
        id: 2,
        coordinates: { x: 250, y: 150 },
        letter: 'б',
        nextConnectLetter: 'в',
        start: false,
        end: false,
    },
    {
        id: 3,
        coordinates: { x: 370, y: 320 },
        letter: 'в',
        nextConnectLetter: 'г',
        start: false,
        end: false,
    },
    {
        id: 4,
        coordinates: { x: 490, y: 200 },
        letter: 'г',
        nextConnectLetter: 'д',
        start: false,
        end: false,
    },
    {
        id: 5,
        coordinates: { x: 620, y: 90 },
        letter: 'д',
        nextConnectLetter: 'е',
        start: false,
        end: false,
    },

    {
        id: 6,
        coordinates: { x: 750, y: 180 },
        letter: 'е',
        nextConnectLetter: 'ё',
        start: false,
        end: false,
    },
    {
        id: 9,
        coordinates: { x: 720, y: 420 },
        letter: 'ё',
        nextConnectLetter: 'ж',
        start: false,
        end: false,
    },
    {
        id: 7,
        coordinates: { x: 850, y: 300 },
        letter: 'ж',
        nextConnectLetter: 'з',
        start: false,
        end: false,
    },
    {
        id: 8,
        coordinates: { x: 950, y: 420 },
        letter: 'з',
        nextConnectLetter: null,
        start: false,
        end: true,
    }
];

export const ConnectLetters = () => {
    const [letters] = useState(mock);
    const [selectedLetter, setSelectedLetter] = useState<typeof mock[0] | null>(() => {
        return mock.find((letter) => letter.start) || null;
    });
    const [connections, setConnections] = useState<Array<{
        from: { x: number; y: number };
        to: { x: number; y: number };
    }>>([]);
    const [status, setStatus] = useState<Status>("idle");

    const handleLetterClick = (letter: typeof mock[0]) => {
        if (status === 'finish') return;
        if (letter.start && !selectedLetter) {
            setSelectedLetter(letter);
            return;
        }

        if (selectedLetter?.id === letter.id) return;

        if (selectedLetter && selectedLetter.nextConnectLetter === letter.letter) {
            const newConnection = {
                from: selectedLetter.coordinates,
                to: letter.coordinates,
            };

            setConnections([...connections, newConnection]);

            if (letter.end) {
                setStatus("finish");
                setSelectedLetter(null);
            } else {
                setSelectedLetter(letter);
            }
        } else {
            setStatus('error');
            console.log('error');
        }
    };

    const resetGame = () => {
        setSelectedLetter(mock.find((letter) => letter.start) || null);
        setConnections([]);
        setStatus("idle");
    };

    return (
        <div className="ConnectLetters">
            <TrainerTitle>Соединяй буквы в алфавитном порядке</TrainerTitle>
            {status === "error" && "Error"}
            {status === "finish" && (
                <div className="completion-message">
                    Success
                </div>
            )}

            <Button variant="secondary" size="small" onClick={resetGame} style={{ marginTop: '20px' }}>
                Reset
            </Button>

            <div className="ConnectLetters__area" style={{ position: 'relative' }}>
                {connections.map((connection, index) => (
                    <SVGArrow
                        key={`connection-${index}`}
                        start={connection.from}
                        end={connection.to}
                        color="#198261"
                        strokeWidth={3}
                        arrowSize={10}
                    />
                ))}

                {letters.map((letter) => (
                    <Letter
                        key={`letter-connect-${letter.id}-${letter.letter}`}
                        selected={selectedLetter?.id === letter.id}
                        completed={connections.some(
                            (conn) =>
                                conn.from.x === letter.coordinates.x &&
                                conn.from.y === letter.coordinates.y
                        )}
                        content={letter.letter}
                        coordinates={{ x: letter.coordinates.x, y: letter.coordinates.y }}
                        onClick={() => handleLetterClick(letter)}
                        disabled={status === "finish"}
                    />
                ))}
            </div>

        </div>
    );
};