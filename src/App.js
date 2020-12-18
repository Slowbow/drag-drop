import "./App.css";
import React, { useState, useRef } from "react";
import users from "./users.json";

function App() {
  //koristim useRef hook da bi pratio poziciju itema
  const draggingItem = useRef();
  //dragOverItem je item preko kojeg se trenutno draggingItem prevlaci
  const dragOverItem = useRef();

  const [list, setList] = useState(
    users.map((user) => user)
    //za test obicni niz Stringova
    // "Kuvani kupus",
    // "Slatki ustipci",
    // "Pasulj"
  );

  const onDragStart = (e, position) => {
    draggingItem.current = position;
  };

  const onDragEnter = (e, position) => {
    dragOverItem.current = position;
    const listCopy = [...list];
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setList(listCopy);
  };

  return (
    <div>
      <h2>
        Drag and Drop aplikacija - Prevucite karticu da bi rucno sortirali listu
        korisnika:
      </h2>
      {list &&
        list.map((item, index) => (
          <h1
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => onDragEnter(e, index)}
            key={index}
            draggable
          >
            Name: {item.firstName} {item.lastName} <p>Email: {item.email} </p>
          </h1>
        ))}
    </div>
  );
}

export default App;
