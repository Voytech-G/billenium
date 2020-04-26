import React, { useEffect, useContext } from "react";

import Subprojects from "./components/Subprojects";

import { GlobalContext } from "./context/GlobalState";

const signIn = (socket, setColumns) => {
  const userName = prompt("Please enter your username.");
  const userPin = prompt("Please enter your PIN code.");
  socket.emit(
    "sign-in",
    {
      username: userName,
      pin: userPin,
    },
    (data) => {
      if (data.status == true) {
        console.log(data);
        localStorage.setItem("userToken", data.payload);
        alert("signed in!");
        localStorage.setItem("userName", userName);
        localStorage.setItem("userPin", userPin);
        getProject(socket, setColumns);
        return;
      } else {
        alert(`not signed in: ${data.message}`);
      }
    }
  );
};
const getProject = (socket, setColumns, setSubprojects) => {
  socket.emit(
    "get-project",
    {
      project_id: "5e98b06eb1b4ab474090034b",
    },
    (data) => {
      const columnsWithTasks = data.payload.columns.map((column) => ({
        id: column._id,
        name: column.name,
        board_index: column.board_index,
        max_tasks: column.max_tasks,
        tasks: column.tasks.map((task) => ({
          id: task._id,
          content: task.content,
          row_index: task.row_index,
          column_id: task.column,
          subproject_id: task.subproject,
        })),
      }));
      const subprojectsWithTasks = data.payload.subprojects.map(
        (subproject) => ({
          id: subproject._id,
          name: subproject.subproject_name,
          row_index: subproject.row_index,
          tasks: subproject.tasks.map((task) => ({
            id: task._id,
            content: task.content,
            row_index: task.row_index,
            column_id: task.column,
            subproject_id: task.subproject,
          })),
        })
      );
      setColumns(columnsWithTasks);
      setSubprojects(subprojectsWithTasks);
    }
  );
};

const Project = () => {
  const { socket, subprojects } = useContext(GlobalContext);
  const { setColumns, setSubprojects } = useContext(GlobalContext);
  const { columns } = useContext(GlobalContext);
  useEffect(() => {
    if (
      (localStorage.getItem("userName") == "null" &&
        localStorage.getItem("userPin") == "null") ||
      (localStorage.getItem("userName") == null &&
        localStorage.getItem("userPin") == null)
    ) {
      signIn(socket, setColumns);
    } else {
      const userToken = localStorage.getItem("userToken");
      socket.emit("authenticate", { token: userToken }, (data) => {
        if (data.status === true) {
          getProject(socket, setColumns, setSubprojects);
        } else {
          alert(`Authentication error ${data.message}`);
          signIn(socket, setColumns, setSubprojects);
        }
      });
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        border: "2px solid gray",
      }}
    >
      <Subprojects subprojects={subprojects} />
    </div>
  );
};

export default Project;
