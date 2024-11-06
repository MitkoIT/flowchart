import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ReactFlow, addEdge, MiniMap, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from 'axios';

function Diagram() {
  const { resourceId } = useParams();
  const [elements, setElements] = useState([]);
  const [memory, setMemory] = useState([]);
  const [choosedNodes, setChoosedNodes] = useState([]);
  const [edges, setEdges] = useState([]);

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
        const choosedNode = document.querySelector(`[data-testid="rf__node-${choosedNodes[0].id}"]`);

        if (choosedNode) {
          choosedNode.style.backgroundColor = 'lightgreen';
        }

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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}resources/${resourceId}/structure`);

        setMemory(response.data.structure.nodes);
        setEdges(response.data.structure.edges);
      } catch (error) {
        console.error('There was an error making the request:', error);
      }
    };
    
    fetchData();
  }, [resourceId]);

  useEffect(() => {
    getFirstRowNodes();
  }, [memory]);

  useEffect(() => {}, [elements, edges]);

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', background: 'orange' }}>
        <ReactFlow
          nodes={elements}
          edges={edges}
          onNodeClick={toggle}
        />
      </div>
    </>
  );
}

export default Diagram;