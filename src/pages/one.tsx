import { ChoiceMultipleVariants } from "../trainers/ChoiceMultipleVariants"
import { MultipleVariantsTasks } from "../mocks/data";
import { Card } from "../components/Card";

export const One = () => {
    const multipleCurrentTask = MultipleVariantsTasks[0];

    return <main className="Page Main">
        <section className="MainSection">
            <Card onBack={() => console.log('back')} status="idle">

                <ChoiceMultipleVariants
                    correctVariants={multipleCurrentTask.correctVariants}
                    id={multipleCurrentTask.id}
                    questionTitle={multipleCurrentTask.questionTitle}
                    variants={multipleCurrentTask.variants}
                    key={multipleCurrentTask.id + 'testtt'} />
            </Card>
        </section>
    </main>
}