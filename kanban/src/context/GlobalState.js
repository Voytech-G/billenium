import React, { createContext, useReducer } from "react";
import uuid from "uuid/v4";
import AppReducer from "./AppReducer";
import socketIOClient from "socket.io-client";

const initialState = {
  socket: undefined,
  columns: [
    {
      id: uuid(),
      name: "Requested",
      board_index: 0,
      items: [
        {
          id: uuid(),
          content: "First task",
          row_index: 0
        },
        {
          id: uuid(),
          content: "Second task",
          row_index: 3
        },
        {
          id: uuid(),
          content: "Third task",
          row_index: 2
        },
        {
          id: uuid(),
          content: "Fourth task",
          row_index: 1
        }
      ]
    },
    {
      id: uuid(),
      name: "Todo",
      board_index: 1,
      items: []
    },
    {
      id: uuid(),
      name: "In Progress",
      board_index: 2,
      items: []
    },
    {
      id: uuid(),
      name: "Done",
      board_index: 3,
      items: []
    }
  ]
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
  }

  function addCard(card, columnId) {
    dispatch({
      type: "ADD_CARD",
      payload: {
        card,
        column_id: columnId
      }
    });
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
