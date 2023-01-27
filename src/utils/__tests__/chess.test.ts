import { describe, expect, test } from "@jest/globals";
import exp from "constants";
import { ChessPiece, idx2pos, isValidMove, pos2idx, pos2xy } from "../chess";

describe("pos2xy", () => {
  test("A1 is (0,0)", () => {
    expect(pos2xy("A1")).toEqual([0, 0]);
  });

  test("D6 is (3,5)", () => {
    expect(pos2xy("D6")).toEqual([3, 5]);
  });
});

describe("pos2idx", () => {
  test("A1 is 56", () => {
    expect(pos2idx("A1")).toBe(56);
  });

  test("D6 is 19", () => {
    expect(pos2idx("D6")).toBe(19);
  });
});

describe("idx2pos", () => {
  test("56 is A1", () => {
    expect(idx2pos(56)).toBe("A1");
  });

  test("19 is D6", () => {
    expect(idx2pos(19)).toBe("D6");
  });
});

describe("check valid moves", () => {
  describe("move the pawn", () => {
    test("pawn can go 1 step forward", () => {
      expect(isValidMove(ChessPiece.PAWN, "D4", "D5")).toBeTruthy();
    });
    test("pawn can go 1 step up left", () => {
      expect(isValidMove(ChessPiece.PAWN, "B6", "A7")).toBeTruthy();
    });
    test("pawn can go 1 step up right", () => {
      expect(isValidMove(ChessPiece.PAWN, "F3", "G4")).toBeTruthy();
    });
    test("pawn can not go backward", () => {
      expect(isValidMove(ChessPiece.PAWN, "A3", "A2")).toBeFalsy();
    });
    test("pawn can not go left or right", () => {
      expect(isValidMove(ChessPiece.PAWN, "C3", "B3")).toBeFalsy();
      expect(isValidMove(ChessPiece.PAWN, "C3", "D3")).toBeFalsy();
    });
    test("pawn can not go two or more fields", () => {
      expect(isValidMove(ChessPiece.PAWN, "C3", "C1")).toBeFalsy();
      expect(isValidMove(ChessPiece.PAWN, "C3", "C5")).toBeFalsy();
      expect(isValidMove(ChessPiece.PAWN, "C3", "C6")).toBeFalsy();
      expect(isValidMove(ChessPiece.PAWN, "C3", "C8")).toBeFalsy();
    });
  });

  describe("move the bishop", () => {
    test("bishop can go up right", () => {
      expect(isValidMove(ChessPiece.BISHOP, "A1", "B2")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "A1", "C3")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "A1", "E5")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "A1", "H8")).toBeTruthy();
    });
    test("bishop can go down left", () => {
      expect(isValidMove(ChessPiece.BISHOP, "B2", "A1")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "C3", "A1")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "E5", "A1")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "H8", "A1")).toBeTruthy();
    });

    test("bishop can go up left", () => {
      expect(isValidMove(ChessPiece.BISHOP, "D2", "C3")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "D2", "B4")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "D2", "A5")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "H1", "A8")).toBeTruthy();
    });
    test("bishop can go down right", () => {
      expect(isValidMove(ChessPiece.BISHOP, "C3", "D2")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "B4", "D2")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "A5", "D2")).toBeTruthy();
      expect(isValidMove(ChessPiece.BISHOP, "A8", "H1")).toBeTruthy();
    });
  });
});
