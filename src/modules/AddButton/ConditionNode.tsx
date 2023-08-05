import { NodeProps } from "reactflow";
import { useCondition } from "./useCondition";
import { useEffect } from "react";

export const ConditionNode = ({ data, id }: NodeProps) => {
  const { handleAddNode } = useCondition();

  return (
    <>
      <div
        style={{ height: "100px", width: "200px", backgroundColor: "blanchedalmond", position: "relative" }}
      >
        {id}
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
        >
          <div style={{ color: "white", fontSize: "1.5rem", lineHeight: "1.5rem" }} onClick={handleAddNode}>
            +
          </div>
        </div>
      </div>
    </>
  );
};
