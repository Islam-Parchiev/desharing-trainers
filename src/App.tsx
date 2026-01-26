import './App.scss'
import type { Id } from './types/types'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router'

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
  return <RouterProvider router={router} />
}

export default App



// Подбери слова к картинкам,Распредели слова