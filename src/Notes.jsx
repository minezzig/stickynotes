import Note from "./Note";
import { useState } from "react";

function Notes({ notes, setNotes, loadNotes }) {
  const [category, setCategory] = useState("all");

  // set state to the category user wants to view
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
        <Note notes={notes} setNotes={setNotes} category={category} loadNotes={loadNotes}/>
      </div>
    </>
  );
}

export default Notes;
