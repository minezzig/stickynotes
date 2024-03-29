import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";
import Notes from "./Notes";
import { listNotes } from "./utils/api";

function App() {
  const [textInput, setTextInput] = useState({
    category: "",
    text: "",
    completed: false,
    isEditing: false,
  });
  const [notes, setNotes] = useState(null);

  // function that requests notes from server.  this function is called to refresh component after api calls
  const loadNotes = () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    console.log("loadNotes api call");

    listNotes({ signal })
      .then(({ data }) => setNotes(data.reverse()))
      .catch((error) => console.log(error));

    return () => abortController.abort();
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
      {notes ? (
        <Notes notes={notes} setNotes={setNotes} loadNotes={loadNotes} />
      ) : (
        <h1>Loading stickyNotes</h1>
      )}
    </div>
  );
}

export default App;
