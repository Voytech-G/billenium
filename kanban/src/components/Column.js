import React, { useContext } from "react";
import { Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

import { GlobalContext } from "../context/GlobalState";

import Card from "./Card";

const handleClick_addCard = (e, columnId, addCard, socket) => {
  e.preventDefault();

  const cardContent = prompt(
    "wpisz deskrypcję zadania należnego do jego skompletowania"
  );
  const newCard = { _id: uuid(), content: cardContent, row_index: 0 };

  socket.emit("create-note", { ...newCard, column_id: columnId }, res => {
    if (res.status) {
      addCard(newCard, columnId);
    } else {
      alert("Error: server returned false status");
    }
  });
};

const Column = ({ column }) => {
  const { id, name, items } = column;

  const { socket, addCard } = useContext(GlobalContext);

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
                    <Card card={item} />
                  ))}
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <button
                    onClick={e =>
                      handleClick_addCard(e, column.id, addCard, socket)
                    }
                    type="submit"
                  >
                    Dodaj zadanie
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
