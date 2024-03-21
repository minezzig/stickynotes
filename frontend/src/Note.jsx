import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deleteNote } from "./utils/api";
import { toggleCompleteStatus } from "./utils/api";
import { editNote } from "./utils/api";

function Note({ notes, category, loadNotes }) {
  const [editItem, setEditItem] = useState({});

  // delete a note
  const handleDelete = async (id) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      await deleteNote(id, { signal });
      loadNotes();
    } catch (error) {
      console.log(error);
    }

    return () => abortController.abort();
  };

  // allow the note input to be edited
  const handleEdit = (e) => {
    setEditItem((prevEditItem) => ({
      ...prevEditItem,
      [e.target.name]: e.target.value,
    }));
  };

  // save the new edited note and replace the original
  const handleSaveEdit = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const { id } = editItem;

    try {
      await editNote(id, editItem, { signal });
      loadNotes();
      setEditItem({});
    } catch (error) {
      console.log(error);
    }
    return () => abortController.abort();
  };

  // if the note is completed, change completed status and move it to the end of the array
  const toggleComplete = async (id) => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const found = notes.find((note) => note.id === id);
    found.completed = !found.completed;
    try {
      await toggleCompleteStatus(id, found.completed, { signal });
      loadNotes();
    } catch (error) {
      console.log(error);
    }

    return () => abortController.abort();
  };

  // *** RENDER DIFFERENT NOTE DEPENDING ON THE TYPE REQUIRED
  // return a regular note
  const renderNote = (note) => {
    return (
      <div key={note.id} className={`note ${note.category}`}>
        <div className="item-content">
          <div className="date-time">
            <div>{new Date(note.createdAt).toLocaleDateString()}</div>
            <div>{`${new Date(note.createdAt).getHours()}:${new Date(
              note.createdAt
            )
              .getMinutes()
              .toString()
              .padStart(2, "0")}`}</div>
          </div>
          <p
            style={{
              textDecoration: `${note.completed ? "line-through" : "none"}`,
            }}
          >
            {note.text}
          </p>

          <div className="item-buttons">
            <button
              type="button"
              onClick={() => setEditItem(note)}
              className="btn"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              type="button"
              onClick={() => toggleComplete(note.id)}
              className="btn"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(note.id)}
              className="btn"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // return a note that is in edit mode
  const renderEditNote = (note) => {
    return (
      <div key={note.id} className={`note ${note.category}`}>
        <div className="item-content">
          <select
            className="edit-select"
            name="category"
            value={editItem.category}
            onChange={handleEdit}
            required
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="appointment">Appointment</option>
          </select>
          <textarea
            className="edit-textarea"
            name="text"
            value={editItem.text}
            onChange={handleEdit}
            rows={editItem.text.split("").length / 20}
            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
          />
          <br />
          <button
            type="button"
            className="form-button"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {[
        ...notes.filter((note) => !note.completed),
        ...notes.filter((note) => note.completed),
      ].map(
        (note) =>
          (category === "all" || category === note.category) &&
          (editItem.id !== note.id ? renderNote(note) : renderEditNote(note))
      )}
    </>
  );
}

export default Note;
