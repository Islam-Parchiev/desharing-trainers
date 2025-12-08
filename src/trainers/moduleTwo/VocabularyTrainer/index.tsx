import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { Button } from '../../../shared/ui/Button';
import { changeCurrentStep } from './model/vocabulary.slice';

import './styles.scss';
import { VocabularyIntro } from './VocabularyIntro';
import { VocabularyPractice } from './VocabularyPractice';
import { VocabularyTheory } from './VocabularyTheory';
import type { Status } from '../../../types/types';
export const VocabularyTrainer = () => {
    const [status, setStatus] = useState<Status>("idle")
    const { currentStep } = useAppSelector(state => state.vocabularyTrainerReducer);
    const dispatch = useAppDispatch();
    const renderContent = () => {

        switch (currentStep) {
            case "intro":
                return <VocabularyIntro />
            case "theory":
                return <VocabularyTheory />
            case "practice":
                return <VocabularyPractice
                    id={1}
                    handleStatus={setStatus}
                    correctAnswer='город'
                    availableLetters={[{ id: 1, letter: "г" }, { id: 2, letter: "ф" }, { id: 3, letter: "р" }, { id: 4, letter: "о" }, { id: 5, letter: "о" }, { id: 6, letter: "д" }, { id: 7, letter: "ж" }]} />
            default:
                return "error"
        }

    }
    const handleNextStep = () => {
        if (currentStep === "intro") {

            dispatch(changeCurrentStep("theory"));
        } else if (currentStep === "theory") {
            dispatch(changeCurrentStep("practice"));
        } else {
            dispatch(changeCurrentStep("intro"));
        }

    };
    return (
        <div className="VocabularyTrainer">
            <div className="VocabularyTrainer__inner">
                <div className="VocabularyTrainer__image_col">
                    <img src="/human.png" alt="Image" />
                </div>
                <div className="VocabularyTrainer__content_col">
                    {renderContent()}
                    <div className="VocabularyTrainer__content_bottom">
                        {status === "success" && "Success"}
                        {status === "error" && "error"}
                        {currentStep !== "practice" && <Button variant="primary" size="medium" onClick={handleNextStep}>Дальше</Button>}
                        {currentStep === "practice" && <Button variant="primary" size="medium">Финиш</Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}