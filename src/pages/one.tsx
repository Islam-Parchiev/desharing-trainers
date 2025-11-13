import { ChoiceMultipleVariants } from "../trainers/ChoiceMultipleVariants"
import { MultipleVariantsTasks } from "../mocks/data";

export const One = () => {
    const multipleCurrentTask = MultipleVariantsTasks[0];

    return <main>
        <ChoiceMultipleVariants
            correctVariants={multipleCurrentTask.correctVariants}
            id={multipleCurrentTask.id}
            questionTitle={multipleCurrentTask.questionTitle}
            variants={multipleCurrentTask.variants}
            key={multipleCurrentTask.id + 'testtt'} />
    </main>
}