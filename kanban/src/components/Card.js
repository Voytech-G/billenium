import React, { useContext, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { GlobalContext } from "../context/GlobalState";
const handleClick_removeCard = (
  e,
  removeCard,
  socket,
  setColumns,
  cardId,
  cardIndex,
  columnId
) => {
  e.preventDefault();
  socket.emit(
    "remove-task",
    {
      task_id: cardId,
      source_row_index: cardIndex,
      source_column_id: columnId,
    },
    (res) => {
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
  editCard,
  socket,
  setColumns,
  cardId,
  cardIndex,
  columnId,
  content
) => {
  e.preventDefault();
  const cardContent = prompt("Type new text", content);
  console.log(cardContent);
  socket.emit(
    "update-task",
    { task_id: cardId, content: cardContent },
    (res) => {
      if (res.status) {
        editCard(cardId, cardIndex, columnId, cardContent);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};

const Card = ({ card, columnId, subprojectId }) => {
  const { id, content, row_index } = card;
  const {
    socket,
    removeCard,
    editCard,
    setColumns,
    setSubprojects,
  } = useContext(GlobalContext);
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
              ...provided.draggableProps.style,
            }}
          >
            {content}
            <form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                style={{}}
                onClick={(e) =>
                  handleClick_editCard(
                    e,
                    editCard,
                    socket,
                    setColumns,
                    id,
                    row_index,
                    columnId,
                    content
                  )
                }
                type="submit"
              >
                Edit
              </button>
              <button
                style={{}}
                onClick={(e) =>
                  handleClick_removeCard(
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
