import { Card } from "../components/Card"
import { FillInTrainer } from "../trainers/moduleOne/FillInTrainer"

export const Six = () => {
    return (
        <main className="Page Main">
            <section className="MainSection">

                <Card onBack={() => console.log('back')} status="idle">

                    <FillInTrainer />
                </Card>
            </section>
        </main>
    )
}