import { Link } from "react-router-dom"

export const NativeLanguage = () => {
    return (
        <main className="NativeLanguage">
            <div className="NativeLanguage__inner">
                <ul className="list">
                    <li className="lis-item">
                        <Link to="/one">1</Link>
                    </li>
                    <li className="lis-item">
                        <Link to="/two">2</Link>
                    </li>
                    <li className="lis-item">
                        <Link to="/three">3</Link>
                    </li>
                    <li className="lis-item">
                        <Link to="/four">4</Link>
                    </li>

                </ul>
            </div>
        </main>
    )
}