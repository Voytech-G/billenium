import React, { useEffect, useContext } from "react";

import Columns from "./components/Columns";

import { GlobalContext } from "./context/GlobalState";

const App = () => {
  const { socket, columns } = useContext(GlobalContext);
  const { setColumns, addCard } = useContext(GlobalContext);

  

  useEffect(() => {
    socket.emit("get-board", data => {
      const columnsWithItems = data.payload.columns.map(column => ({
        id: column._id,
        name: column.name,
        board_index: column.board_index,
        items: column.tasks
          .map(task => ({
            id: task._id,
            content: task.content,
            row_index: task.row_index
          }))
      }));
      // console.log(columnsWithItems);
      setColumns(columnsWithItems);
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Columns columns={columns} />
    </div>
  );
};

export default App;
