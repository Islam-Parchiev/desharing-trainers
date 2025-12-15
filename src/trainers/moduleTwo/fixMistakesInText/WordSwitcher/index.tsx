import { useMemo } from "react";
import './styles.scss';

interface WordSwitcherProps {
    variants: string[];
    itemHeight?: number;
    selectedIndex: number;
    onSelect: (index: number) => void;
    isCorrect: boolean | undefined;
    isChecked: boolean;
}

export const WordSwitcher = ({
    variants,
    itemHeight = 25,
    selectedIndex,
    onSelect,
    isChecked,
    isCorrect

}: WordSwitcherProps) => {
    console.log(isChecked, isCorrect);
    const onClickWord = () => {

        const nextIndex = selectedIndex >= variants.length - 1 ? 0 : selectedIndex + 1;
        onSelect(nextIndex);
    };


    const boxStyle = useMemo(() => ({
        transform: `translateY(-${selectedIndex * itemHeight}px)`,
        transition: 'transform 0.3s ease-in-out'
    }), [selectedIndex, itemHeight]);

    return (
        <div className="WordSwitcher" onClick={onClickWord} role="button" tabIndex={0}
            style={{ maxHeight: itemHeight + "px" }}>
            <div className="WordSwitcher__window" style={boxStyle}>
                {variants.map((variant, index) => (
                    <span key={`${variant}-${index}`} className="WordSwitcher__item">
                        {variant}
                    </span>
                ))}
            </div>

        </div>
    );
};