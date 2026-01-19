import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { Button } from '../../../shared/ui/Button';
import type { Status } from '../../../types/types';
import './styles.scss';

type DataType = {
    id: number;
    content: string;
    correctColor: string;
};

export interface Tool {
    type: "paint" | "erase";
    toolColor?: string;
    toolName: string;
}

interface ColorWordsProps {
    tools: Tool[];
    data: DataType[];
    handleSuccess?: () => void;
    handleError?: () => void;
    title: string;
}

interface WordState extends DataType {
    color: string | null;
}

export const ColorWords = ({ data, tools, title, handleError, handleSuccess }: ColorWordsProps) => {
    const [selectedTool, setSelectedTool] = useState<Tool>(tools[0]);
    const [status, setStatus] = useState<Status>("idle");
    const [words, setWords] = useState<WordState[]>(data.map(item => ({
        ...item,
        color: null
    })));

    const handleWordClick = (wordId: number) => {
        setWords(words.map(word => {
            if (word.id === wordId) {
                if (selectedTool.type === 'erase') {
                    return {
                        ...word,
                        color: null
                    };
                } else {
                    return {
                        ...word,
                        color: selectedTool.toolColor || null
                    };
                }
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
            handleSuccess?.();
            return;
        } else {
            setStatus("error");
            handleError?.();
        }
    };

    return (
        <div className='ColorWords'>
            <div className="ColorWords__inner">
                <TrainerTitle>{title}</TrainerTitle>
                {status === "error" && "Error"}
                {status === "success" && "Success"}
                <div className="ColorWords__tools">
                    {tools.map(tool => {
                        if (tool.type === 'paint') {
                            return (
                                <Button
                                    key={tool.toolName}
                                    size="medium"
                                    className={`ColorWords__tool ${selectedTool.toolName === tool.toolName ? 'ColorWords__tool--active' : ''}`}
                                    onClick={() => setSelectedTool(tool)}
                                >
                                    <i style={{ backgroundColor: tool.toolColor }} />{tool.toolName}
                                </Button>
                            );
                        } else {
                            return (
                                <Button
                                    key={tool.toolName}
                                    size="medium"
                                    className={`ColorWords__tool ${selectedTool.toolName === tool.toolName ? 'ColorWords__tool--active' : ''}`}
                                    onClick={() => setSelectedTool(tool)}
                                >
                                    {tool.toolName}
                                </Button>
                            );
                        }
                    })}
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
                        Проверить
                    </Button>
                </div>
                <div className="ColorWords__content">
                    {words.map((word) => (
                        <div
                            key={word.id}
                            className={`ColorWord`}
                            onClick={() => handleWordClick(word.id)}
                            style={{
                                backgroundColor: word.color || "#fff",

                            }}
                        >
                            <span>{word.content}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};