
import { useState } from 'react'
import './App.scss'
// import { VariantItem } from './components/VariantItem'
import { Button } from './shared/ui/Button'
import { Footer } from './widgets/Footer'
import { Header } from './widgets/Header'
import type { Id } from './types/types'
import { VariantTasks, MultipleVariantsTasks } from './mocks/data'
import { ChoiceRightVariant } from './trainers/ChoiceRightVariant'
import { ChoiceMultipleVariants } from './trainers/ChoiceMultipleVariants'
import { DragAndDropImage } from './trainers/DragAndDropToImage'
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
function App() {
  const [currentTaskNumber, setCurrentTaskNumber] = useState(0);
  const currentTask = VariantTasks[currentTaskNumber];
  const multipleCurrentTask = MultipleVariantsTasks[0];
  const nextTask = () => {
    setCurrentTaskNumber(prev => prev + 1);
  }
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
        <DragAndDropImage />
        {/* <Card /> */}
      </section>
    </main>
  )
}

export default App
