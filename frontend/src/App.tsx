// src/App.tsx

import { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import type { Node, Edge, NodeChange, EdgeChange, Connection, NodeTypes} from 'reactflow';
import 'reactflow/dist/style.css';

import TriggerNode from './components/TriggerNode';
import type { TriggerNodeData } from './components/TriggerNode';
import ActionNode from './components/ActionNode';
import type { ActionNodeData } from './components/ActionNode';

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

// 1. Define the initial data structure for our nodes
const initialNodes: Node<TriggerNodeData | ActionNodeData>[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 5 },
    data: { nftCollectionAddress: '' },
  },
  {
    id: '2',
    type: 'action',
    position: { x: 250, y: 220 },
    data: { tokenAddress: '', amount: '' },
  },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // 2. This function now also handles updating node data from input changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);

        // Find any change that is a dimension change (includes input changes)
        const dataChange = changes.find(
          (change) => change.type === 'dimensions' && change.dimensions
        );

        if (dataChange) {
          return updatedNodes.map((node) => {
            if (node.id === dataChange.id) {
              const target = (dataChange as any).event?.target as HTMLInputElement;
              if (target) {
                return {
                  ...node,
                  data: { ...node.data, [target.name]: target.value },
                };
              }
            }
            return node;
          });
        }
        return updatedNodes;
      });
    },
    [setNodes]
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => [...eds, { ...connection, id: `${eds.length + 1}` }]),
    [setEdges]
  );

  // 3. This function will collect and log the data from our nodes
  const getFlowData = () => {
    const triggerNode = nodes.find(node => node.type === 'trigger');
    const actionNode = nodes.find(node => node.type === 'action');

    if (triggerNode && actionNode) {
      const flowData = {
        trigger: triggerNode.data,
        action: actionNode.data
      };
      console.log("Collected Flow Data:", flowData);
      alert("Check the console for the collected data!");
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* 4. Add a button to trigger the data collection */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={getFlowData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate & Deploy
        </button>
      </div>
    </div>
  );
}

export default App;