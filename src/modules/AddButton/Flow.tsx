import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

import { useContext } from "react";
import { ConditionNode } from "./ConditionNode";
import { ConditionContext, useCondition } from "./useCondition";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

// const initialNodes = [{ id: "node-1", type: "textUpdater", position: { x: 0, y: 0 }, data: { value: 123 } }];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { condition: ConditionNode };

export function Flow() {
  // const { nodes, edges, onEdgesChange, onNodesChange } = useCondition();
  // const { nodes, edges, onEdgesChange, onNodesChange } = useCondition();
  // @ts-ignore
  const { nodes, edges, onEdgesChange, onNodesChange } = useCondition();

  return (
    <div style={{ width: "100vw", height: "100vh", border: "4px dotted black" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      />
    </div>
  );
}
