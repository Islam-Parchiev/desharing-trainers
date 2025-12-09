// import { useDrag } from 'react-dnd';

// const QUESTION_ITEMS = [
//   { id: 'q1', text: 'Столица Франции', answerId: 'answer-1' },
//   { id: 'q2', text: 'Столица Великобритании', answerId: 'answer-2' },
// ];

// export const QuestionSidebar = () => {
//   return (
//     <aside style={{ width: '200px', padding: '20px', borderRight: '1px solid #ddd' }}>
//       <h3>Вопросы</h3>
//       <p>Перетащите на ответ</p>
//       {QUESTION_ITEMS.map((q) => (
//         <DraggableQuestion key={q.id} question={q} />
//       ))}
//     </aside>
//   );
// };

// const DraggableQuestion = ({ question }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'QUESTION',
//     item: { id: question.id, text: question.text, answerId: question.answerId },
//     collect: (monitor) => ({ isDragging: monitor.isDragging() }),
//   }));

//   return (
//     <div
//       ref={drag}
//       style={{
//         padding: '10px',
//         margin: '10px 0',
//         background: isDragging ? '#e1f5fe' : '#f5f5f5',
//         cursor: 'move',
//         borderRadius: '4px',
//       }}
//     >
//       {question.text}
//     </div>
//   );
// };
export const QuestionSidebar = () => {
  return "QuestionSidebar";
}