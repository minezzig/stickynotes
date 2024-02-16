import Note from "./Note";
import { useState } from "react";

function Notes({ notes, setNotes }) {
  const [filteredNotes, setFilteredNotes] = useState(null);

  const handleFilter = (e) => {
    const category = e.target.value;
    if (category === "all") setFilteredNotes(null);
    else {
      const filtered = notes.filter(
        (note) => note.category === e.target.value
      );
      setFilteredNotes(filtered);
    }
  };

  return (
    <>

      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select onChange={handleFilter} name="sort">
          <option value="all">All</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="appointment">Appointment</option>
        </select>
      </div>
      <div className="notes-container">
        <Note
          notes={filteredNotes || notes}
          setNotes={setNotes}
        />
      </div>
    </>
  );
}

export default Notes;
