import React, { useEffect, useContext } from "react";
import Subprojects from "./components/Subprojects";
import Header from "./components/Header";
import { GlobalContext } from "./context/GlobalState";
import "./styles/prod/main.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
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
const getProject = (socket, setColumns, setSubprojects, setUsers) => {
  socket.emit(
    "get-project",
    {
      project_id: "5e98b06eb1b4ab474090034b",
    },
    (data) => {
      // console.log(data);
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
  socket.emit("get-all-users", (data) => {
    setUsers(data.payload);
  });
};
const AddUserForm = ({ active, users, setForm }) => {
  if (active) {
    console.log(users);
    return (
      <div className="app-container__user-addform--container">
        <div className="app-container__user-addform">
          <div>
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="form-icon"
              onClick={() => setForm(false)}
            />
          </div>
          <h4>ASSIGN A USER</h4>
          <form action="">
            <select name="" id="">
              {users.map((user) => {
                return <option value={user.username}>{user.username}</option>;
              })}
            </select>
            <button>Add</button>
          </form>
        </div>
      </div>
    );
  } else {
    return false;
  }
};
const Project = () => {
  const { socket, subprojects, userFormActive, users } = useContext(
    GlobalContext
  );
  const { setColumns, setSubprojects, setUsers, setForm } = useContext(
    GlobalContext
  );
  const { columns } = useContext(GlobalContext);
  const username = localStorage.getItem("userName");
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
          getProject(socket, setColumns, setSubprojects, setUsers);
        } else {
          alert(`Authentication error ${data.message}`);
          signIn(socket, setColumns, setSubprojects);
        }
      });
    }
  }, []);
  return (
    <div className="app-container">
      <Header username={username}></Header>
      <Subprojects subprojects={subprojects} />
      <AddUserForm active={userFormActive} users={users} setForm={setForm} />
    </div>
  );
};

export default Project;
