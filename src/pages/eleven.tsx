import { Card } from "../components/Card"
import { PhoneticTrainer } from "../trainers/moduleOne/PhoneticTrainer"
export const Eleven = () => {
    return (
        <main className="Page Main">
            <section className="MainSection">
                <Card onBack={() => console.log('back')} status="idle">

                    <PhoneticTrainer />
                </Card>
            </section>
        </main>
    )
}