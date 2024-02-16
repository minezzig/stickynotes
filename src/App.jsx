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

// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [comment, setComment] = useState({ name: "", text: "" });
//   const [comments, setComments] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(Number);

//   const handleChange = (e) => {
//     setComment({ ...comment, [e.target.name]: e.target.value });
//     console.log(comment);
//   };

//   const handleSubmit = () => {
//     setComments([...comments, { ...comment, id: Math.random() }]);

//     setComment({ name: "", text: "" });
//   };

//   const handleDelete = (id) => {
//     const filtered = comments.filter((comment) => comment.id !== id);
//     setComments(filtered);
//   };

//   const handleEdit = (editComment) => {
//     setComment(editComment);

//     setIsEditing(true); //sets editing to true
//     setEditId(editComment.id);

//     if (isEditing) {
//       editComment.name = comment.name;
//       editComment.text = comment.text;
//       setIsEditing(false);
//       setComment({})
//     }
//   };
//   return (
//     <>
//       <div className="card">
//         <label htmlFor="name">Name: </label>
//         {!isEditing && (
//           <input
//             type="text"
//             name="name"
//             value={comment.name}
//             onChange={handleChange}
//           />
//         )}
//         <br />
//         <label htmlFor="name">Comment: </label>
//         {!isEditing && (
//           <textarea
//             cols="10"
//             rows="4"
//             name="text"
//             value={comment.text}
//             onChange={handleChange}
//           />
//         )}
//         <br />
//         <button onClick={handleSubmit}>Submit</button>
//         <div>
//           {comments.map((commentItem) => (
//             <div
//               key={commentItem.id}
//               style={{
//                 border: "1px solid black",
//                 padding: "10px",
//                 margin: "5px",
//                 backgroundColor: "lightyellow",
//               }}
//             >
//               {isEditing && editId === commentItem.id ? (
//                 <input
//                   type="text"
//                   name="name"
//                   value={comment.name}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <p>{commentItem.name}</p>
//               )}
//               <hr />
//               {isEditing && editId === commentItem.id ? (
//                 <textarea
//                   name="text"
//                   value={comment.text}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <p>{commentItem.text}</p>
//               )}
//               <br />
//               <button onClick={() => handleEdit(commentItem)}>
//                 {isEditing && editId === commentItem.id ? "Save" : "Edit"}
//               </button>
//               <button onClick={() => handleDelete(commentItem.id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
