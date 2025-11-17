import { Card } from "../components/Card"
import { DnDColumns } from "../trainers/DnDColumns"

export const Seven = () => {
    return (
        <main className="Page Main">
            <section className="MainSection">

                <Card onBack={() => console.log('back')} status="idle">

                    <DnDColumns />
                </Card>
            </section>
        </main>
    )
}