import { useState } from 'react';
import SVGArrow from '../../../components/Arrow';
import { TrainerTitle } from '../../../components/TrainerTitle';
import { Letter } from './letter';
import './styles.scss';
export const ConnectLetters = () => {
    const [start, setStart] = useState({ x: 50, y: 50 });
    const [end, setEnd] = useState({ x: 200, y: 150 });
    return <div className='ConnectLetters'>
        <TrainerTitle>Соединяй буквы в алфавитном порядке</TrainerTitle>
        <div className="ConnectLetters__area" style={{ position: 'relative' }}>
            {/* <Letter selected={true} content='a' coordinates={{ x: 50, y: 50 }} />
            <Letter selected={false} content='б' coordinates={{ x: 300, y: 172 }} /> */}
            <SVGArrow start={start}
                end={end}
                color="#3b82f6"
                strokeWidth={3}
                arrowSize={10} />

            <div
                style={{
                    position: 'absolute',
                    left: start.x - 10,
                    top: start.y - 10,
                    width: 20,
                    height: 20,
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                }}
            />

            {/* Конечная точка (для демонстрации) */}
            <div
                style={{
                    position: 'absolute',
                    left: end.x - 10,
                    top: end.y - 10,
                    width: 20,
                    height: 20,
                    backgroundColor: '#ef4444',
                    borderRadius: '50%',
                }}
            />
        </div>
    </div>
}