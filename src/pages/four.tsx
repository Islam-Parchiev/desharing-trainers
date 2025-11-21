import { Card } from "../components/Card"
import { AccentLetterMocks } from "../mocks/data"
import { AccentTrainer } from "../trainers/moduleOne/AccentTrainer"

export const Four = () => {
    return (
        <main className="Page Main">
            <section className="MainSection">

                <Card onBack={() => console.log('back')} status="idle">

                    <AccentTrainer data={AccentLetterMocks} title="Нажми на букву, чтобы поставить ударение" />
                </Card>
            </section>
        </main>
    )
}