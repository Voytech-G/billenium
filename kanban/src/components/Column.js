import React, { useContext, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

import { GlobalContext } from "../context/GlobalState";

import Card from "./Card";

const Amount = ({ amount, maxTasks }) => {
  return (
    <div className="column__header-bottom--amount">
      {amount}/{maxTasks}
    </div>
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
      className="settings-button column__settings-button--delete"
      onClick={() => deleteColumn(removeColumn, socket, columnId, boardIndex)}
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
      className="settings-button column__settings-button--change-name"
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
      className="settings-button column__settings-button--change-max-limit"
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
    >
      Change limit
    </button>
  );
};
const Column = ({ column }) => {
  const { id, name, tasks, max_tasks, board_index } = column;
  const { socket, removeColumn, editColumn } = useContext(GlobalContext);
  return (
    <div className="column__header" key={id}>
      <div className="column__header-top">
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
      <div className="column__header-bottom--container">
        <div className="column__header-bottom--title-container">
          <span>{name}</span>
        </div>
        <Amount amount={tasks.length} maxTasks={max_tasks}></Amount>
      </div>
    </div>
  );
};

export default Column;
