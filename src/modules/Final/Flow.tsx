import ReactFlow, { Edge, Node, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from "reactflow";
import { data } from "./data";
import { useCallback, useRef } from "react";

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
    deletable: false,
    // draggable: false,
  };
});

const initialEdges = data.map((condition, index): Edge => {
  return {
    id: `e_${condition._id}`,
    source: data[index - 1]?._id,
    target: condition._id,
    animated: true,
  };
});

let id = 1;
const getId = () => `${id++}`;

export const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const handleNodeClick = (e, data) => {};
  const nodeTypes = { condition: ConditionNode };

  return (
    <ReactFlowProvider>
      <div style={{ width: "100vw", height: "100vh", border: "4px dotted black" }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
          maxZoom={0.9}
          defaultViewport={{ x: 1, y: 1, zoom: 0.5 }}
          fitViewOptions={{
            padding: 1,
          }}
        ></ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};
