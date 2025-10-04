import User from "../models/user.js";

// Check if the user is admin using email or ID
export async function isAdmin(req, res, next) {
  try {
    const { userId, email } = req.body; // expect either userId or email in request
    const user = await User.findOne({ $or: [{ _id: userId }, { email }] });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied. Admin only." });

    next(); // user is admin
  } catch (error) {
    console.error("Error in admin check:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
