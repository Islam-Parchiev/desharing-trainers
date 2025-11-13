// import { useState } from "react";
// import { Card } from "../components/Card";
// import type { IWord, ISlot } from "../trainers/DragAndDrop";
// import { VariantTasks, MultipleVariantsTasks } from "../mocks/data";
import type { Id} from "../types/types";
// import { ChoiceRightVariant } from "../trainers/ChoiceRightVariant";
// import { WordByImage } from "../trainers/WordByImage";
// import { AccentTrainer } from "../trainers/AccentTrainer";
export interface Variant {
    id: Id;
    title: string;
}
export interface ITask {
    id: Id;
    questionTitle: string;
    variants: Variant[];
    correctVariantId: number;
}
export type TrainerTypes = "variant-task" | "mult-variants" | "dnd-words"
export const Test = () => {
    // const [currentTaskNumber, setCurrentTaskNumber] = useState(0);
    // const currentTask = VariantTasks[currentTaskNumber];
    // const multipleCurrentTask = MultipleVariantsTasks[0];
    // const [words] = useState<IWord[]>([{ id: 1, title: "Мяуканье" }, { id: 2, title: "V8" }, { id: 3, title: "Лай" }])
    // const [status, setStatus] = useState<Status>("idle")
    // const nextTask = () => {
    // setStatus("idle");
    // setCurrentTaskNumber(prev => prev + 1);
    // }
    // const [slots, setSlots] = useState<ISlot[]>([
    //     {
    //         id: 1,
    //         current: null,
    //         imageUrl: "dog.png",
    //         correctValue: "Лай"
    //     },
    //     {
    //         id: 2,
    //         current: null,
    //         imageUrl: "cat.png",
    //         correctValue: "Мяуканье"
    //     },
    //     {
    //         id: 3,
    //         current: null,
    //         imageUrl: "v8.png",
    //         correctValue: "V8"
    //     }
    // ])
    // const onSuccessDnd = () => {
    //     setStatus("success");
    // }
    // const onErrorDnd = () => {
    //     setStatus("error");
    // }
    // const handleCheck = () => {
    //     if (slots.every(slot => slot.current === slot.correctValue)) {
    //         // setSuccess(true);
    //         onSuccessDnd();
    //     } else {
    //         // setError(true);
    //         onErrorDnd();
    //     }
    // }
    // const handleRetry = () => {
    //     setStatus("idle");
    //     setSlots(prev => prev.map(s => ({ ...s, current: null })));
    // };
    return (
        <main className='Test'>
            <section className='MainSection'>
                {/* {currentTaskNumber === VariantTasks.length - 1 ? <>Fiinish</> :
                    <ChoiceRightVariant currentTaskNumber={currentTaskNumber} status={status} handleError={onErrorDnd} handleSuccess={onSuccessDnd} handleNextTask={nextTask} correctVariantId={currentTask.correctVariantId} id={currentTask.id} questionTitle={currentTask.questionTitle} variants={currentTask.variants} key="test-key1231231" />
                }
                {status === "success" && <button onClick={nextTask}>next</button>}
                {status === "error" && <button onClick={nextTask}>next</button>} */}
                {/*
        <ChoiceMultipleVariants
          correctVariants={multipleCurrentTask.correctVariants}
          id={multipleCurrentTask.id}
          questionTitle={multipleCurrentTask.questionTitle}
          variants={multipleCurrentTask.variants}
          key={multipleCurrentTask.id + 'testtt'} />*/}


                {/* dnd */}
                {/* {status === "success" && 'success'} */}
                {/* {status === "error" && 'error'} */}
                {/* <DragAndDrop setSlots={setSlots} slots={slots} words={words} handleError={onErrorDnd} handleSuccess={onSuccessDnd} /> */}
                {/* {status === "error" && <Button variant="primary" size="medium" onClick={handleRetry}>retry</Button>} */}
                {/* {status === "success" && <Button variant="primary" size="medium" onClick={handleRetry}>next</Button>} */}
                {/* {status === "idle" ? <Button variant="primary" size="medium" onClick={handleCheck}>check</Button> : null} */}
                {/* dndend */}
                {/* <Card /> */}
                {/* <WordByImage /> */}
                {/* <AccentTrainer /> */}
                test
            </section>
        </main>
    )
}