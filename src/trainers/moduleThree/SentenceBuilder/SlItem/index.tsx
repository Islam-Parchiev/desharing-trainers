import './styles.scss';

interface SlItemProps {
    words: string[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

export const SlItem = ({
    words,
    selectedIndex,
    onSelect,

}: SlItemProps) => {

    const onClickWord = () => {
        const nextIndex = selectedIndex >= words.length - 1 ? 0 : selectedIndex + 1;
        onSelect(nextIndex);
    };
    const selectedWord = words[selectedIndex];

    return (
        <div className="SlItem" onClick={onClickWord} role="button" tabIndex={0}>
            {selectedWord}
        </div>
    );
};