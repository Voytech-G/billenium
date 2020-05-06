import React, { useContext, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { GlobalContext } from "../context/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
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
const unAssignUser = (userId, taskId, unassignUserTask, socket) => {
  socket.emit(
    "task-unassign-user",
    { user_id: userId, task_id: taskId },
    (res) => {
      if (res.status) {
        unassignUserTask(userId, taskId);
        console.log(res.status);
      } else {
        console.log(res.status);
      }
    }
  );
};
const colorChange = (id, changeColor, tasks, taskColors) => {
  let actualColorIndex = tasks.filter((task) => task._id === id)[0].colorId;
  console.log(taskColors[actualColorIndex]);
  if (actualColorIndex != 4) {
    changeColor(id, ++actualColorIndex);
    // console.log(actualColorIndex);
  } else {
    actualColorIndex = 0;
    changeColor(id, actualColorIndex);
    // console.log(actualColorIndex);
  }
};
const Card = ({ card, columnId, subprojectId }) => {
  const { id, content, row_index } = card;
  const {
    socket,
    removeCard,
    editCard,
    setColumns,
    setSubprojects,
    setForm,
    setChosenTask,
    tasks,
    unassignUserTask,
    changeColor,
    task,
    taskColors,
  } = useContext(GlobalContext);
  // const taskItem = tasks.filter((task) => task._id === id)[0];

  return (
    <Draggable key={id} draggableId={id} index={row_index}>
      {(provided, snapshot) => {
        let userCounter = 3;
        let colorId = 0;
        let nextColorId = 1;
        return (
          <div
            className="task-body"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{}}
          >
            <div className="task-body__task-container">
              <div className="task-body__content-container">{content}</div>
              <div className="task-body__buttons_container">
                <div className="task-body__userbuttons_container">
                  {tasks
                    .filter((taskElement) => taskElement._id === id)
                    .map((taskItem) => {
                      colorId = taskItem.colorId;
                      nextColorId = colorId === 4 ? 0 : ++colorId;
                      return taskItem.users.map((user) => {
                        userCounter--;
                        return (
                          <div
                            className={"task-body__username-initials"}
                            onClick={(e) =>
                              unAssignUser(
                                user._id,
                                taskItem._id,
                                unassignUserTask,
                                socket
                              )
                            }
                          >
                            {user.initials}
                          </div>
                        );
                      });
                    })}
                  {Array.from(Array(userCounter), (e, i) => {
                    return (
                      <div>
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          className="task-body__userbutton"
                          onClick={() => {
                            setForm(true);
                            setChosenTask(id);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="task-body__settingsbuttons_container">
                  <div
                    className="task-body__button--colorchanger"
                    style={{ backgroundColor: taskColors[nextColorId] }}
                    onClick={() =>
                      colorChange(id, changeColor, tasks, taskColors)
                    }
                  ></div>
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
                      className={"task-body__button"}
                    >
                      <FontAwesomeIcon icon={faEdit} />
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
                      className={"task-body__button"}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
