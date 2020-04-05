import React, { useEffect, useContext } from "react";

import Columns from "./components/Columns";

import { GlobalContext } from "./context/GlobalState";

const App = () => {
  const { socket, columns, users } = useContext(GlobalContext);
  const { setColumns, addCard, setUsers } = useContext(GlobalContext);

  useEffect(() => {
    socket.emit(
      "get-project",
      {
        project_id: "5e877170c2386013906d7421",
      },
      (data) => {
        const columnsWithItems = data.payload.columns.map((column) => ({
          id: column._id,
          name: column.name,
          board_index: column.board_index,
          col_row_index: column.col_row_index,
          max_tasks: column.max_tasks,
          user: column.user,
          items: column.tasks.map((task) => ({
            id: task._id,
            content: task.content,
            row_index: task.row_index,
          })),
        }));
        setColumns(columnsWithItems);
        setUsers(users);
      }
    );
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Columns columns={columns} users={users} />
    </div>
  );
};

export default App;
