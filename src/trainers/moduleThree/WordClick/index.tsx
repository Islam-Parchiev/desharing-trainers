import { useEffect, useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { Icon } from '../../../shared/ui/MoveBox';
import './styles.scss';
import type { WordClicker } from '../../../types/types';

interface WordClickerProps extends WordClicker {
    handleError: () => void;
    handleSuccess: () => void;
}

export const WordClick = ({ correctValues, text, title, handleError, handleSuccess }: WordClickerProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    // const [incorrect, setIncorret] = useState<string[]>([])
    const splittedSentence = text.split(' ');

    const onWordClick = (word: string) => {
        if (correctValues.includes(word)) {
            setSelected(prev => [...prev, word])
        } else {
            handleError();
            setSelected(prev => [...prev, word])
            setTimeout(() => {

                reset()
            }, 1000)
        }

    }

    const handleClass = (word: string) => {
        if (selected.includes(word) && correctValues.includes(word)) {
            return 'WordClick__word--selected';
        }
        if (selected.includes(word) && !correctValues.includes(word)) {
            return "WordClick__word--error"
        }
        return '';
    }

    const reset = () => {
        setSelected([])
    }
    const check = () => {
        if (selected.length === correctValues.length) {
            handleSuccess();
        }
    }
    useEffect(() => {
        check()
    }, [selected])
    return (
        <div className='WordClick'>
            <div className="WordClick__inner">
                <TrainerTitle>{title}</TrainerTitle>
                <div className="WordClick__main">
                    <div className="WordClick__content">
                        <button className='btn-reset'><Icon /></button>
                        <div className="WordClick__words">
                            {splittedSentence.map((word, index) => (
                                <span
                                    key={index}
                                    className={`WordClick__word ${handleClass(word)}`}
                                    onClick={() => onWordClick(word)}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <Button onClick={handleCheck}> Check</Button> */}
            </div>
        </div>
    )
}