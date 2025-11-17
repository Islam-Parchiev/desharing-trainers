import './styles.scss';
export const DialogSentence = ({
    content
}: { content: string; }) => {
    return (
        <div className="DialogSentence">
            <button className="btn-reset DialogSentence_sound">s</button>
            <span>{content}</span>
        </div>
    )
}