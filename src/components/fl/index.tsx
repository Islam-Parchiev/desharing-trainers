import { useState, useCallback, useRef } from 'react';
import { ReactFlow, addEdge, useNodesState, useEdgesState, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@xyflow/react/dist/style.css';

import { QuestionSidebar } from './QuestionSidebar';
import { AnswerNode } from './AnswerNode';

// Инициализируем несколько ответов на канвасе
const initialNodes = [
    { id: 'answer-1', type: 'answerNode', position: { x: 350, y: 50 }, data: { label: 'Париж' } },
    { id: 'answer-2', type: 'answerNode', position: { x: 350, y: 150 }, data: { label: 'Лондон' } },
];
const initialEdges = [];

const nodeTypes = { answerNode: AnswerNode };

function Flow() {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow(); // Для корректного позиционирования[citation:6]

    // Обработчик создания связи
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    // Обработчик "бросания" элемента на канвас
    const onDrop = useCallback((event, item) => {
        event.preventDefault();
        if (!reactFlowWrapper.current) return;

        // Получаем позицию на канвасе[citation:6]
        const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

        // Создаем новый узел-вопрос
        const newNode = {
            id: `question-${Date.now()}`,
            type: 'default',
            position,
            data: { label: item.text },
            // Специальное свойство, чтобы знать, с каким ответом связать
            connectTo: item.answerId
        };
        setNodes((nds) => nds.concat(newNode));
    }, [screenToFlowPosition]);

    return (
        <div className="dndflow" style={{ display: 'flex', height: '100vh' }}>
            <QuestionSidebar />
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ flexGrow: 1 }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                />
            </div>
        </div>
    );
}

export const WrappedFlow = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <ReactFlowProvider>
                <Flow />
            </ReactFlowProvider>
        </DndProvider>
    )
}