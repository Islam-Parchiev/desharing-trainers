import './styles.scss';
export const FillInInput = ({ value }: { value: string | null; }) => {
    return (
        <div className="FillInInput">
            <span>{value || ""}</span>
        </div>
    )
}