export enum ChessPiece {
  PAWN = "♟",
  BISHOP = "♝",
  KNIGHT = "♞",
  ROOK = "♜",
  QUEEN = "♛",
  KING = "♚",
}

export const pos2xy = (pos: string): [number, number] => {
  const x = pos.toUpperCase().charCodeAt(0) - 65;
  const y = pos.charCodeAt(1) - 49;
  return [x, y];
};
export const pos2idx = (pos: string): number => {
  const [x, y] = pos2xy(pos);
  return (7 - y) * 8 + x;
};
export const idx2pos = (idx: number): string => {
  const x = String.fromCharCode((idx % 8) + 65);
  const y = String.fromCharCode(7 - Math.floor(idx / 8) + 49);
  return `${x}${y}`;
};

export const isValidMove = (
  type: ChessPiece,
  from: string,
  to: string
): boolean => {
  if (from === to) return false;

  const [x1, y1] = pos2xy(from);
  const [x2, y2] = pos2xy(to);
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);

  switch (type) {
    case ChessPiece.PAWN:
      return y2 === y1 + 1 && dx < 2;
    case ChessPiece.BISHOP:
      return dx === dy;
    case ChessPiece.KNIGHT:
      return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    case ChessPiece.ROOK:
      return (dx === 0 && dy !== 0) || (dx !== 0 && dy === 0);
    case ChessPiece.QUEEN:
      return dx === dy || (dx === 0 && dy !== 0) || (dx !== 0 && dy === 0);
    case ChessPiece.KING:
      return dx < 2 && dy < 2;
  }
};
