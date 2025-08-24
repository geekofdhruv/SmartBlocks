// src/components/TriggerNode.tsx

import { Handle, Position } from 'reactflow';

function TriggerNode() {
  return (
    <div className="border border-gray-400 rounded-lg bg-white shadow-md w-72">
      <div className="bg-green-200 p-2 rounded-t-lg">
        <p className="font-bold text-gray-800">1. TRIGGER</p>
      </div>
      <div className="p-3">
        <label htmlFor="text" className="text-sm text-gray-600 block mb-1">
          When an NFT from this collection is received:
        </label>
        <input
          id="text"
          name="text"
          placeholder="0x..."
          className="nodrag w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {/* The Handle is the connection point for the edges */}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
    </div>
  );
}

export default TriggerNode;