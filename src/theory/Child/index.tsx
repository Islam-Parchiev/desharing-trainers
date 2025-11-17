import { useState } from "react";
import { TrainerTitle } from "../../components/TrainerTitle";
import { Icon } from "../../shared/ui/MoveBox";
import { StepItem } from "../../shared/ui/StepItem"
import type { Id } from "../../types/types";
import './styles.scss';
export interface TheoryDataItem {
    id: Id;
    title: string;
    paragraphs: string[];
}
export const TheoryChild = ({
    data
}: {
    data: TheoryDataItem[];
}) => {
    const [currentTheoryNumber, setCurrentTheoryNumber] = useState(0);
    const currentTheory = data[currentTheoryNumber];
    const handleChangeTheory = (index: number) => {
        setCurrentTheoryNumber(index)
    }
    const isActive = (index: number) => {
        if (index === currentTheoryNumber) {
            return true
        }
        return false
    }
    return (
        <div className="TheoryChild Card">
            <div className="TheoryChild__header">
                {
                    data.map((item, index) => <StepItem
                        active={isActive(index)}
                        completed={false}
                        content={index + 1}
                        handleClick={() => handleChangeTheory(index)}
                        id={item.id}
                        key={`${item.id}-${item.title}-${index}`} />)
                }
            </div>
            <div className="TheoryChild__body">
                <TrainerTitle>{currentTheory.title}</TrainerTitle>
                <div className="TheoryChild__paragraphs">

                    {currentTheory.paragraphs.map((paragraph) => <div className="TheoryChild__paragraph">
                        <button className="btn-reset TheoryChild__paragraph_btn"> <Icon /></button>
                        <p>
                            {paragraph}
                        </p>
                    </div>)}
                </div>
            </div>
        </div>
    )
}