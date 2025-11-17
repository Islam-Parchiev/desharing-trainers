import { Card } from "../components/Card"
import { AccentTrainer } from "../trainers/AccentTrainer"

export const Four = () => {
    return (
        <main className="Page Main">
            <section className="MainSection">

                <Card onBack={() => console.log('back')} status="idle">

                    <AccentTrainer />
                </Card>
            </section>
        </main>
    )
}