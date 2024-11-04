import React, { useEffect, useState } from 'react';
import { ReactFlow, addEdge, MiniMap, Controls, Background } from '@xyflow/react';
import './App.css';
 
import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  {
    id: '1',
    position: { x: 20, y: 20 },
    data: { label: '1' },
    sourcePosition: 'right',
    row: 1,
  },
  {
    id: '2',
    position: { x: 220, y: 20 },
    data: { label: '2' },
    targetPosition: 'left',
    row: 2,
    //hidden: true,
  },
  {
    id: '3',
    position: { x: 220, y: 100 },
    data: { label: '3' },
    targetPosition: 'left',
    sourcePosition: 'right',
    row: 2,
    //hidden: true
  },
  {
    id: '4',
    position: { x: 20, y: 100 },
    data: { label: '4' },
    sourcePosition: 'right',
    row: 1,
  },
  {
    id: '5',
    position: { x: 220, y: 20 },
    data: { label: '5' },
    targetPosition: 'left',
    row: 2,
    //hidden: true
  },
  {
    id: '6',
    position: { x: 420, y: 20 },
    data: { label: '6' },
    targetPosition: 'left',
    row: 3,
    //hidden: true
  },
  {
    id: '7',
    position: { x: 220, y: 180 },
    data: { label: '7' },
    targetPosition: 'left',
    row: 2,
    //hidden: true
  },
];

const edgeStyles = {
  stroke: '#000',
  strokeWidth: 2,
};

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', style: edgeStyles },
  { id: 'e1-3', source: '1', target: '3', style: edgeStyles },
  { id: 'e3-6', source: '3', target: '6', style: edgeStyles },
  { id: 'e4-5', source: '4', target: '5', style: edgeStyles },
  { id: 'e1-7', source: '1', target: '7', style: edgeStyles },
];
 
export default function App() {
  const [elements, setElements] = useState(initialNodes);
  const [memory, setMemory] = useState(initialNodes);
  const [choosedNodes, setChoosedNodes] = useState([]);
  const [edges, setEdges] = useState(initialEdges);

  const getChildNodes = (parentId) => {
    let childs = [];

    edges.forEach((el) => {
      if (el.source === parentId) {
        childs.push(el.target);
      }
    });

    return childs;
  };

  const getFirstRowNodes = () => {
    let nodes = [];

    memory.forEach((el) => {
      if (el.row === 1) {
        nodes.push(el);
      }
    });

    setElements(nodes);
  };

  const toggle = (event, element) => {
    let nodes = [];

    choosedNodes[element.row - 1] = element;
    choosedNodes.splice(element.row);

    memory.forEach((el) => {
      const elNode = document.querySelector(`[data-testid="rf__node-${el.id}"]`);
      if (elNode) {
        elNode.style.backgroundColor = '#fff';
      }

      if (el.row === 1) {
        nodes.push(el);
      } else {
        choosedNodes.forEach((choosed) => {
          const childs = getChildNodes(choosed.id);
          const choosedNode = document.querySelector(`[data-testid="rf__node-${choosed.id}"]`);
        
          if (choosedNode) {
            choosedNode.style.backgroundColor = 'lightgreen';
          }

          if (childs.includes(el.id)) {
            nodes.push(el);
          }
        });
      }
    });

    setElements(nodes);
  };

  useEffect(() => {
    getFirstRowNodes();
  }, []);

  useEffect(() => {
    //console.log('Elements have changed:', elements);
  }, [elements]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'orange' }}>
      <ReactFlow
        nodes={elements}
        edges={initialEdges}
        onNodeClick={toggle}
      />
    </div>
  );
}
