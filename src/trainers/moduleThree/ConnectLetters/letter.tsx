import './styles.scss';

interface LetterProps {
    selected: boolean;
    completed: boolean;
    content: string;
    coordinates: { x: number; y: number };
    onClick: () => void;
    disabled: boolean;
}

export const Letter = ({
    selected,
    completed,
    content,
    coordinates,
    onClick,
    disabled,
}: LetterProps) => {
    return (
        <div
            className={`Letter ${selected ? 'letter--selected' : ''} ${completed ? 'letter--completed' : ''
                } ${disabled ? 'letter--disabled' : ''}`}
            style={{
                position: 'absolute',
                left: coordinates.x,
                top: coordinates.y,
                transform: 'translate(-50%, -50%)',
                cursor: disabled ? 'default' : 'pointer',
            }}
            onClick={disabled ? undefined : onClick}
        >
            {content}
        </div>
    );
};