import { Card } from "../components/Card"
import { PhoneticDndTrainer } from "../trainers/moduleOne/PhoneticDndTrainer"

export const Twelve = () => {
    return (
        <main className="Page Main">
            <section className="MainSection">
                <Card onBack={() => console.log('back')} status="idle">
                    <PhoneticDndTrainer />
                </Card>
            </section>
        </main>
    )
} 