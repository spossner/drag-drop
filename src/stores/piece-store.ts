import create from "zustand";
import { ChessPiece, isValidMove } from "../utils/chess";

interface PieceState {
  type: ChessPiece;
  position: string;
  setPosition: (newPosition: string) => void;
  setType: (newType: ChessPiece) => void;
}

export const usePieceStore = create<PieceState>((set) => ({
  type: ChessPiece.ROOK,
  position: "A1",
  setPosition: (newPosition) =>
    set((state) => ({
      position: isValidMove(state.type, state.position, newPosition)
        ? newPosition
        : state.position,
    })),
  setType: (newType) => set(() => ({ type: newType })),
}));
