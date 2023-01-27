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
      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-end w-3/4 max-w-xl">
          <button
            onClick={toggleType}
            className="bg-slate-600 hover:bg-slate-500 rounded shadow text-white px-4 py-2 text-xl"
          >
            Toggle
          </button>
        </div>
        <div className="grid grid-cols-8 gap-0 w-3/4 max-w-xl mx-auto border-2 border-slate-600">
          {squares}
        </div>
      </div>
    </DndProvider>
  );
};
export default Board;
