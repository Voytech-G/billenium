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
const Subproject = ({ subproject }) => {
  const id = uuid();
  const {
    columns,
    socket,
    addCard,
    setColumns,
    removeColumn,
    editColumn,
  } = useContext(GlobalContext);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex" }}>
          <h4> {subproject.name}</h4>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          border: "2px solid red",
          justifyContent: "space-between",
        }}
        key={id}
      >
        {columns.map((column) => (
          <div
            style={{
              margin: 8,
              backgroundColor: "green",
              border: "2px solid green",
              display: "flex",
            }}
          >
            <Droppable droppableId={id} key={id}>
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
                      minHeight: 200,
                    }}
                  >
                    {/* {tasks
                      .sort((a, b) => a.row_index - b.row_index)
                      .map((item) => (
                        <Card card={item} columnId={column.id} />
                      ))}*/}
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
                            column.tasks,
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
        ))}
      </div>
    </div>
  );
};

export default Subproject;
