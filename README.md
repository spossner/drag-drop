# Playing around with react-dnd

https://react-dnd.github.io/react-dnd/about

More or less following the tutorial (https://react-dnd.github.io/react-dnd/docs/tutorial) with some tweaks matching own gusto.

- pure chess engine in utils/chess.ts
- also with some jest tests
- position of single piece is stored in a zustand store (https://github.com/pmndrs/zustand)
- piece can be moved by clicking on a valid target field (valid = chess rules for that piece)
- ..or by drag'n drop
- the piece can be exchanged randomly by another type (toggle button) following the new chess rules for that new piece

# drag n drop

- board.tsx surrounds child element with DndProvider
- square.tsx contains the logic for dropping via useDrop
  -- accepts type "piece"
  -- calculates canDrop (by checking if this square would be a valid move from outgoing position from zustand store)
  -- does the move when drop (canDrop was ensured upfront by react-dnd)
  -- and collects isOver and canDrop local state from react-dnd which in turn is used later to set the suitable color of the squares when dragging
- piece.tsx is the counterpart for dragging via useDrag
  -- sets the type "piece"
  -- monitors the isDragging into local state to dim the piece on current position to 50% while dragging away
  -- use the useDrop's dragRef to connect the piece (just a div with unicode character) with the react-dnd engine
