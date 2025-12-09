import { useState } from 'react';
import { Button } from '../../../shared/ui/Button';
import './styles.scss';
import { TicketWord } from './Word';
import type { Status } from '../../../types/types';

export const FixTicket = () => {
    const words = ["облака", "облаки", "облаку"];
    const correctAnswer = "облака";
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [status, setStatus] = useState<Status>("idle");
    const handleSelect = (index: number) => {
        setSelectedIndex(index);
    };

    const checkAnswer = () => {
        const selectedWord = words[selectedIndex];
        if (selectedWord === correctAnswer) {
            setStatus("success");
            return;
        } else {
            setStatus("error");
            return;
        }
    };
    return (
        <div className="FixTicket">
            {status === "error" && "Error"}
            {status === "success" && "Success"}
            <div className="FixTicket__inner">
                <div className="FixTicket__sentence">
                    <span>Белые</span> <TicketWord words={["облака", "облаки", "облаку"]} onSelect={handleSelect} selectedIndex={selectedIndex} /> <span>плывут по небу.</span>
                </div>
            </div>
            <Button onClick={checkAnswer}>check</Button>
        </div>
    )
}