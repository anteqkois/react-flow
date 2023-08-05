import { useCallback } from "react";
import { Handle, Node, NodeProps, Position, useReactFlow } from "reactflow";
import { data } from "./data";

type Props = NodeProps & { data: (typeof data)[0] };

export function ConditionNode({ data, xPos, yPos}: Props) {
  const { project } = useReactFlow();

  const onClickAdd = useCallback(() => {
    // const newId = +nodes[nodes.length - 1].id + 1;

    // const newNode: Node = {
    //   id: newId.toString(),
    //   // we are removing the half of the node width (75) to center the new node
    //   // position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
    //   type: 'condition',
    //   position: project({ x: 0, y: yPos + 100 }),
    //   data: {
    //     _id: newId,
    //     id: newId,
    //     type: "Alert",
    //     user: "fji44miko3oj3902",
    //     name: `Test Alert ${newId}`,
    //     requiredValue: 1,
    //     operator: "Equal",
    //     triggeredTimes: newId,
    //     active: true,
    //     eventValidityUnix: 49378124,
    //     testMode: false,
    //     isMarketProvider: false,
    //     alert: {
    //       provider: "Trading View",
    //     },
    //   },
    //   deletable: false
    // };

    // // const newNodes = [...nodes, newNode];
    // // console.log(newNodes);

    // // setNodes(newNodes);
    // setNodes(nds => [...nds, newNode]);
  }, [project]);

  return (
    <div
      style={{
        background: "#a8a8a8",
        padding: "0.5em",
        height: `${200 + data.triggeredTimes * 50}px`,
        width: "300px",
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Top} id="a" />
      {data.name}
      <p>
        {xPos} : {yPos}
      </p>
      <div
        style={{
          width: "40px",
          height: "30px",
          borderRadius: "2px",
          bottom: "-15px",
          left: "50%",
          translate: "-50% 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "black",
          position: "absolute",
        }}
        onClick={onClickAdd}
      >
        <div style={{ color: "white", fontSize: "1.5rem", lineHeight: "1.5rem" }}>+</div>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={false} id="a" />
    </div>
  );
}
