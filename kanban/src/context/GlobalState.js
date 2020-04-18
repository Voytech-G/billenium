import React, { createContext, useReducer } from "react";
import uuid from "uuid/v4";
import AppReducer from "./AppReducer";
import socketIOClient from "socket.io-client";

const initialState = {
  socket: undefined,
  columns: [],
  subprojects: [],
  subColItems: [],
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

  function setSubprojects(subprojects) {
    dispatch({
      type: "SET_SUBPROJECTS",
      payload: subprojects,
    });
  }
  function setSubColItems(subColItems) {
    dispatch({
      type: "SET_SUBCOLITEMS",
      payload: subColItems,
    });
  }

  function moveCard(
    card,
    sourceColumnId,
    destColumnId,
    sourceCardIndex,
    destCardIndex
  ) {
    dispatch({
      type: "MOVE_CARD",
      payload: {
        card,
        source_column_id: sourceColumnId,
        dest_column_id: destColumnId,
        source_card_index: sourceCardIndex,
        dest_card_index: destCardIndex,
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
  function editCard(cardId, cardIndex, columnId, content) {
    dispatch({
      type: "EDIT_CARD",
      payload: {
        card: {
          id: cardId,
          content,
          row_index: cardIndex,
        },
        column_id: columnId,
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
  function removeCard(cardId, cardIndex, columnId) {
    dispatch({
      type: "REMOVE_CARD",
      payload: {
        card: {
          id: cardId,
          row_index: cardIndex,
        },
        column_id: columnId,
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
  return (
    <GlobalContext.Provider
      value={{
        setColumns,
        setSubprojects,
        setSubColItems,
        moveCard,
        addCard,
        setItems,
        removeCard,
        editCard,
        addColumn,
        addSubproject,
        removeColumn,
        editColumn,
        socket: state.socket,
        columns: state.columns,
        subprojects: state.subprojects,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
