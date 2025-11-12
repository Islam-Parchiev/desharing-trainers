import { Link } from "react-router-dom"

export const NativeLanguage = () => {
    return (
        <main className="NativeLanguage">
            <div className="NativeLanguage__inner">
                <ul className="list">
                    <li className="lis-item">
                        <Link to="/1">1</Link>
                    </li>
                    <li className="lis-item">
                        <Link to="/2">2</Link>
                    </li>
                    <li className="lis-item">
                        <Link to="/3">3</Link>
                    </li>
                    <li className="lis-item">
                        <Link to="/4">4</Link>
                    </li>

                </ul>
            </div>
        </main>
    )
}