import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Note({ notes, setNotes }) {
  const [editItem, setEditItem] = useState({});

  const handleDelete = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
  };

  const handleEdit = (e) => {
    setEditItem((prevEditItem) => ({
      ...prevEditItem,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveEdit = () => {
    const newNotesList = notes.map((note) =>
      note.id === editItem.id ? editItem : note
    );
    setNotes(newNotesList);
    setEditItem({});
  };

  const toggleComplete = (id) => {
    const found = notes.find((note) => note.id === id);
    found.completed = !found.completed;
    const i = notes.indexOf(found);
    const newOrder = [...notes];
    found.completed
      ? newOrder.push(...newOrder.splice(i, 1))
      : newOrder.unshift(...newOrder.splice(i, 1));
    setNotes(newOrder);
  };
  return (
    <>
      {notes.map((note) => (
        <div key={note.id} className={`note ${note.category}`}>
          {editItem.id === note.id ? (
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
              />
              <br />
              <button type="button" className="form-button" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          ) : (
            <div className="item-content">
              <div className="date-time">
                <div>{new Date(note.timestamp).toLocaleDateString()}</div>
                <div>{`${new Date(note.timestamp).getHours()}:${new Date(
                  note.timestamp
                )
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`}</div>
              </div>
              <p
                style={{
                  textDecoration: `${
                    note.completed ? "line-through" : "none"
                  }`,
                }}
              >
                {note.text}
              </p>

              <div className="item-buttons">
                <button type="button" onClick={() => setEditItem(note)} className="btn">
                  <FontAwesomeIcon icon={faPenToSquare}/>
                </button>
                <button
                  type="button"
                  onClick={() => toggleComplete(note.id)} className="btn" 
                >
                  <FontAwesomeIcon icon={faCheck}/>
                </button>
                <button type="button" onClick={() => handleDelete(note.id)} className="btn" >
                  <FontAwesomeIcon icon={faTrash}/>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default Note;