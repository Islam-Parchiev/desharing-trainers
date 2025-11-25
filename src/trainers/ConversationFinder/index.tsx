import { useState } from 'react';
import { TrainerTitle } from '../../components/TrainerTitle';
import './styles.scss';
import { Button } from '../../shared/ui/Button';
import type { Status } from '../../types/types';
export const ConversationFinder = () => {
    const [data, setData] = useState([
        {
            imageUrl: "gr2.png",
            title: "Привет",
            correct: false,
        },
        {
            imageUrl: "yy.jpg",
            title: "Привет, Стёпа",
            correct: true,
        }
    ])
    const [currentSlideN, setCurrentSlideN] = useState(0);
    const [status, setStatus] = useState<Status>("idle");
    const currentSlide = data[currentSlideN];
    const handleNext = () => {
        if (currentSlide.title === data[data.length - 1].title) {
            return;
        }
        setCurrentSlideN(prev => prev + 1);
    }
    const handlePrev = () => {
        if (currentSlide.title === data[0].title) {
            return;
        }
        setCurrentSlideN(prev => prev - 1);
    }
    const handleCheck = () => {
        if (currentSlide.correct) {
            setStatus("success");
            return
        } else {
            setStatus("error");
        }
    }
    return (
        <div className="ConversationFinder">
            <div className="ConversationFinder__inner">
                <TrainerTitle>Нажимай на кнопки и ищи того, с кем говорит Стёпа</TrainerTitle>
                {status === "success" && "Success"}
                {status === "error" && "Error"}
                <div className="ConversationFinder__content">
                    <div className="ConversationFinder__col">
                        <div className="ConversationFinder__col_text">
                            <span>
                                Привет
                            </span>
                        </div>
                        <div className="ConversationFinder__image">
                            <img src="/gr1.png" alt="" />
                        </div>
                    </div>
                    <div className="ConversationFinder__col">
                        <div className="ConversationFinder__col_text">
                            <span>

                                {currentSlide.title}
                            </span>
                        </div>
                        <div className="ConversationFinder__slider">

                            <button className='btn-reset btn-prev' onClick={handlePrev}>prev</button>
                            <div className="ConversationFinder__slider_slides">
                                <div className="ConversationFinder__slide">
                                    <div className="ConversationFinder__image">
                                        <img src={currentSlide.imageUrl} alt="" />

                                    </div>
                                </div>
                            </div>
                            <button className='btn-reset btn-next' onClick={handleNext}>next</button>
                        </div>
                    </div>
                </div>
                <Button onClick={handleCheck}>Check</Button>
            </div>
        </div>
    )
}