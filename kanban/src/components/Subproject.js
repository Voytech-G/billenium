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
  tasks
) => {
  e.preventDefault();
  const cardContent = prompt("Type task name to add");
  let itemCount = 0;

  {
    tasks
      .sort((a, b) => a.row_index - b.row_index)
      .filter((task) => task.column_id === columnId)
      .map((item) => {
        console.log(item);
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

const Subproject = ({ subproject }) => {
  const { subId, name, tasks } = subproject;
  const {
    columns,
    subprojects,
    socket,
    addCard,
    setColumns,
    setSubprojects,
    subColItems,
  } = useContext(GlobalContext);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex" }}>
          <h4>{name}</h4>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          border: "2px solid red",
          justifyContent: "space-between",
        }}
        key={subId}
      >
        {columns.map((column) => {
          const id = uuid();
          return (
            <div
              style={{
                margin: 8,
                border: "2px solid green",
                display: "flex",
                flexGrow: "1",
                justifyContent: "center",
                boxSizing: "border-box",
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
                              subproject.id,
                              addCard,
                              socket,
                              tasks
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
          );
        })}
      </div>
    </div>
  );
};

export default Subproject;
