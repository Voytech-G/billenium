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

            // socket.emit('create-subproject', {
            //     project_id: '5e98b06eb1b4ab474090034b',
            //     subproject_name: 'second subproject',
            // }, data => {
            //     console.log(data)
            // })

            // socket.emit('create-column', {
            //     project_id: '5e98b06eb1b4ab474090034b',
            //     name: 'col1',
            //     board_index: 0,
            //     max_tasks: 3,
            // }, data => {
            //     console.log(data)
            // })

            // socket.emit('create-task', {
            //     content: 'task 2 content',
            //     row_index: 0,
            //     column_id: '5e98c578544bf95ea0a90a0d',
            // }, data => {
            //     console.log(data)
            // })

            // socket.emit('update-subproject', {
            //     subproject_id: '5e98b0c0b1b4ab474090034c',
            //     subproject_name: 'first subproject updated updated',
            // }, data => {
            //     console.log(data)
            // })

            // socket.emit('remove-subproject', {
            //     subproject_id: '5e98b0dab1b4ab474090034d',
            //     project_id: '5e98b06eb1b4ab474090034b',
            // }, data => {
            //     console.log(data)
            // })

            // socket.emit('get-one-subproject', {
            //     subproject_id: '5e98b0c0b1b4ab474090034c',
            // }, data => {
            //     console.log(data)
            // })

            // socket.emit('subproject-unassign-task', {
            //     task_id: '5e98cb1f96f9725bcc67f980',
            //     subproject_id: '5e98c0b0053f86414499c40f', 
            // }, data => {
            //     console.log(data)
            // })

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
