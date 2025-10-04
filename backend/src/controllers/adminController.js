import User from "../models/user.js";
import Item from "../models/item.js";

// Get all users
export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server Error" });
  }
}

// Add a new item
export async function addItem(req, res) {
  try {
    const { name, brand, price, description, stock, imageUrl } = req.body;

    const newItem = new Item({
      name,
      brand,
      price,
      description,
      stock,
      imageUrl,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ message: "Server Error" });
  }
}
