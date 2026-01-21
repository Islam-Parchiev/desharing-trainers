import { useState } from 'react';
import { TrainerTitle } from '../../../components/TrainerTitle';
import './styles.scss';
import { WordWithMistake } from './Word';
import type { Status } from '../../../types/types';
const mockData = {
    content: "В старом доме есть {{горячая}} вода.",

}
export const FindMistake = () => {
    const [status, setStatus] = useState<Status>("idle");
    return (
        <div className='FindMistake'>
            <div className="FindMistake__inner">
                <TrainerTitle>Найди ошибку</TrainerTitle>
                <h3>Нажми на слово, которое написано неправильно</h3>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
                <div className="FindMistake__content">
                    В старом доме есть горячая вода.
                </div>
                <WordWithMistake
                    content='горячяя'
                    correctVariant='гарячая'
                    variants={["горячаа", "горячая"]}
                    handleError={() => setStatus("error")}
                    handleSuccess={() => setStatus("success")} />
            </div>
        </div>
    )
}