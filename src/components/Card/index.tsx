import { useState, useCallback } from 'react';
import { VariantTasks } from '../../mocks/data';
import { ChoiceRightVariant } from '../../trainers/ChoiceRightVariant';
import { AttestationItem } from '../AttestationItem';
import { Button } from '../../shared/ui/Button';
import cn from 'classnames';
import './styles.scss';

interface CardProps {
    onBack?: () => void;
    onFinish?: (results: { correct: number; errors: number; total: number }) => void;
    className?: string;
}

interface QuizState {
    currentTaskNumber: number;
    errorsCount: number;
    correctCount: number;
    currentStatus: 'idle' | 'success' | 'error' | 'finished';
}

export const Card = ({ onBack, onFinish, className }: CardProps) => {
    const [quizState, setQuizState] = useState<QuizState>({
        currentTaskNumber: 0,
        errorsCount: 0,
        correctCount: 0,
        currentStatus: 'idle',
    });
    const [resolvedTaskCount, setResolvedTaskCount] = useState(0);
    const isLastTask = quizState.currentTaskNumber === VariantTasks.length - 1;
    const currentTask = VariantTasks[quizState.currentTaskNumber];

    const handleAnswer = useCallback((isCorrect: boolean) => {
        setQuizState(prev => ({
            ...prev,
            errorsCount: isCorrect ? prev.errorsCount : prev.errorsCount + 1,
            correctCount: isCorrect ? prev.correctCount + 1 : prev.correctCount,
            currentStatus: isCorrect ? 'success' : 'error',
        }));
    }, []);

    const nextTask = useCallback(() => {
        if (isLastTask) {
            setQuizState(prev => ({ ...prev, currentStatus: 'finished' }));
        } else {
            setQuizState(prev => ({
                ...prev,
                currentTaskNumber: prev.currentTaskNumber + 1,
                currentStatus: 'idle',
            }));
        }
        setResolvedTaskCount(prev => prev + 1);
    }, [isLastTask]);

    const handleFinalFinish = useCallback(() => {
        onFinish?.({
            correct: quizState.correctCount,
            errors: quizState.errorsCount,
            total: VariantTasks.length,
        });
        setQuizState(prev => ({
            ...prev,
            // currentTaskNumber: prev.currentTaskNumber + 1,
            currentStatus: 'finished',
        }));
        setResolvedTaskCount(prev => prev + 1);
    }, [quizState.correctCount, quizState.errorsCount, onFinish]);

    const showNextButton = ['success', 'error'].includes(quizState.currentStatus) && !isLastTask;
    const showFinishButton = ['success', 'error'].includes(quizState.currentStatus) && isLastTask;

    if (!currentTask) {
        return <div>No tasks available</div>;
    }

    return (
        <div className={cn('Card', className)}>
            <div className="Card__inner">
                <div className="Card__header">
                    <button
                        className="btn-reset Card__back_btn"
                        onClick={onBack}
                        aria-label="Go back"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18.9502 12.9492C19.5025 12.9492 19.9502 12.5015 19.9502 11.9492C19.9502 11.3969 19.5025 10.9492 18.9502 10.9492L18.9502 12.9492ZM4.24309 11.2421C3.85256 11.6326 3.85256 12.2658 4.24309 12.6563L10.607 19.0203C10.9976 19.4108 11.6307 19.4108 12.0213 19.0203C12.4118 18.6298 12.4118 17.9966 12.0213 17.6061L6.36441 11.9492L12.0213 6.29236C12.4118 5.90184 12.4118 5.26867 12.0213 4.87815C11.6307 4.48763 10.9976 4.48763 10.6071 4.87815L4.24309 11.2421ZM18.9502 10.9492L4.9502 10.9492L4.9502 12.9492L18.9502 12.9492L18.9502 10.9492Z" fill="#303030" />
                        </svg>
                    </button>
                    <AttestationItem
                        active={quizState.currentStatus === 'idle'}
                        current={resolvedTaskCount}
                        max={VariantTasks.length}
                    />
                </div>

                {quizState.currentStatus !== 'finished' ? (
                    <>
                        <div className="Card__body">
                            <ChoiceRightVariant
                                key={currentTask.id}
                                currentTaskNumber={quizState.currentTaskNumber}
                                handleSuccess={() => handleAnswer(true)}
                                handleError={() => handleAnswer(false)}
                                correctVariantId={currentTask.correctVariantId}
                                id={currentTask.id}
                                status={quizState.currentStatus}
                                questionTitle={currentTask.questionTitle}
                                variants={currentTask.variants}
                                isSubmitted={false}
                                selectedVariantId={1}
                                setIsSubmitted={() => console.log('test')}
                                setSelectedVariantId={() => console.log('test')}
                                handleNextTask={() => console.log('next')}
                            />
                        </div>

                        <div className="Card__footer">
                            {showNextButton && (
                                <Button variant="primary" size="medium" onClick={nextTask}>
                                    Далее
                                </Button>
                            )}
                            {showFinishButton && (
                                <Button variant="primary" size="medium" onClick={handleFinalFinish}>
                                    Финиш
                                </Button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="Card__results">
                        <h3>Quiz Completed!</h3>
                        <p>Correct answers: {quizState.correctCount}/{VariantTasks.length}</p>
                        <p>Errors: {quizState.errorsCount}</p>
                        <Button variant="primary" onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};