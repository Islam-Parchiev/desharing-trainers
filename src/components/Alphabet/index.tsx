import { useState } from 'react';
import { Button } from '../../shared/ui/Button';
import './styles.scss';
const data = [
    "а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й",
    "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф",
    "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"
]
export const Alphabet = () => {
    const [isOpen, setIsOpen] = useState(false);
    return <div className="Alphabet">
        <Button variant="primary" onClick={() => setIsOpen(!isOpen)}>Алфавит</Button>


        {isOpen && <div className='Alphabet__content'>
            <ul className='list-reset Alphabet__list'>
                {data.map(letter => <li className='Alphabet__item'>
                    {letter}
                </li>)}
            </ul>
        </div>}
    </div>
}