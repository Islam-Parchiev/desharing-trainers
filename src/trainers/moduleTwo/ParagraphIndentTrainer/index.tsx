import { useState } from 'react';
import './styles.scss';
import { Button } from '../../../shared/ui/Button';
import type { Status } from '../../../types/types';
import { TrainerTitle } from '../../../components/TrainerTitle';

interface TextLine {
    content: string;
    redLine: boolean;
    active: boolean;
}


// придумать как можно делить текст на строки
const INITIAL_LINES: TextLine[] = [
    { content: "Однажды Петя пошёл гулять. Погода", redLine: true, active: false },
    { content: "была хорошая. Грело солнце.", redLine: false, active: false },
    { content: "Вдруг Петя услышал какой-то писк. Инте - ", redLine: true, active: false },
    { content: "ресно, кто пищит?", redLine: false, active: false },
    { content: "Тут из-за куста выбежал маленький котё-", redLine: true, active: false },
    { content: "нок. Так вот кто пищит!", redLine: false, active: false }
];

export const ParagraphIndentTrainer = () => {
    const [lines, setLines] = useState<TextLine[]>(INITIAL_LINES);
    const [status, setStatus] = useState<Status>("idle");
    const toggleLine = (index: number) => {
        setLines(prev => prev.map((line, i) =>
            i === index ? { ...line, active: !line.active } : line
        ));
    };
    const handleCheck = () => {
        if (lines.every(line => line.active === line.redLine)) {
            setStatus("success");
            return;
        } else {
            setStatus("error");
            return;
        }
    }
    return (
        <>
            <TrainerTitle>Каждая часть текста должна начинаться с красной строки</TrainerTitle>
            {status === "success" && "Success"}
            {status === "error" && "Error"}
            <div className='ParagraphIndentTrainer'>
                <div className="ParagraphIndentTrainer__inner">
                    <div className="ParagraphIndentTrainer__text">
                        {lines.map((line, index) => (
                            <div
                                key={index}
                                className={`ParagraphIndentTrainer__line ${line.active ? "active" : ""}`}
                                onClick={() => toggleLine(index)}
                            >
                                <span>{line.content}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Button variant="primary" onClick={handleCheck}>check</Button>
        </>
    );
};