import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card }) => {
  const { id, content, row_index } = card;

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
              ...provided.draggableProps.style
            }}
          >
            {content}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
