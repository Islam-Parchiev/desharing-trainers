import './styles.scss';

export const NewWordItem = ({ word, onClick }: { word: string; onClick: () => void; }) => {
    return <span className='NewWordItem' onClick={onClick}>{word}</span>
}