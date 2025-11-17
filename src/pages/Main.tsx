import { Link } from "react-router-dom"

export const Main = () => {
    return (
        <main className="Page Main">
            <section>
                <div className="Card">
                    <div className="LinksTrainer">

                        <div className="ItemTrainerLink">
                            <Link to="/one">Тренажер 1</Link>
                        </div>
                        <div className="ItemTrainerLink">
                            <Link to="/two">Тренажер 2</Link>
                        </div>
                        <div className="ItemTrainerLink">
                            <Link to="/three">Тренажер 3</Link>
                        </div>
                        <div className="ItemTrainerLink">
                            <Link to="/four">Тренажер 4</Link>
                        </div>
                        <div className="ItemTrainerLink">
                            <Link to="/five">Тренажер 5</Link>
                        </div>
                        <div className="ItemTrainerLink">
                            <Link to="/six">Тренажер 6</Link>
                        </div>
                        <div className="ItemTrainerLink">
                            <Link to="/seven">Тренажер 7</Link>
                        </div>


                        <div className="ItemTrainerLink">
                            <Link to="/eight">Тренажер 8</Link>
                        </div>
                        <div className="ItemTrainerLink">
                            <Link to="/nine">Тренажер 9</Link>
                        </div>
                        <div className="ItemTrainerLink">
                            <Link to="/ten">Тренажер 10</Link>
                        </div>
                        <div className="ItemTrainerLink">
                            <Link to="/theoryChild">Теория 1</Link>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}