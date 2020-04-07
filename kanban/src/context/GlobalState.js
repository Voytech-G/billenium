import React, { createContext, useReducer } from "react";
import uuid from "uuid/v4";
import AppReducer from "./AppReducer";
import socketIOClient from "socket.io-client";

const initialState = {
  socket: undefined,
  columns: [],
  users: [
    { id: 1, name: "Jacek" },
    { id: 2, name: "Kamil" },
    { id: 3, name: "Wacek" },
  ],
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

  function addCard(card, columnId) {
    dispatch({
      type: "ADD_CARD",
      payload: {
        card: {
          id: card._id,
          content: card.content,
          row_index: card.row_index,
        },
        column_id: columnId,
      },
    });
  }
  function addColumn(
    columnId,
    newName,
    maxLimit,
    columnsItems,
    userName,
    colRowIndex
  ) {
    dispatch({
      type: "ADD_COLUMN",
      payload: {
        column: {
          id: columnId,
          name: newName,
          board_index: columnsItems.length,
          items: [],
          max_tasks: parseInt(maxLimit),
          col_row_index: colRowIndex,
          user: userName,
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
        setUsers,
        moveCard,
        addCard,
        setItems,
        removeCard,
        editCard,
        addColumn,
        removeColumn,
        editColumn,
        socket: state.socket,
        columns: state.columns,
        users: state.users,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
