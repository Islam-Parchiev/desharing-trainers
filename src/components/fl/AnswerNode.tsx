// import { Handle, Position, useUpdateNodeInternals } from '@xyflow/react';
// import { useDrop } from 'react-dnd';
// import { useEffect } from 'react';

// export const AnswerNode = ({ id, data }) => {
//   const updateNodeInternals = useUpdateNodeInternals();

//   // Настраиваем область, куда можно "бросить" вопрос[citation:6]
//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: 'QUESTION',
//     drop: (item) => ({ nodeId: id, answerId: item.answerId }),
//     collect: (monitor) => ({ isOver: monitor.isOver() }),
//   }));

//   // Обновляем внутренние данные узла, если нужно
//   useEffect(() => {
//     updateNodeInternals(id);
//   }, [id, updateNodeInternals]);

//   return (
//     <div
//       ref={drop}
//       style={{
//         padding: '20px',
//         background: isOver ? '#d4edda' : '#fff',
//         border: '2px solid #333',
//         borderRadius: '8px',
//         minWidth: '120px',
//       }}
//     >
//       {/* Точка подключения для линий (Edge) */}
//       <Handle type="target" position={Position.Left} style={{ top: '50%' }} />
//       <div>{data.label}</div>
//       <Handle type="source" position={Position.Right} style={{ top: '50%' }} />
//     </div>
//   );
// };
export const AnswerNode = () => {
  return "m";
}