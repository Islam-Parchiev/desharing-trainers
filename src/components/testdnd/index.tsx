import './styles.scss';

// const TestDnd = () => {
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [startPoint, setStartPoint] = useState(null);
//     const [endPoint, setEndPoint] = useState(null);

//     useEffect(() => {
//         const handleMouseMove = (e) => {
//             if (!isDrawing) return;
//             setEndPoint({ x: e.clientX, y: e.clientY });
//         };

//         const handleMouseUp = () => {
//             setIsDrawing(false);
//         };

//         if (isDrawing) {
//             document.addEventListener('mousemove', handleMouseMove);
//             document.addEventListener('mouseup', handleMouseUp);
//         }

//         return () => {
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, [isDrawing]);

//     const handleMouseDown = (e) => {
//         setIsDrawing(true);
//         setStartPoint({ x: e.clientX, y: e.clientY });
//         setEndPoint({ x: e.clientX, y: e.clientY });
//     };

//     const calculateLine = () => {
//         if (!startPoint || !endPoint) return null;

//         const width = Math.abs(endPoint.x - startPoint.x);
//         const height = Math.abs(endPoint.y - startPoint.y);
//         const left = Math.min(startPoint.x, endPoint.x);
//         const top = Math.min(startPoint.y, endPoint.y);

//         return {
//             left,
//             top,
//             width,
//             height,
//             x1: startPoint.x - left,
//             y1: startPoint.y - top,
//             x2: endPoint.x - left,
//             y2: endPoint.y - top
//         };
//     };

//     const lineData = calculateLine();

//     return (
//         <div className="TestDnd">
//             <div
//                 className="from"
//                 onMouseDown={handleMouseDown}
//             />
//             <div className="to" />

//             {isDrawing && lineData && (
//                 <svg
//                     className="line-svg"
//                     style={{
//                         left: lineData.left,
//                         top: lineData.top,
//                         width: lineData.width,
//                         height: lineData.height
//                     }}
//                     viewBox={`0 0 ${lineData.width} ${lineData.height}`}
//                 >
//                     <line
//                         x1={lineData.x1}
//                         y1={lineData.y1}
//                         x2={lineData.x2}
//                         y2={lineData.y2}
//                         stroke="red"
//                         strokeWidth="2"
//                     />
//                 </svg>
//             )}
//         </div>
//     );
// };
const TestDnd = () => {
    return (
        "testDnd"
    )
}
export default TestDnd;