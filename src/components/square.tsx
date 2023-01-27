import { stat } from "fs";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { usePieceStore } from "../stores/piece-store";
import { ChessPiece, idx2pos, isValidMove } from "../utils/chess";

interface SquareProps {
  idx: number;
  children?: ReactNode;
}
const Square = ({ children, idx }: SquareProps) => {
  const state = usePieceStore();
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: "piece",
      canDrop: () => isValidMove(state.type, state.position, idx2pos(idx)),
      drop: () => state.setPosition(idx2pos(idx)),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [idx, state]
  );

  const isBlack = idx % 2 === (idx >> 3) % 2;
  return (
    <>
      <div
        className={`
        ${isBlack ? "bg-slate-600" : "bg-slate-300"}
          ${!isOver && canDrop && "bg-yellow-200"}
          ${isOver && canDrop && "bg-green-200"}
          ${isOver && !canDrop && "bg-red-200"}
          w-full h-full aspect-square flex justify-center items-center`}
        ref={dropRef}
      >
        {children}
      </div>
    </>
  );
};
export default Square;
