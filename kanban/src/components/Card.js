import React, { useContext, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { GlobalContext } from "../context/GlobalState";
const handleClick_removeCard = (
  e,
  socket,
  removeCard,
  cardId,
  cardIndex,
  columnId,
  subprojectId
) => {
  e.preventDefault();
  removeCard(cardId, cardIndex, columnId, subprojectId);
  socket.emit(
    "remove-task",
    {
      task_id: cardId,
      source_row_index: cardIndex,
      source_column_id: columnId,
      source_subproject_id: subprojectId,
    },
    (res) => {
      if (res.status) {
        removeCard(cardId, cardIndex, columnId, subprojectId);
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
  rowIndex,
  columnId,
  subprojectId,
  content
) => {
  e.preventDefault();
  const cardContent = prompt("Type new text", content);
  // editCard(cardId, rowIndex, columnId, subprojectId, cardContent);

  socket.emit(
    "update-task",
    { task_id: cardId, content: cardContent },
    (res) => {
      if (res.status) {
        editCard(cardId, rowIndex, columnId, subprojectId, cardContent);
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
                    subprojectId,
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
                    socket,
                    removeCard,
                    id,
                    row_index,
                    columnId,
                    subprojectId
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
