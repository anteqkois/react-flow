import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  Node,
  Position,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import { ConditionNode } from "./ConditionNode";
import { data } from "./data";

const rfStyle = {
  // backgroundColor: "#B8CEFF",
};

let triggerTimesTotal = 0;
const initialNodes = data.map((condition, index): Node => {
  triggerTimesTotal += condition.triggeredTimes;

  return {
    id: condition._id,
    type: "condition",
    position: {
      x: 0,
      y: index * 50 + index * 200 + triggerTimesTotal * 50, // bazując na ilości trigerów (w realu to będzie określane za pomocą tego jakie pola zawiera warunek)
    },
    data: condition,
    // draggable: false,
    // deletable: false,
  };
});

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { condition: ConditionNode };

export function COnditionsFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    // @ts-ignore
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    // @ts-ignore
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds: Edge[]) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh", border: "4px dotted black" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      >
        <Controls />
        {/* <MiniMap /> */}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
