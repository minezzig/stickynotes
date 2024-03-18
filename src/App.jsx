import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";
import Notes from "./Notes";
import { listNotes, deleteNote } from "./utils/api";

function App() {
  const [textInput, setTextInput] = useState({
    category: "",
    text: "",
    completed: false,
    isEditing: false,
  });
  const [notes, setNotes] = useState(null);

  const loadNotes = () => {
    console.log("loadNotes api call");
    listNotes().then(({ data }) => setNotes(data.reverse()));
    console.log(notes)
  };

  // immediately fetch notes
  useEffect(loadNotes, []);



  return (
    <div className="card">
      <h1 className="title">stickyNotes</h1>
      <Form
        textInput={textInput}
        setTextInput={setTextInput}
        loadNotes={loadNotes}
      />
      {notes && (
        <Notes notes={notes} setNotes={setNotes} loadNotes={loadNotes} />
      )}
    </div>
  );
}

export default App;
