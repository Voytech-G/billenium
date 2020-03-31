import React, { useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { GlobalContext } from "../context/GlobalState";

import Column from "./Column";

const onDragEnd = (result, columns, moveCard, socket) => {
  if (!result.destination) return;

  const { draggableId, source, destination } = result;

  const card = columns
    .map(column => column.items.filter(item => item.id === draggableId))
    .flat()[0];
  let flag = columns.filter(column => column.id === destination.droppableId);
  console.log(flag.flat()[0].items.length);

  moveCard(
    card,
    source.droppableId,
    destination.droppableId,
    source.index,
    destination.index
  );

  socket.emit(
    "move-task",
    {
      task_id: card.id,
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
};
const addNewColumn = (columns, socket, addColumnFunc) => {
  const newName = prompt("Type column name: ");
  const maxLimit = prompt("Type max tasks limit: ");
  socket.emit(
    "create-column",
    { name: newName, board_index: columns.length, max_tasks: maxLimit },
    res => {
      if (res.status) {
        console.log(res.payload);
        addColumnFunc(res.payload.columnId, newName, maxLimit, columns.length);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};
const AddColumnBtn = ({ columnsItems, socket, addColumnFunc }) => {
  return (
    <button
      onClick={() => addNewColumn(columnsItems, socket, addColumnFunc)}
      style={{ height: "40px", marginTop: "85px" }}
    >
      Add new column
    </button>
  );
};
const Columns = ({ columns }) => {
  const { socket, moveCard, addColumn } = useContext(GlobalContext);

  return (
    <DragDropContext
      onDragEnd={result => onDragEnd(result, columns, moveCard, socket)}
    >
      <AddColumnBtn
        columnsItems={columns}
        addColumnFunc={addColumn}
        socket={socket}
      ></AddColumnBtn>
      {columns
        .sort((a, b) => a.board_index - b.board_index)
        .map(column => (
          <Column column={column} />
        ))}
    </DragDropContext>
  );
};

export default Columns;
