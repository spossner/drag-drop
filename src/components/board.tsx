import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { usePieceStore } from "../stores/piece-store";
import { ChessPiece, idx2pos, pos2idx } from "../utils/chess";

import Piece from "./piece";
import Square from "./square";

var _ = require("lodash");

const Board = () => {
  const squares = [];
  const state = usePieceStore();
  const idx = pos2idx(state.position);

  function handleClick(idx: number) {
    state.setPosition(idx2pos(idx));
  }

  function toggleType() {
    let newType = state.type;
    while (newType === state.type) {
      newType = _.sample(Object.values(ChessPiece));
    }
    state.setType(newType);
  }

  for (let i = 0; i < 64; i++) {
    squares.push(
      <div key={i} onClick={() => handleClick(i)}>
        <Square idx={i}>{i === idx && <Piece type={state.type} />}</Square>
      </div>
    );
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-8 gap-0 max-w-lg mx-auto border-2 border-slate-600">
        {squares}
      </div>
      <div>
        <button onClick={toggleType}>Toggle</button>
      </div>
    </DndProvider>
  );
};
export default Board;
