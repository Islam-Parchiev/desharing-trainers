import { useState } from "react";
import { WordByImage, type ILetter } from "../trainers/WordByImage"

export const Three = () => {
    const [letters, setLetters] = useState<ILetter[]>([
        { id: 1, letter: "г" },
        { id: 2, letter: "а" },
        { id: 3, letter: "о" },
        { id: 4, letter: "р" },
        { id: 5, letter: "т" },
        { id: 6, letter: "д" },
        { id: 7, letter: "о" }
    ]);
    return (
        <main className="Page">
            <WordByImage availableLetters={letters} correctAnswer="город" id="1" imageUrl="/citt.jpg" isLoading={false} slotsCount={5} key={"test-1"} />
        </main>
    )
}