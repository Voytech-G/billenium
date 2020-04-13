import React, { useEffect, useContext } from "react";

import Columns from "./components/Columns";

import { GlobalContext } from "./context/GlobalState";

const App = () => {
  const { socket, columns } = useContext(GlobalContext);
  const { setColumns, addCard } = useContext(GlobalContext);

  useEffect(() => {
    const username = prompt("Please enter your username.");
    const pin = prompt("Please enter your PIN code.");

    socket.emit(
      "sign-in",
      {
        username: username,
        pin: pin,
      },
      (data) => {
        if (data.status == true) {
          alert("signed in!");

          socket.emit(
            "get-project",
            {
              project_id: "5e90df5a6d98d833703affbc",
            },
            (data) => {
              const columnsWithItems = data.payload.columns.map((column) => ({
                id: column._id,
                name: column.name,
                board_index: column.board_index,
                max_tasks: column.max_tasks,
                items: column.tasks.map((task) => ({
                  id: task._id,
                  content: task.content,
                  row_index: task.row_index,
                })),
              }));
              // console.log(columnsWithItems);
              setColumns(columnsWithItems);
            }
          );

          return;
        } else {
          alert(`not signed in: ${data.message}`);
        }
      }
    );
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Columns columns={columns} />
    </div>
  );
};

export default App;
