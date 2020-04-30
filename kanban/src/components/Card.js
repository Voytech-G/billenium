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
            className="task-body"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="task-body__content-container">
              <span>{content}</span>
            </div>
            <div className="task-body__edit-button-container">
              <button
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
            </div>
            <div className="task-body__remove-button-container">
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
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
