import User from "../models/user.js";
import Item from "../models/item.js";

// Get all users
export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

// Get all items
export async function getAllItems(req, res) {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

// Add new item
export async function addItem(req, res) {
  try {
    const { name, brand, price, description, stock, imageUrl, email } = req.body;

    // Admin check should already be done in middleware
    const newItem = new Item({ name, brand, price, description, stock, imageUrl });
    await newItem.save();

    res.status(201).json({ message: "Item added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

// Delete user
export async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

// Delete item
export async function deleteItem(req, res) {
  try {
    const { itemId } = req.params;
    await Item.findByIdAndDelete(itemId);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}
