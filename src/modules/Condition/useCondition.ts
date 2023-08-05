import { useState } from "react";
import { Edge, Node } from "reactflow";
import { data } from "../Final/data";

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
    // type: "straight",
    animated: true,
    // sourceHandle: `s_${condition._id}`,
    // sourceHandle: `a`,
  };
});

export const useCondition = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  return {nodes, setNodes, edges, setEdges}
};
