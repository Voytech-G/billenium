import React, { useContext, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

import { GlobalContext } from "../context/GlobalState";

import Card from "./Card";

const handleClick_addCard = (
  e,
  columnId,
  subprojectId,
  addCard,
  socket,
  tasks,
  addTask
) => {
  e.preventDefault();
  const cardContent = prompt("Type task name to add");
  let itemCount = 0;
  {
    tasks
      .sort((a, b) => a.row_index - b.row_index)
      .filter((task) => task.column_id === columnId)
      .map((item, idx) => {
        itemCount = ++idx;
      });
  }

  const newCard = {
    content: cardContent,
    row_index: itemCount,
  };

  socket.emit("create-task", { ...newCard, column_id: columnId }, (res) => {
    if (res.status) {
      newCard._id = res.payload._id;
      addCard(newCard, columnId, subprojectId);
      addTask(res.payload._id, []);
      socket.emit(
        "subproject-assign-task",
        { task_id: res.payload._id, subproject_id: subprojectId },
        (res) => {
          if (res.status) {
            console.log("Task assigned");
          } else {
            alert(`Error: ${res.message}`);
          }
        }
      );
    } else {
      alert("Error: server returned false status");
    }
  });
};
const editSub = (changeSub, socket, subId, subName) => {
  const content = prompt("Type new subproject name: ", subName);
  socket.emit(
    "update-subproject",
    {
      subproject_id: subId,
      subproject_name: content,
    },
    (res) => {
      if (res.status) {
        changeSub(subId, content);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};
const EditButton = ({ changeSub, socket, subId, subName }) => {
  return (
    <button
      style={{ height: "40px", margin: "5px 5px 5px 5px" }}
      onClick={() => editSub(changeSub, socket, subId, subName)}
      className="settings-button"
    >
      Edit
    </button>
  );
};
const removeSubproject = (removeSub, socket, subId, subIndex) => {
  socket.emit(
    "remove-subproject",
    {
      subproject_id: subId,
      project_id: "5e98b06eb1b4ab474090034b",
    },
    (res) => {
      if (res.status) {
        removeSub(subId, subIndex);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};
const DeleteButton = ({ removeSub, socket, subId, subIndex }) => {
  return (
    <button
      style={{ height: "40px", margin: "5px 5px 5px 5px" }}
      onClick={() => removeSubproject(removeSub, socket, subId, subIndex)}
      className="settings-button"
    >
      Delete
    </button>
  );
};

const Subproject = ({ subproject }) => {
  const { id, name, tasks, row_index } = subproject;
  const {
    columns,
    subprojects,
    socket,
    addCard,
    setColumns,
    setSubprojects,
    subColItems,
    setDroppables,
    droppables,
    changeSub,
    removeSub,
    addTask,
  } = useContext(GlobalContext);
  const droppablesArr = [];
  useEffect(() => {
    setDroppables(droppablesArr);
  }, []);
  return (
    <div>
      <div className="subproject-container">
        <div className="subproject-container__name-container">
          <h4>{name}</h4>
          <div>
            <EditButton
              changeSub={changeSub}
              socket={socket}
              subId={id}
              subName={name}
            />
            <DeleteButton
              removeSub={removeSub}
              socket={socket}
              subId={id}
              subIndex={row_index}
            />
          </div>
        </div>
      </div>
      <div className="subproject-container__tasks-container" key={id}>
        {columns.map((column, idx) => {
          return (
            <div
              style={{
                margin: "0 5px 0 5px",
                flexGrow: "1",
                justifyContent: "center",
                boxSizing: "border-box",
                width: "309.5px",
              }}
            >
              <Droppable
                droppableId={`${id}-${idx}`}
                key={`${id}-${idx}`}
                droppableBoardIndex={idx}
                droppableRowIndex={row_index}
              >
                {(provided, snapshot) => {
                  {
                    droppablesArr.push({
                      dropId: `${id}-${idx}`,
                      colIdx: idx,
                      subIdx: row_index,
                      colId: column.id,
                      subId: id,
                    });
                  }
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ justifyContent: "space-between" }}
                      className={`
                        tasksarea
                        ${
                          snapshot.isDraggingOver
                            ? "tasksarea--active"
                            : "tasksarea--unactive"
                        }
                      `}
                    >
                      <div>
                        {tasks
                          .sort((a, b) => a.row_index - b.row_index)
                          .filter((task) => task.column_id === column.id)
                          .map((item) => {
                            return (
                              <Card
                                card={item}
                                columnId={column.id}
                                subprojectId={subproject.id}
                              />
                            );
                          })}
                      </div>
                      <div>
                        <form
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "0 5px 0 5px",
                          }}
                        >
                          <button
                            onClick={(e) =>
                              handleClick_addCard(
                                e,
                                column.id,
                                subproject.id,
                                addCard,
                                socket,
                                tasks,
                                addTask
                              )
                            }
                            type="submit"
                            className="button-addtask"
                          >
                            +
                          </button>
                        </form>
                      </div>
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subproject;
