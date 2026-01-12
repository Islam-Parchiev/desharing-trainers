import { useEffect, useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import './styles.scss';
import type { Id, Status } from '../../../types/types';
import { RiddleSlot } from './Slot';
import { RiddleLetter } from './Letter';

export const SolveRiddle = () => {
    const [tasks, setTasks] = useState<{ id: Id; currentValue: string | null; correctValue: string; description: string; letters: string[]; }[]>([{
        id: 1,
        correctValue: 'а',
        currentValue: null,
        description: 'Эта буква первая в алфавите',
        letters: ['ж', 'з', 'я', 'ф', 'а', 'ц', 'й', 'г', 'о']
    },
    {
        id: 2,
        correctValue: 'б',
        currentValue: null,
        description: 'С этой буквы начинается слово "бабочка"',
        letters: ['б', 'п', 'в', 'д', 'к', 'т', 'м', 'н', 'р']
    },
    {
        id: 3,
        correctValue: 'в',
        currentValue: null,
        description: 'Третья буква русского алфавита',
        letters: ['ф', 'в', 'ш', 'щ', 'ч', 'ц', 'х', 'ъ', 'ы']
    },
    {
        id: 4,
        correctValue: 'г',
        currentValue: null,
        description: 'С этой буквы начинается город "Гомель"',
        letters: ['г', 'к', 'х', 'ж', 'з', 'с', 'ц', 'ч', 'ш']
    },
    {
        id: 5,
        correctValue: 'д',
        currentValue: null,
        description: 'Обозначает звук [д] в словах',
        letters: ['т', 'д', 'п', 'б', 'ж', 'з', 'с', 'ц', 'ч']
    },
    {
        id: 6,
        correctValue: 'е',
        currentValue: null,
        description: 'Гласная буква, стоит после "д"',
        letters: ['ё', 'е', 'э', 'ю', 'я', 'и', 'ы', 'а', 'о']
    }])
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [status, setStatus] = useState<Status>("idle");
    const currentTask = tasks[currentTaskIndex];

    const isEnd = () => {
        return currentTaskIndex >= tasks.length;
    };

    const handleNext = () => {
        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex(prev => prev + 1);
            setStatus("idle");
        } else {
            setStatus("finish");
        }
    };

    const handleLetterClick = (letter: string) => {
        if (status === "success" || isEnd()) return;

        if (currentTask.correctValue === letter) {
            setTasks(prevTasks =>
                prevTasks.map((task, index) =>
                    index === currentTaskIndex
                        ? { ...task, currentValue: letter }
                        : task
                )
            );
            setStatus("success");
            setTimeout(() => {
                handleNext();
            }, 500);
        } else {
            setStatus("error");
            setTimeout(() => {
                setStatus("idle");
            }, 1000);
        }
    };

    useEffect(() => {
        const allCompleted = tasks.every(task => task.currentValue !== null);
        if (allCompleted && tasks.length > 0) {
            setTimeout(() => {

                setStatus("finish");
            }, 1000);
        }
    }, [tasks]);

    return <div className='SolveRiddle'>
        <TrainerTitle>Разгадай загадку</TrainerTitle>

        {status === "finish" && "Finish"}

        {!isEnd() && status !== "finish" && (
            <>
                {status === "error" && "Error"}
                <h3>Нажми на букву которую описывают</h3>
                <div className="Clue">
                    <span>{currentTask.description}</span>
                </div>

                <div className="SolveRiddle__content">
                    <div className="SolveRiddle__slots">
                        {tasks.map(task => <RiddleSlot currentValue={task.currentValue} key={`riddle-slot-${task.id}`} />)}
                    </div>
                    <div className="SolveRiddle__letters">
                        {currentTask.letters.map(letter => <RiddleLetter handleClick={() => handleLetterClick(letter)} value={letter} key={`riddle-letter-${letter}`} />)}
                    </div>
                </div>
            </>
        )}
    </div>
}