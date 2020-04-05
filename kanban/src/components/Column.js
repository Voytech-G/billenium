import React, { useContext, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

import { GlobalContext } from "../context/GlobalState";

import Card from "./Card";

const handleClick_addCard = (
  e,
  columnId,
  addCard,
  socket,
  columnItems,
  setColumns
) => {
  e.preventDefault();

  const cardContent = prompt("Type task name to add");
  const newCard = {
    // _id: "",
    content: cardContent,
    row_index: columnItems.length,
  };

  socket.emit(
    "create-task",
    { ...newCard, column_id: columnId, max_tasks: 3 },
    (res) => {
      if (res.status) {
        newCard._id = res.payload._id;
        addCard(newCard, columnId);
        console.log(res.payload._id);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};
const Amount = ({ amount, maxTasks }) => {
  return (
    <h5
      style={{ margin: "0px 0 0 5px" }}
      className={amount > maxTasks ? "taskLimit" : false}
    >
      {amount}/{maxTasks}
    </h5>
  );
};
const deleteColumn = (removeColumn, socket, id, boardIndex) => {
  socket.emit(
    "remove-column",
    { column_id: id, board_index: boardIndex },
    (res) => {
      if (res.status) {
        removeColumn(id, boardIndex);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};
const DeleteColumnBtn = ({ removeColumn, socket, columnId, boardIndex }) => {
  return (
    <button
      onClick={() => deleteColumn(removeColumn, socket, columnId, boardIndex)}
      style={{ display: "flex", margin: "0 auto", height: "40px" }}
    >
      Delete column
    </button>
  );
};
const updateColumn = (
  editColumn,
  socket,
  columnId,
  columnName,
  boardIndex,
  maxTasks,
  btnName
) => {
  if (btnName == "name") {
    const new_name = prompt("Type new column name: ", columnName);
    socket.emit(
      "update-column",
      {
        column_id: columnId,
        board_index: boardIndex,
        name: new_name,
        max_tasks: maxTasks,
      },
      (res) => {
        if (res.status) {
          editColumn(columnId, new_name, boardIndex, maxTasks);
        } else {
          alert("Error: server returned false status");
        }
      }
    );
  } else {
    const new_maxTasks = parseInt(prompt("Change task limit: ", maxTasks));
    socket.emit(
      "update-column",
      {
        column_id: columnId,
        board_index: boardIndex,
        name: columnName,
        max_tasks: new_maxTasks,
      },
      (res) => {
        if (res.status) {
          editColumn(columnId, columnName, boardIndex, new_maxTasks);
        } else {
          alert("Error: server returned false status");
        }
      }
    );
  }
};
const ChangeColumnNameBtn = ({
  editColumn,
  socket,
  columnId,
  columnName,
  boardIndex,
  maxTasks,
  btnName,
}) => {
  return (
    <button
      onClick={() =>
        updateColumn(
          editColumn,
          socket,
          columnId,
          columnName,
          boardIndex,
          maxTasks,
          btnName
        )
      }
      style={{ display: "flex", margin: "0 auto", height: "40px" }}
    >
      Change name
    </button>
  );
};
const ChangeMaxLimitBtn = ({
  editColumn,
  socket,
  columnId,
  columnName,
  boardIndex,
  maxTasks,
  btnName,
}) => {
  return (
    <button
      onClick={() =>
        updateColumn(
          editColumn,
          socket,
          columnId,
          columnName,
          boardIndex,
          maxTasks,
          btnName
        )
      }
      style={{ display: "flex", margin: "0 auto", height: "40px" }}
    >
      Change limit
    </button>
  );
};
const Column = ({ column, user }) => {
  const { id, name, items, max_tasks, board_index } = column;
  const { socket, addCard, setColumns, removeColumn, editColumn } = useContext(
    GlobalContext
  );
  return (
    <div style={{ borderBottom: "5px solid black" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        key={id}
      >
        <div style={{ display: "flex" }}>
          <ChangeMaxLimitBtn
            editColumn={editColumn}
            socket={socket}
            columnId={id}
            boardIndex={board_index}
            btnName={"limit"}
            maxTasks={max_tasks}
            columnName={name}
          ></ChangeMaxLimitBtn>
          <ChangeColumnNameBtn
            editColumn={editColumn}
            socket={socket}
            columnId={id}
            boardIndex={board_index}
            btnName={"name"}
            maxTasks={max_tasks}
            columnName={name}
          ></ChangeColumnNameBtn>
          <DeleteColumnBtn
            removeColumn={removeColumn}
            socket={socket}
            columnId={id}
            boardIndex={board_index}
          ></DeleteColumnBtn>
        </div>
        <h3>{name}</h3>
        <Amount amount={items.length} maxTasks={max_tasks}></Amount>
        <div
          style={{
            margin: 8,
            boxSizing: "border-box",
          }}
        >
          <Droppable
            droppableId={id}
            key={id}
            className="taskLimitColumn"
            style={{ backgroundColor: "red" }}
          >
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "lightblue"
                      : "lightgrey",
                    padding: 4,
                    width: 250,
                  }}
                >
                  {items
                    .sort((a, b) => a.row_index - b.row_index)
                    .map((item) => (
                      <Card card={item} columnId={column.id} />
                    ))}
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <button
                      onClick={(e) =>
                        handleClick_addCard(
                          e,
                          column.id,
                          addCard,
                          socket,
                          column.items,
                          setColumns
                        )
                      }
                      type="submit"
                    >
                      Add task
                    </button>
                  </form>
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default Column;
