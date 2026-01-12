import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { Icon } from '../../../shared/ui/MoveBox';
import './styles.scss';

const mockData = {
    sentence: 'Учёба и труд рядом идут.',
    title: 'Нажми на слова в которых ВСЕ согласные ТВЕРДЫЕ',
    correctValues: ['труд', 'идут']
}

export const WordClick = () => {
    const [data, setData] = useState(mockData);
    const [selected, setSelected] = useState<string[]>([]);
    const splittedSentence = data.sentence.split(' ');

    const onWordClick = (word: string) => {
        if (data.correctValues.includes(word)) {
            setSelected(prev => [...prev, word])
        }
    }

    const handleClass = (word: string) => {
        if (selected.includes(word)) {
            return 'WordClick__word--selected';
        }
        return '';
    }

    return (
        <div className='WordClick'>
            <div className="WordClick__inner">
                <TrainerTitle>{data.title}</TrainerTitle>

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
            </div>
        </div>
    )
}