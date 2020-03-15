import React from "react";
import { Draggable } from "react-beautiful-dnd";

const handleClick_deleteCard = e => {
  e.preventDefault();
  console.log(e);
};

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
                  handleClick_deleteCard(
                    e
                    // column.id,
                    // addCard,
                    // socket,
                    // column.items,
                    // setColumns
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
