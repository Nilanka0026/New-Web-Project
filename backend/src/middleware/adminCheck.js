import User from "../models/user.js";

// Check if the user is admin
export async function isAdmin(req, res, next) {
  try {
    // For GET requests, get email from headers
    const email = req.headers.email || req.body.email;
    const userId = req.body.userId;

    if (!email && !userId) return res.status(401).json({ message: "Admin identification required" });

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
