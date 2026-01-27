import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../token/jwtToken.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await pool.query(
      "SELECT id, name, email FROM users WHERE email = $1",
      [email],
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword],
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const userId = user.rows[0];

    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await pool.query(
      `insert into refresh_token (token, user_id, expires_at) values ($1, $2, Now() + interval '7 days')`,
      [refreshToken, user.rows[0].id],
    );

    res.status(200).json({
      message: "Login successful",
      accessToken: accessToken,
      user: user.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await pool.query("SELECT id, name, email FROM users WHERE id = $1", [
      decoded.id,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const newAccessToken = generateAccessToken(user.rows[0].id);

    res.status(200).json({ accessToken: newAccessToken, user: user.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
const logoutUser = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const decoded = jwt.decode(token, process.env.REFRESH_TOKEN_SECRET);
    await pool.query("delete FROM refresh_token WHERE user_id = $1", [
      decoded.id,
    ]);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    await pool.query(
      `delete from refresh_token where token = $1`,
      [req.cookies.refreshToken],
    );
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export { registerUser, loginUser, refreshToken, logoutUser };
