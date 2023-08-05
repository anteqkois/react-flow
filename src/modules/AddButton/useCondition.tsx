import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { Edge, Node, applyEdgeChanges, applyNodeChanges } from "reactflow";

const initialNodes = [{ id: "1", type: "condition", position: { x: 0, y: 0 }, data: { value: 1 } }];

export const ConditionContext = createContext(
  {} as {
    lastId: React.MutableRefObject<number>;
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    edges: Edge[];
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    onNodesChange: (changes: any) => void;
    onEdgesChange: (changes: any) => void;
    handleAddNode: (...rest: any) => void;
  }
);

export const ConditionProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const lastId = useRef(1);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const handleAddNode = useCallback(() => {
    console.log("Add Node");
    setNodes((nodes) => {
      const lastId = +nodes[nodes.length - 1].id;

      return nodes.concat({
        id: `${lastId + 1}`,
        type: "condition",
        position: { x: 0, y: lastId * 100 },
        data: {
          value: lastId + 1,
        },
      });
    });
  }, [nodes, setNodes]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setNodes((nodes) =>
  //       nodes.concat({
  //         id: `${lastId.current + 1}`,
  //         type: "condition",
  //         position: { x: 0, y: lastId.current * 100 },
  //         data: {
  //           value: lastId.current + 1,
  //         },
  //       })
  //     );
  //     lastId.current = lastId.current + 1;
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <ConditionContext.Provider
      value={{ lastId, nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange, handleAddNode }}
    >
      {children}
    </ConditionContext.Provider>
  );
};

export const useCondition = () => useContext(ConditionContext);
