// src/components/TriggerNode.tsx

import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

// Define the shape of the data object for this node
export type TriggerNodeData = {
  nftCollectionAddress: string;
};

// The component now accepts props, specifically the 'data' prop provided by React Flow
function TriggerNode({ data }: NodeProps<TriggerNodeData>) {
  return (
    <div className="border border-gray-400 rounded-lg bg-white shadow-md w-72">
      <div className="bg-green-200 p-2 rounded-t-lg">
        <p className="font-bold text-gray-800">1. TRIGGER</p>
      </div>
      <div className="p-3">
        <label htmlFor="text" className="text-sm text-gray-600 block mb-1">
          When an NFT from this collection is received:
        </label>
        {/* The input's value is now controlled by the 'data' prop */}
        <input
          id="text"
          name="text"
          placeholder="0x..."
          className="nodrag w-full p-2 border border-gray-300 rounded"
          defaultValue={data.nftCollectionAddress} // Use defaultValue for simplicity in this step
        />
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
    </div>
  );
}

export default TriggerNode;