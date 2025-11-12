import { useParams } from "react-router-dom"

export const Language = () => {
    const { id } = useParams();
    console.log(id);
    return (

        <main className="Language">
            <div className="Language__inner">
                {id}
            </div>
        </main>
    )
}