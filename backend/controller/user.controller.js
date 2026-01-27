import pool from "../config/db.js";

const getAllUsers = async (req, res) => {
  try {
    const response = await pool.query("SELECT id, name, email FROM users");
    res.status(200).json({ users: response.rows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const response = await pool.query(
      "UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email",
      [name, id],
    );
    res
      .status(200)
      .json({ message: "User updated successfully", user: response.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id],
    );
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: response.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id],
    );
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: response.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export { getAllUsers, updateUser, deleteUser, getUserById, getProfile };
