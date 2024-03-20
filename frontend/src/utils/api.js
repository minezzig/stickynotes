//const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:4000";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
//console.log("URL",API_BASE_URL)
// set up header or each fetch request
const headers = new Headers();
headers.append("Content-Type", "application/json");

// function to make api calls, requires correct url and options for each request
async function fetchJson(url, options = {}, onCancel) {
  try {
    const response = await fetch(url, options);
    // if something was deleted, return nothing
    if (response.status === 204) return null;

    const data = await response.json();
    if (data.error) {
      return Promise.reject({ message: data.error });
    }
    return data;
  } catch (error) {
    if (error.name !== "AbortError"){
        console.error(error.stack);
        throw error;
    }
    return Promise.resolve(onCancel);
  }
}

// send fetch request to get all notes
export async function listNotes(signal) {
  const url = new URL(`${API_BASE_URL}/notes`);
  return await fetchJson(url);
}

// send fetch request to post a new note
export async function createNote(note, signal) {
  const url = new URL(`${API_BASE_URL}/notes`);
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: note }), // convert note into JSON format
  };
  return await fetchJson(url, options);
}

// send fetch to edit a note
export async function editNote(id, editedNote, signal) {
  const url = new URL(`${API_BASE_URL}/notes/${id}`);
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: editedNote }),
  };
  return await fetchJson(url, options);
}

// fetch to delte a note
export async function deleteNote(id, signal) {
  const url = new URL(`${API_BASE_URL}/notes/${id}`);
  const options = {
    method: "DELETE",
    headers,
  };
  return await fetchJson(url, options); //! add error handling. no response expected
}

// fetch toggle true/false for the complete status
export async function toggleCompleteStatus(id, completed, signal) {
  const url = new URL(`${API_BASE_URL}/notes/${id}`);
  const options = {
    method: "PATCH",
    headers,
    body: JSON.stringify({ data: { completed } }),
  };
  return await fetchJson(url, options); // return data;
}
