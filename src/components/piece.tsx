import { useDrag } from "react-dnd";
import { ChessPiece } from "../utils/chess";

interface PieceProps {
  type: ChessPiece;
  isBlack?: boolean;
}
const Piece = ({ type, isBlack }: PieceProps) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "piece",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div
        className={`${isBlack ? "text-black" : "text-white"} text-5xl 
      ${isDragging ? "opacity-50" : "opacity-100"} 
      cursor-move`}
        ref={dragRef}
      >
        {type}
      </div>
    </>
  );
};
export default Piece;
