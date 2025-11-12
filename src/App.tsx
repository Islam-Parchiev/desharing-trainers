
import { useState } from 'react'
import './App.scss'
// import { VariantItem } from './components/VariantItem'
import { Button } from './shared/ui/Button'
// import { Footer } from './widgets/Footer'
// import { Header } from './widgets/Header'
import type { Id } from './types/types'
import { VariantTasks, MultipleVariantsTasks } from './mocks/data'
import { ChoiceRightVariant } from './trainers/ChoiceRightVariant'
import { ChoiceMultipleVariants } from './trainers/ChoiceMultipleVariants'
import { DragAndDrop, type ISlot, type IWord } from './trainers/DragAndDrop'
import { Card } from './components/Card'

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
type TrainerStatus = "success" | "error" | "idle";
function App() {
  const [currentTaskNumber, setCurrentTaskNumber] = useState(0);
  const currentTask = VariantTasks[currentTaskNumber];
  const multipleCurrentTask = MultipleVariantsTasks[0];
  const nextTask = () => {
    setCurrentTaskNumber(prev => prev + 1);
  }

  const [words] = useState<IWord[]>([{ id: 1, title: "Мяуканье" }, { id: 2, title: "V8" }, { id: 3, title: "Лай" }])
  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);
  const [status, setStatus] = useState<TrainerStatus>("idle")
  const [slots, setSlots] = useState<ISlot[]>([
    {
      id: 1,
      current: null,
      imageUrl: "dog.png",
      correctValue: "Лай"
    },
    {
      id: 2,
      current: null,
      imageUrl: "cat.png",
      correctValue: "Мяуканье"
    },
    {
      id: 3,
      current: null,
      imageUrl: "v8.png",
      correctValue: "V8"
    }
  ])
  const onSuccessDnd = () => {
    setStatus("success");
  }
  const onErrorDnd = () => {
    setStatus("error");
  }
  const handleCheck = () => {
    if (slots.every(slot => slot.current === slot.correctValue)) {
      // setSuccess(true);
      onSuccessDnd();
    } else {
      // setError(true);
      onErrorDnd();
    }
  }
  const handleRetry = () => {
    setStatus("idle");
    setSlots(prev => prev.map(s => ({ ...s, current: null })));
  };
  return (
    <main className='Main'>
      <section className='MainSection'>
        {/* {currentTaskNumber === VariantTasks.length - 1 ? <>Fiinish</> :
          <ChoiceRightVariant handleNextTask={nextTask} correctVariantId={currentTask.correctVariantId} id={currentTask.id} questionTitle={currentTask.questionTitle} variants={currentTask.variants} key="test-key1231231" />
        }
        <ChoiceMultipleVariants
          correctVariants={multipleCurrentTask.correctVariants}
          id={multipleCurrentTask.id}
          questionTitle={multipleCurrentTask.questionTitle}
          variants={multipleCurrentTask.variants}
          key={multipleCurrentTask.id + 'testtt'} />*/}


        {/* dnd */}
        {status === "success" && 'success'}
        {status === "error" && 'error'}
        <DragAndDrop setSlots={setSlots} slots={slots} words={words} handleError={onErrorDnd} handleSuccess={onSuccessDnd} />
        {status === "error" && <Button variant="primary" size="medium" onClick={handleRetry}>retry</Button>}
        {status === "success" && <Button variant="primary" size="medium" onClick={handleRetry}>next</Button>}
        {status === "idle" ? <Button variant="primary" size="medium" onClick={handleCheck}>check</Button> : null}
        {/* dndend */}
        {/* <Card /> */}
      </section>
    </main>
  )
}

export default App
