import { useAppDispatch, useAppSelector } from '../../../redux';
import { Button } from '../../../shared/ui/Button';
import { StepItem } from '../../../shared/ui/StepItem';
import { changeStatus, next, prev, changeCurrentData } from './theory.slice';
import { changeStatus as changeLearningStatus } from '../learningStatus.slice';
import './../theory.scss';
import { useState } from 'react';
export const Theory = () => {
    const { status, currentData, data } = useAppSelector(state => state.theoryReducer);
    const [isLast, setIsLast] = useState(false);
    const currentTheory = data[currentData];
    const dispatch = useAppDispatch();
    const handleClickOnStartBtn = () => {
        dispatch(changeStatus("idle"));
    }
    const handleClickNextBtn = () => {
        if (data[currentData].id === data[data.length - 1].id) {
            setIsLast(true);
        }
        dispatch(next());

    }
    const handleClickPrevBtn = () => {
        dispatch(prev());
    }
    const handleClickFinishBtn = () => {
        dispatch(changeLearningStatus("practice"));
    }
    return (
        <div className="Theory">
            {
                status === "loading" ? <div>loading...</div> : status === "pending" ? <div className="TheoryStart">
                    <button className="btn-reset Theory__start_btn" onClick={handleClickOnStartBtn}>
                        start
                    </button>
                </div> :
                    <div className="TheoryMain">
                        <div className="TheoryHeader">


                            <div className="Theory__progress">
                                <ul className="list-reset Theory__progress_steps">
                                    {data.map((item, i) => <StepItem completed={false} content={i + 1} id={item.id} active={currentData === i} handleClick={() => dispatch(changeCurrentData(i))} />)}
                                </ul>
                            </div>
                        </div>
                        <div className="TheoryContent">
                            <div className="TheoryContent__inner">
                                <h2 className="TheoryContent__title">
                                    {currentTheory.title}
                                </h2>
                                <div className="TheoryContent__text">
                                    {currentTheory.paragraphs.map(paragraph => <p>{paragraph}</p>)}
                                </div>
                            </div>
                        </div>
                        <div className="TheoryFooter">
                            <Button variant="secondary" size="medium" onClick={handleClickPrevBtn}>back</Button>
                            {!isLast ?
                                <Button variant="primary" size="medium" onClick={handleClickNextBtn}>next</Button> :
                                <Button variant="primary" size="medium" onClick={handleClickFinishBtn}>finish</Button>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}