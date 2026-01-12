export const RiddleSlot = ({ currentValue }: { currentValue: string | null; }) => {
    return (
        <div className="SolveRiddleSlot">
            {currentValue || ""}
        </div>
    )
}