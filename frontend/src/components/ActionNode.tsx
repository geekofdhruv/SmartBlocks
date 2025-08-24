// src/components/ActionNode.tsx

import { Handle, Position } from 'reactflow';

function ActionNode() {
  return (
    <div className="border border-gray-400 rounded-lg bg-white shadow-md w-72">
      {/* Node Header */}
      <div className="bg-blue-200 p-2 rounded-t-lg">
        <p className="font-bold text-gray-800">2. ACTION</p>
      </div>

      {/* Node Body with Inputs */}
      <div className="p-3 space-y-2">
        <div>
          <label htmlFor="tokenAddress" className="text-sm text-gray-600 block mb-1">
            Send this token (Address):
          </label>
          <input
            id="tokenAddress"
            name="tokenAddress"
            placeholder="0x..."
            className="nodrag w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="amount" className="text-sm text-gray-600 block mb-1">
            Amount:
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="100"
            className="nodrag w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Connection Handles */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
    </div>
  );
}

export default ActionNode;