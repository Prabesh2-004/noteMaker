import jwt from "jsonwebtoken";

export const adminDashboard = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const accessToken = jwt.sign(
      { role: "admin" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("adminToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:  60 * 60 * 1000, // 1 hrs
    });
    res.status(200).json({
      message: "Admin login successful",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
