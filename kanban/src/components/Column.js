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
  // console.log(columnItems.length);
  const cardContent = prompt("Type task name to add");
  const newCard = {
    // _id: "",
    content: cardContent,
    row_index: columnItems.length
  };

  socket.emit("create-note", { ...newCard, column_id: columnId }, res => {
    if (res.status) {
      newCard._id = res.payload._id;
      addCard(newCard, columnId);
      console.log(res.payload._id);
      // console.log(res);
    } else {
      alert("Error: server returned false status");
    }
  });
};

const Column = ({ column }) => {
  const { id, name, items } = column;

  const { socket, addCard, setColumns } = useContext(GlobalContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      key={id}
    >
      <h3>{name}</h3>
      <div style={{ margin: 8 }}>
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
                  minHeight: 500
                }}
              >
                {items
                  .sort((a, b) => a.row_index - b.row_index)
                  .map(item => (
                    <Card card={item} columnId={column.id} />
                  ))}
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <button
                    onClick={e =>
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
  );
};

export default Column;
