import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { GlobalContext } from "../context/GlobalState";

import Column from "./Column";

const onDragEnd = (result, columns, moveCard, socket) => {
  if (!result.destination) return;

  const { draggableId, source, destination } = result;

  const card = columns
    .map(column => column.items.filter(item => item.id === draggableId))
    .flat()[0];
  // console.log("Source:" + source.index);
  // console.log("Source" + source.index);
  let flag = columns.filter(column => column.id === destination.droppableId);
  console.log(flag.flat()[0].items.length);
  // console.log(destination.droppableId);
  // console.log(destination.droppableId);
  if (
    source.droppableId !== destination.droppableId &&
    flag.flat()[0].items.length >= 3
  ) {
    alert("Column must not have more than 3 cards!");
  } else {
    moveCard(
      card,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );

    socket.emit(
      "move-note",
      {
        note_id: card.id,
        content: card.content,

        target_row_index: destination.index,
        target_column_id: destination.droppableId,

        source_row_index: source.index,
        source_column_id: source.droppableId
      },
      res => {
        if (!res.status) {
          moveCard(
            card,
            destination.droppableId,
            source.droppableId,
            destination.index,
            source.index
          );

          alert("Error: server returned false status");
        }
      }
    );
  }
};

const Columns = ({ columns }) => {
  const { socket, moveCard } = useContext(GlobalContext);

  return (
    <DragDropContext
      onDragEnd={result => onDragEnd(result, columns, moveCard, socket)}
    >
      {columns
        .sort((a, b) => a.board_index - b.board_index)
        .map(column => (
          <Column column={column} />
        ))}
    </DragDropContext>
  );
};

export default Columns;
