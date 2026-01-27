import pool from "../config/db.js";

const getUserNotes = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await pool.query(
      "select * from notes where user_id = $1",
      [id],
    );
    res.status(200).json({ notes: response.rows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const createNote = async (req, res) => {
  try {
    const { id } = req.user;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const response = await pool.query(
      "insert into notes (title, user_id, created_at) values ($1, $2, NOW()) returning *",
      [title, id],
    );
    res
      .status(201)
      .json({ message: "Note created successfully", note: response.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const updateNote = async (req, res) => {
  try {
    const { id } = req.user;
    const { noteId } = req.params;
    const { title } = req.body;

    if(!title){
      return res.status(400).json({ message: "Title is required" });
    }
    // const user = await pool.query("select * from notes where id = $1", [id]);
    const note = await pool.query("select * from notes where id = $1", [noteId]);

    if (note.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    if(note.rows[0].user_id !== id){
      return res.status(403).json({ message: "Forbidden: You cannot update this note" });
    }

    const response = await pool.query(
      "update notes set title = COALESCE($1, title) where id = $2 returning *",
      [title, noteId],
    );

    res
      .status(200)
      .json({ message: "Note updated successfully", note: response.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteNote = async (req, res) => {
  try {
    const { id } = req.user;
    const { noteId } = req.params;
    const note = await pool.query("select * from notes where id = $1", [noteId]);

    if (note.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }
    if(note.rows[0].user_id !== id){
      return res.status(403).json({ message: "Forbidden: You cannot delete this note" });
    }
    await pool.query("delete from notes where id = $1", [noteId]);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export { getUserNotes, createNote, updateNote, deleteNote };
