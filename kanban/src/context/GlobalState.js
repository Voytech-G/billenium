import React, { createContext, useReducer } from "react";
import uuid from "uuid/v4";
import AppReducer from "./AppReducer";
import socketIOClient from "socket.io-client";

const initialState = {
  socket: undefined,
  menuActive: false,
  columns: [],
  subprojects: [],
  droppables: [],
  users: [],
  tasks: [],
  userFormActive: false,
  chosenTask: "",
  chosenUser: "",
};

initialState.socket = socketIOClient("http://localhost:4000");

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setColumns(columns) {
    dispatch({
      type: "SET_COLUMNS",
      payload: columns,
    });
  }
  function setUsers(users) {
    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  }
  function setTasks(tasks) {
    dispatch({
      type: "SET_TASKS",
      payload: tasks,
    });
  }
  function setMenu(menuActive) {
    dispatch({
      type: "SET_MENU",
      payload: !menuActive,
    });
  }
  function setForm(formActive) {
    dispatch({
      type: "SET_FORM",
      payload: formActive,
    });
  }
  function setChosenUser(chosenUser) {
    dispatch({
      type: "SET_CHOSENUSER",
      payload: {
        id: chosenUser,
      },
    });
  }
  function setChosenTask(chosenTask) {
    dispatch({
      type: "SET_CHOSENTASK",
      payload: chosenTask,
    });
  }
  function setSubprojects(subprojects) {
    dispatch({
      type: "SET_SUBPROJECTS",
      payload: subprojects,
    });
  }
  function setDroppables(droppables) {
    dispatch({
      type: "SET_DROPPABLES",
      payload: { droppables: droppables },
    });
  }
  function moveCard(
    card,
    sourceColId,
    sourceSubId,
    destColId,
    destSubId,
    destinationCardIndex
  ) {
    dispatch({
      type: "MOVE_CARD_COLUMN",
      payload: {
        card,
        source_col_id: sourceColId,
        source_sub_id: sourceSubId,
        dest_col_id: destColId,
        dest_sub_id: destSubId,
        dest_card_index: destinationCardIndex,
      },
    });
    dispatch({
      type: "MOVE_CARD_SUBPROJECT",
      payload: {
        card,
        source_col_id: sourceColId,
        source_sub_id: sourceSubId,
        dest_col_id: destColId,
        dest_sub_id: destSubId,
        dest_card_index: destinationCardIndex,
      },
    });
  }

  function addCard(card, columnId, subprojectId) {
    dispatch({
      type: "ADD_CARD_COLUMN",
      payload: {
        card: {
          id: card._id,
          content: card.content,
          row_index: card.row_index,
          column_id: columnId,
          subproject_id: subprojectId,
        },
        column_id: columnId,
      },
    });
    dispatch({
      type: "ADD_CARD_SUBPROJECT",
      payload: {
        card: {
          id: card._id,
          content: card.content,
          row_index: card.row_index,
          column_id: columnId,
          subproject_id: subprojectId,
        },
        subproject_id: subprojectId,
      },
    });
  }
  function addColumn(columnId, newName, maxLimit, subprojectColItems) {
    dispatch({
      type: "ADD_COLUMN",
      payload: {
        column: {
          id: columnId,
          name: newName,
          board_index: subprojectColItems,
          tasks: [],
          max_tasks: parseInt(maxLimit),
        },
      },
    });
  }
  function addTask(taskId, users) {
    dispatch({
      type: "ADD_TASK",
      payload: {
        task: {
          _id: taskId,
          users: users,
        },
      },
    });
  }
  function assignUserTask(chosenUser, taskId, initials) {
    console.log(chosenUser, taskId, initials);
    dispatch({
      type: "ASSIGN_USER",
      payload: {
        user: {
          task_id: taskId,
          user_id: chosenUser,
          initials: initials,
        },
      },
    });
  }
  function addSubproject(subprojectId, newName, subprojectsItems) {
    dispatch({
      type: "ADD_SUBPROJECT",
      payload: {
        subproject: {
          id: subprojectId,
          name: newName,
          row_index: subprojectsItems,
          tasks: [],
        },
      },
    });
  }
  function editCard(cardId, cardIndex, columnId, subprojectId, content) {
    dispatch({
      type: "EDIT_CARD_COLUMN",
      payload: {
        card: {
          id: cardId,
          content,
          row_index: cardIndex,
          column_id: columnId,
          subproject_id: subprojectId,
        },
        column_id: columnId,
      },
    });
    dispatch({
      type: "EDIT_CARD_SUBPROJECT",
      payload: {
        card: {
          id: cardId,
          content,
          row_index: cardIndex,
          column_id: columnId,
          subproject_id: subprojectId,
        },
        subproject_id: subprojectId,
      },
    });
  }
  function editColumn(columnId, name, boardIndex, maxTasks) {
    dispatch({
      type: "EDIT_COLUMN",
      payload: {
        column: {
          id: columnId,
          name: name,
          board_index: boardIndex,
          max_tasks: maxTasks,
        },
        column_id: columnId,
      },
    });
  }
  function removeCard(cardId, cardIndex, columnId, subprojectId) {
    dispatch({
      type: "REMOVE_CARD_COLUMN",
      payload: {
        card: {
          id: cardId,
          row_index: cardIndex,
        },
        column_id: columnId,
        subproject_id: subprojectId,
      },
    });
    dispatch({
      type: "REMOVE_CARD_SUBPROJECT",
      payload: {
        card: {
          id: cardId,
          row_index: cardIndex,
        },
        column_id: columnId,
        subproject_id: subprojectId,
      },
    });
  }
  function removeColumn(columnId, boardIndex) {
    dispatch({
      type: "REMOVE_COLUMN",
      payload: {
        column: {
          id: columnId,
          board_index: boardIndex,
        },
      },
    });
  }
  function setItems(columnId, items) {
    dispatch({
      type: "SET_ITEMS",
      payload: {
        column_id: columnId,
        items,
      },
    });
  }
  function removeSub(subId, subIndex) {
    dispatch({ type: "REMOVE_SUB", payload: { subId, subIndex } });
  }
  function changeSub(subId, content) {
    dispatch({ type: "EDIT_SUB", payload: { subId, content } });
  }
  return (
    <GlobalContext.Provider
      value={{
        setColumns,
        setSubprojects,
        setMenu,
        setUsers,
        setForm,
        setTasks,
        setChosenUser,
        setChosenTask,
        assignUserTask,
        moveCard,
        addCard,
        addTask,
        setItems,
        removeCard,
        editCard,
        addColumn,
        addSubproject,
        removeColumn,
        editColumn,
        setDroppables,
        removeSub,
        changeSub,
        socket: state.socket,
        columns: state.columns,
        subprojects: state.subprojects,
        droppables: state.droppables,
        menuActive: state.menuActive,
        userFormActive: state.userFormActive,
        users: state.users,
        tasks: state.tasks,
        chosenUser: state.chosenUser,
        chosenTask: state.chosenTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
