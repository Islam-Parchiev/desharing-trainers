export const RiddleLetter = ({ value, handleClick }: { value: string; handleClick: () => void; }) => {
    return (<div className="SolveRiddleLetter" onClick={handleClick}>
        {value}
    </div>)
}