import React, { useContext, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { GlobalContext } from "../context/GlobalState";
const handleClick_deleteCard = (
  e,
  removeCard,
  socket,
  setColumns,
  cardId,
  cardIndex,
  columnId
) => {
  e.preventDefault();
  removeCard(cardId, cardIndex, columnId);
  socket.emit(
    "delete-note",
    { card_id: cardId, row_index: cardIndex, column_id: columnId },
    res => {
      if (res.status) {
        removeCard(cardId, cardIndex, columnId);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};
const handleClick_editCard = (
  e,
  removeCard,
  socket,
  setColumns,
  cardId,
  cardIndex,
  columnId
) => {
  e.preventDefault();
  removeCard(cardId, cardIndex, columnId);
  socket.emit(
    "delete-note",
    { card_id: cardId, row_index: cardIndex, column_id: columnId },
    res => {
      if (res.status) {
        removeCard(cardId, cardIndex, columnId);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};

const Card = ({ card, columnId }) => {
  const { id, content, row_index } = card;
  const { socket, removeCard, setColumns } = useContext(GlobalContext);
  return (
    <Draggable key={id} draggableId={id} index={row_index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: 16,
              margin: "0 0 8px 0",
              minHeight: "50px",
              backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
              color: "white",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              padding: "10px",
              minHeight: "100px",
              justifyContent: "space-between",
              ...provided.draggableProps.style
            }}
          >
            {content}
            <form
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <button
                style={{}}
                onClick={e =>
                  handleClick_editCard(
                    e,
                    removeCard,
                    socket,
                    setColumns,
                    id,
                    row_index,
                    columnId
                  )
                }
                type="submit"
              >
                Edit
              </button>
              <button
                style={{}}
                onClick={e =>
                  handleClick_deleteCard(
                    e,
                    removeCard,
                    socket,
                    setColumns,
                    id,
                    row_index,
                    columnId
                  )
                }
                type="submit"
              >
                X
              </button>
            </form>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
