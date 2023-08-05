import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { data } from "./data";

const handleStyle = { left: 10 };

type DataProps = (typeof data)[0];

export function ConditionNode({ data }: { data: DataProps }) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div
      style={{
        background: "grey",
        padding: "0.5em",
        height: `${200 + data.triggeredTimes * 50}px`,
        opacity: "0.8",
        width: "300px",
      }}
    >
      <Handle type="target" position={Position.Top} id="a" />
      {data.name}
      <Handle type="source" position={Position.Bottom} id="a" />
      {/* {JSON.stringify(data)} */}
      {/* <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      */}
    </div>
  );
  // return (
  //   <>
  //     <Handle type="target" position={Position.Top} />
  //     <div>
  //       <label htmlFor="text">Text:</label>
  //       <input id="text" name="text" onChange={onChange} className="nodrag" />
  //     </div>
  //     <Handle type="source" position={Position.Bottom} id="a" />
  //     <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
  //   </>
  // );
}
