import { useState } from 'react';
import { Button } from '../../../shared/ui/Button';
import './styles.scss';
import { TicketWord } from './Word';
import type { Status } from '../../../types/types';

const mockData = {
    words: ["облака", "облаки", "облаку"],
    correctAnswer: "облака",
    sentence: "Белые {{1}} плывут по небу."
}

export const FixTicket = () => {
    const [data] = useState(mockData);
    const [selectedIndex, setSelectedIndex] = useState<number>(2);
    const [status, setStatus] = useState<Status>("idle");
    const [btndis, setBtnDis] = useState(true);
    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        if (status !== "idle") {
            setStatus("idle");
        }
    };

    const checkAnswer = () => {
        const selectedWord = data.words[selectedIndex];
        if (selectedWord === data.correctAnswer) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    };

    const renderSentence = () => {
        const { sentence, words } = data;
        const parts = sentence.split(/(\{\{\d+\}\})/);
        return parts.map((part, index) => {
            if (part.match(/\{\{\d+\}\}/)) {
                return (
                    <TicketWord
                        key={index}
                        words={words}
                        onSelect={handleSelect}
                        selectedIndex={selectedIndex}
                        handleClickBlot={() => setBtnDis(prev => !prev)}
                    />
                );
            }

            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className={`FixTicket FixTicket--${status}`}>
            {status === "error" && "error"}
            {status === "success" && "success"}

            <div className="FixTicket__inner">
                <div className="FixTicket__sentence">
                    {renderSentence()}
                </div>
            </div>

            <Button
                onClick={checkAnswer}
                disabled={status === "success" || btndis}
            >
                check
            </Button>

        </div>
    )
}