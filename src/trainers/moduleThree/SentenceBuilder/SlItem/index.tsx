import './styles.scss';

interface SlItemProps {
    words: string[];
    selectedIndex: number;
    correctAnswer?: string;
    currentAnswer: string | null;
    onSelect: (index: number) => void;
}

export const SlItem = ({
    words,
    selectedIndex,
    correctAnswer = "",
    currentAnswer,
    onSelect,
}: SlItemProps) => {
    const onClickWord = () => {
        const nextIndex = selectedIndex >= words.length - 1 ? 0 : selectedIndex + 1;
        onSelect(nextIndex);
    };

    const selectedWord = words[selectedIndex];

    const getClassName = () => {
        let className = "SlItem";
        if (currentAnswer === null) {
            className += " SlItem--default";
        } else if (currentAnswer === correctAnswer) {
            className += " SlItem--correct";
        } else {
            className += " SlItem--incorrect";
        }
        return className;
    };

    return (
        <div
            className={getClassName()}
            onClick={onClickWord}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClickWord();
                }
            }}
        >
            {selectedWord}
        </div>
    );
};