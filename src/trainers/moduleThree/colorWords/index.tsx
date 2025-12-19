import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { Button } from '../../../shared/ui/Button';
import './styles.scss';
import type { Status } from '../../../types/types';

type WordType = {
    id: number;
    text: string;
    color: 'blue' | 'red' | null;
    correctColor: string;
};

export const ColorWords = () => {
    const [selectedTool, setSelectedTool] = useState<'blue' | 'red' | 'erase'>('blue');
    const [status, setStatus] = useState<Status>("idle");
    const [words, setWords] = useState<WordType[]>([
        { id: 1, text: 'Кошка', color: null, correctColor: 'blue' },
        { id: 2, text: 'Стол', color: null, correctColor: 'red' },
        { id: 3, text: 'Собака', color: null, correctColor: 'blue' },
        { id: 4, text: 'Солнце', color: null, correctColor: 'red' },
        { id: 5, text: 'Учитель', color: null, correctColor: 'blue' },
        { id: 6, text: 'Книга', color: null, correctColor: 'red' },
        { id: 7, text: 'Птица', color: null, correctColor: 'blue' },
        { id: 8, text: 'Дождь', color: null, correctColor: 'red' },
        { id: 9, text: 'Ребёнок', color: null, correctColor: 'blue' },
    ]);

    const handleWordClick = (wordId: number) => {
        setWords(words.map(word => {
            if (word.id === wordId) {
                return {
                    ...word,
                    color: selectedTool === 'erase' ? null : selectedTool
                };
            }
            return word;
        }));
    };

    const handleReset = () => {
        setWords(words.map(word => ({ ...word, color: null })));
        setStatus("idle");
    };
    const handleCheck = () => {
        if (words.every(word => word.color === word.correctColor)) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    }
    return (
        <div className='ColorWords'>
            <div className="ColorWords__inner">
                <TrainerTitle>Раскрась слова</TrainerTitle>
                {status === "error" && "Error"}
                {status === "success" && "Success"}
                <div className="ColorWords__tools">
                    <Button
                        size="medium"
                        className={`ColorWords__tool ColorWords__tool--blue ${selectedTool === 'blue' ? 'ColorWords__tool--active' : ''}`}
                        onClick={() => setSelectedTool('blue')}
                    >
                        <i />Люди и животные
                    </Button>
                    <Button
                        size="medium"
                        className={`ColorWords__tool ColorWords__tool--red ${selectedTool === 'red' ? 'ColorWords__tool--active' : ''}`}
                        onClick={() => setSelectedTool('red')}
                    >
                        <i />Неживые предметы и явления
                    </Button>
                    <Button
                        size="medium"
                        className={`ColorWords__tool ${selectedTool === 'erase' ? 'ColorWords__tool--active' : ''}`}
                        onClick={() => setSelectedTool('erase')}
                    >
                        Стереть
                    </Button>
                    <Button
                        size="medium"
                        onClick={handleReset}
                    >
                        Сбросить всё
                    </Button>
                    <Button
                        size="medium"
                        onClick={handleCheck}
                    >
                        check
                    </Button>

                </div>
                <div className="ColorWords__content">
                    {words.map((word) => (
                        <div
                            key={word.id}
                            className={`ColorWord ${word.color ? `ColorWord--${word.color}` : ''}`}
                            onClick={() => handleWordClick(word.id)}
                        >
                            <span>{word.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};