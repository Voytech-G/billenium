import React, { useEffect, useContext } from "react";

import Columns from "./components/Columns";

import { GlobalContext } from "./context/GlobalState";

const App = () => {
  const { socket, columns } = useContext(GlobalContext);
  const { setColumns, addCard } = useContext(GlobalContext);

  useEffect(() => {
    socket.on("board", data => {
      const { notes } = data.payload;

      const columnsWithItems = data.payload.columns.map(column => ({
        id: column._id,
        name: column.name,
        board_index: column.board_index,

        items: notes
          .filter(note => note.column_id === column._id)
          .map(note => ({
            id: note._id,
            content: note.content,
            row_index: note.row_index
          }))
      }));

      setColumns(columnsWithItems);
    });
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Columns columns={columns} />
    </div>
  );
};

export default App;
