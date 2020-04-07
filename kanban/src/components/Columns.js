import React, { useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { GlobalContext } from "../context/GlobalState";

import Column from "./Column";

const onDragEnd = (result, columns, moveCard, socket) => {
  if (!result.destination) return;

  const { draggableId, source, destination } = result;

  const card = columns
    .map((column) => column.items.filter((item) => item.id === draggableId))
    .flat()[0];
  let flag = columns.filter((column) => column.id === destination.droppableId);
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
      source_column_id: source.droppableId,
    },
    (res) => {
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
const addNewColumn = (columns, socket, addColumnFunc, setColumns, users) => {
  const newName = prompt("Type column name: ");
  const maxLimit = prompt("Type max tasks limit: ");
  users.map((user, idx) => {
    socket.emit(
      "create-column",
      {
        project_id: "5e877170c2386013906d7421",
        name: newName,
        board_index: Math.floor(columns.length / users.length),
        max_tasks: parseInt(maxLimit),
        user: user.name,
        col_row_index: idx,
      },
      (res) => {
        if (res.status) {
          addColumnFunc(
            res.payload._id,
            newName,
            maxLimit,
            Math.floor(columns.length / users.length),
            user.name,
            idx
          );
        } else {
          alert("Error: server returned false status");
        }
      }
    );
    // setColumns([
    //   ...columns,
    //   {
    //     id: idcolumn,
    //     name: newName,
    //     max_tasks: maxLimit,
    //     items: [],
    //     board_index: columns.length / users.length,
    //     user: user.name,
    //     col_row_index: idx,
    //   },
    // ]);
  });
};
const AddColumnBtn = ({
  columnsItems,
  socket,
  addColumnFunc,
  setColumns,
  users,
}) => {
  return (
    <button
      onClick={() =>
        addNewColumn(columnsItems, socket, addColumnFunc, setColumns, users)
      }
      style={{ height: "40px", marginTop: "85px" }}
    >
      Add new column
    </button>
  );
};
const Columns = ({ columns }) => {
  const { socket, moveCard, addColumn, setColumns, users } = useContext(
    GlobalContext
  );

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, moveCard, socket)}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {users.map((user) => (
          <div style={{ display: "flex", borderTop: "2px solid black" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100px",
              }}
            >
              {user.name}
            </div>

            {columns
              .sort((a, b) => a.board_index - b.board_index)
              .filter((column) => column.user == user.name)
              .map((column) => (
                <div
                  style={{
                    borderLeft: "5px solid green",
                  }}
                >
                  <Column column={column} />
                </div>
              ))}
          </div>
        ))}
      </div>
      <AddColumnBtn
        columnsItems={columns}
        addColumnFunc={addColumn}
        socket={socket}
        setColumns={setColumns}
        users={users}
      ></AddColumnBtn>
    </DragDropContext>
  );
};

export default Columns;
