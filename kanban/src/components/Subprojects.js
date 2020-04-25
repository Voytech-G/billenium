import React, { useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { GlobalContext } from "../context/GlobalState";

import Subproject from "./Subproject";
import Column from "./Column";

const onDragEnd = (
  result,
  columns,
  moveCard,
  socket,
  subprojects,
  droppables
) => {
  if (!result.destination) return;

  const { draggableId, source, destination } = result;

  // const card = columns.map((column) =>
  //   column.tasks.filter((task) => task.id === draggableId)
  // );
  const droppableItem = droppables
    .filter((droppable) => droppable.dropId === source.droppableId)
    .flat()[0];

  const columnItem = columns
    .filter((column) => column.id === droppableItem.colId)
    .flat()[0];

  const card = columnItem.tasks
    .filter((task) => task.id === draggableId)
    .flat()[0];
  console.log(card);
  // let flag = columns.filter(
  //   (column) => column.board_index === destination.droppableBoardIndex
  // );
  // console.log(flag.flat()[0].items.length);
  // const subIndex = droppables.filter(
  //   (droppable) => droppable.id === destination.droppableId
  // );
  const destColId = droppables.filter(
    (droppable) => droppable.dropId === destination.droppableId
  )[0].colId;

  const destSubId = droppables.filter(
    (droppable) => droppable.dropId === destination.droppableId
  )[0].subId;

  const sourceColId = droppables.filter(
    (droppable) => droppable.dropId === source.droppableId
  )[0].colId;

  const sourceSubId = droppables.filter(
    (droppable) => droppable.dropId === source.droppableId
  )[0].subId;

  moveCard(
    card,
    sourceColId,
    sourceSubId,
    destColId,
    destSubId,
    destination.index
  );

  socket.emit(
    "move-task",
    {
      task_id: card.id,
      content: card.content,

      target_row_index: destination.index,
      target_column_id: destColId,
      target_subproject_id: destSubId,

      source_row_index: source.index,
      source_column_id: sourceColId,
      source_subproject_id: sourceSubId,
    },
    (res) => {
      if (!res.status) {
        moveCard(
          card,
          sourceColId,
          sourceSubId,
          destColId,
          destSubId,
          destination.index
        );

        alert("Error: server returned false status");
      }
    }
  );
};
const addNewColumn = (columns, socket, addColumnFunc, setColumns) => {
  const newName = prompt("Type column name: ");
  const maxLimit = prompt("Type max tasks limit: ");
  socket.emit(
    "create-column",
    {
      project_id: "5e98b06eb1b4ab474090034b",
      name: newName,
      board_index: columns.length,
      max_tasks: maxLimit,
    },
    (res) => {
      if (res.status) {
        console.log(res);
        addColumnFunc(res.payload._id, newName, maxLimit, columns.length);
        setColumns([
          ...columns,
          {
            id: res.payload._id,
            name: newName,
            max_tasks: maxLimit,
            tasks: [],
            board_index: columns.length,
            projectId: res.payload.project,
          },
        ]);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};
const addNewSubproject = (
  subprojects,
  socket,
  addSubprojectFunc,
  setSubprojects
) => {
  const newName = prompt("Type subproject name: ");
  socket.emit(
    "create-subproject",
    {
      project_id: "5e98b06eb1b4ab474090034b",
      subproject_name: newName,
      row_index: subprojects.length,
    },
    (res) => {
      if (res.status) {
        console.log(res.payload);
        addSubprojectFunc(res.payload._id, newName, subprojects.length);
        setSubprojects([
          ...subprojects,
          {
            id: res.payload._id,
            name: newName,
            tasks: [],
            board_index: subprojects.length,
            projectId: res.payload.project,
          },
        ]);
      } else {
        alert("Error: server returned false status");
      }
    }
  );
};
const AddColumnBtn = ({ columnsItems, socket, addColumnFunc, setColumns }) => {
  return (
    <button
      onClick={() =>
        addNewColumn(columnsItems, socket, addColumnFunc, setColumns)
      }
      style={{ height: "40px", marginTop: "85px" }}
    >
      Add new column
    </button>
  );
};
const AddSubprojectBtn = ({
  subprojectsItems,
  socket,
  addSubprojectFunc,
  setSubprojects,
}) => {
  return (
    <button
      onClick={() =>
        addNewSubproject(
          subprojectsItems,
          socket,
          addSubprojectFunc,
          setSubprojects
        )
      }
      style={{ height: "40px" }}
    >
      Add new subproject
    </button>
  );
};
const Subprojects = ({ subprojects }) => {
  const {
    columns,
    socket,
    moveCard,
    addColumn,
    addSubproject,
    setColumns,
    setSubprojects,
  } = useContext(GlobalContext);
  const { droppables } = useContext(GlobalContext);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        onDragEnd(result, columns, moveCard, socket, subprojects, droppables);
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          {columns
            .sort((a, b) => a.board_index - b.board_index)
            .map((column) => (
              <Column column={column} />
            ))}
        </div>
        <div
          style={{
            display: "flex",
            border: "2px solid yellow",
            flexDirection: "column",
          }}
        >
          {subprojects
            .sort((a, b) => a.row_index - b.row_index)
            .map((subprojectItem) => (
              <Subproject subproject={subprojectItem} dropabbles={droppables} />
            ))}
        </div>
        <div style={{ display: "flex" }}>
          <AddSubprojectBtn
            subprojectsItems={subprojects}
            addSubprojectFunc={addSubproject}
            socket={socket}
            setSubprojects={setSubprojects}
          ></AddSubprojectBtn>
        </div>
      </div>
      <div>
        <AddColumnBtn
          columnsItems={columns}
          addColumnFunc={addColumn}
          socket={socket}
          setColumns={setColumns}
        ></AddColumnBtn>
      </div>
    </DragDropContext>
  );
};

export default Subprojects;
