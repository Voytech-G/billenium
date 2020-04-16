import React, { useEffect, useContext } from "react";

import Columns from "./components/Columns";

import { GlobalContext } from "./context/GlobalState";

const App = () => {
  const { socket, columns } = useContext(GlobalContext);
  const { setColumns, addCard } = useContext(GlobalContext);

  useEffect(() => {
    const username = prompt('Please enter your username.')
    const pin = prompt('Please enter your PIN code.')

    socket.emit('sign-in', {
        username: username,
        pin: pin,
    }, data => {
        if (data.status == true) {
            alert('signed in!');

            // socket.emit("get-project", {
            //     project_id: '5e90df5a6d98d833703affbc',
            // }, data => {
            // const columnsWithItems = data.payload.columns.map(column => ({
            //     id: column._id,
            //     name: column.name,
            //     board_index: column.board_index,
            //     max_tasks: column.max_tasks,
            //     items: column.tasks.map(task => ({
            //         id: task._id,
            //         content: task.content,
            //         row_index: task.row_index
            //     }))
            // }));
            // // console.log(columnsWithItems);
            // setColumns(columnsWithItems);
            // });

            // socket.emit('remove-project', {
            //     project_id: '5e98abc5f17ff537f44574b1',
            // }, data => {
            //     console.log(data)
            // })

            // socket.emit('create-project', {
            //     project_name: 'first project',
            //     total_budget: 2500,
            // }, data => {
            //     console.log(data)
            // })

            // socket.emit('update-subproject', {
            //     subproject_id: '5e98b0c0b1b4ab474090034c',
            //     subproject_name: 'first subproject updated updated',
            // }, data => {
            //     console.log(data)
            // })

            socket.emit('remove-subproject', {
                subproject_id: '5e98b0dab1b4ab474090034d',
                project_id: '5e98b06eb1b4ab474090034b',
            }, data => {
                console.log(data)
            })

            return
        } else {
            alert(`not signed in: ${data.message}`)
        }
    })
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <Columns columns={columns} />
    </div>
  );
};

export default App;
