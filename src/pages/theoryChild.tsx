import { TheoryChild } from "../theory/Child"
import { mockTheoryData } from "../mocks/data"
export const TheoryChildPage = () => {
    return (
        <main className="Page Main">
            <section>
                <TheoryChild data={mockTheoryData} />
            </section>
        </main>
    )
}