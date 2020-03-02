import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
const form = {};
const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" }
];
const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "Todo",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log(destination);
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};
const handleClick = (e, cid, columns, setColumns, itemsBackend, setItems) => {
  // const columnItems = [...selectedColumn.items];
  e.preventDefault();
  // console.log(columns[cid]);
  const newCard = { id: uuid(), content: "Six" };
  setItems([...itemsBackend, newCard]);
  const parentColumn = columns[cid];
  const parentItems = [...parentColumn.items, newCard];
  setColumns({
    ...columns,
    [cid]: {
      ...parentColumn,
      items: parentItems
    }
  });
  console.log(itemsBackend);
  // console.log(parentItems);
  // console.log(items);
  // onDragEnd(result, columns, setColumns);
};

// const update = e => {
//   form[e.target.name] = e.target;
// };
// const formSubmit = e => {
//   let value = form["cardContent"].value;
//   console.log(value);
//   form["cardContent"].value = "";
//   // window.render();
// };
function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [itemsBackend, setItems] = useState(itemsFromBackend);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h3>{column.name}</h3>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
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
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
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
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        <form
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <textarea
                            name="cardContent"
                            style={{
                              minHeight: "50px",
                              maxHeight: "200px",
                              maxWidth: "97%",
                              minWidth: "97%"
                            }}
                          />
                          <button
                            onClick={e =>
                              handleClick(
                                e,
                                columnId,
                                columns,
                                setColumns,
                                itemsBackend,
                                setItems
                              )
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
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
