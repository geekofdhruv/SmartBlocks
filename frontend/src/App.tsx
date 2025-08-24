// src/App.tsx

import { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import type { Node, Edge, NodeChange, EdgeChange, Connection, NodeTypes} from 'reactflow';

// You must import the CSS for React Flow to work
import 'reactflow/dist/style.css';

import TriggerNode from './components/TriggerNode';
import ActionNode from './components/ActionNode'; // New import

// Register both custom node types
const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode, // New registration
};

// Update the initialNodes to use both custom types
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    data: {},
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    type: 'action', // Use the new 'action' type
    data: {},
    position: { x: 250, y: 220 }, // Adjusted position for new node height
  },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];


function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
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
    </div>
  );
}

export default App;