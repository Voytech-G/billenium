import React, { createContext, useReducer } from "react";
import uuid from "uuid/v4";
import AppReducer from "./AppReducer";
import socketIOClient from "socket.io-client";

const initialState = {
  socket: undefined,
  columns: []
};

initialState.socket = socketIOClient("http://localhost:4000");

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setColumns(columns) {
    dispatch({
      type: "SET_COLUMNS",
      payload: columns
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
        dest_card_index: destCardIndex
      }
    });
    console.log(sourceCardIndex);
  }

  function addCard(card, columnId) {
    dispatch({
      type: "ADD_CARD",
      payload: {
        card: {
          id: card._id,
          content: card.content,
          row_index: card.row_index
        },
        column_id: columnId
      }
    });
    console.log(card._id);
  }

  function setItems(columnId, items) {
    dispatch({
      type: "SET_ITEMS",
      payload: {
        column_id: columnId,
        items
      }
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        setColumns,
        moveCard,
        addCard,
        setItems,
        socket: state.socket,
        columns: state.columns
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
