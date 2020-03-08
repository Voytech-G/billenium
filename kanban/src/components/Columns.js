import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { GlobalContext } from "../context/GlobalState";

import Column from "./Column";

const onDragEnd = (result, columns, moveCard) => {
  if (!result.destination) return;

  const { draggableId, source, destination } = result;

  const card = columns
    .map(column => column.items.filter(item => item.id === draggableId))
    .flat()[0];

  moveCard(
    card,
    source.droppableId,
    destination.droppableId,
    source.index,
    destination.index
  );
};

const Columns = ({ columns }) => {
  const { moveCard } = useContext(GlobalContext);

  return (
    <DragDropContext onDragEnd={result => onDragEnd(result, columns, moveCard)}>
      {columns
        .sort((a, b) => a.board_index - b.board_index)
        .map(column => (
          <Column column={column} />
        ))}
    </DragDropContext>
  );
};

export default Columns;
