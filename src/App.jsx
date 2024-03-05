import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";
import Comments from "./Notes";
import data from "./data";
function App() {
  const [textInput, setTextInput] = useState({category: "", text: "", completed: false, isEditing: false});
  const [notes, setNotes] = useState(data);

  return (
    <div className="card">
      <h1 className="title">stickyNotes</h1>
      <Form
      textInput={textInput}
        setTextInput={setTextInput}
        setNotes={setNotes}
      />
      <Comments
        notes={notes}
        setNotes={setNotes}
      />
    </div>
  );
}

export default App;
