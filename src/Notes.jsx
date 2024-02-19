import Note from "./Note";
import { useState } from "react";

function Notes({ notes, setNotes }) {
  const [category, setCategory] = useState("all");

  const handleFilter = (e) => {
    setCategory(e.target.value);
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
        <Note notes={notes} setNotes={setNotes} category={category} />
      </div>
    </>
  );
}

export default Notes;
