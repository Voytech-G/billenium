import React, { useEffect, useContext } from "react";

import Columns from "./components/Columns";

import { GlobalContext } from "./context/GlobalState";

const kurwo = console.log;

const App = () => {
  const { socket, columns } = useContext(GlobalContext);
  const { setColumns, addCard } = useContext(GlobalContext);

  useEffect(() => {
    socket.on("board", data => {
      data.payload.notes.forEach(note => {
        addCard(note, "2");
      });
    });
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <button onclick={() => console.log(columns)}>chuj</button>
      <Columns columns={columns} />
    </div>
  );
};

export default App;
