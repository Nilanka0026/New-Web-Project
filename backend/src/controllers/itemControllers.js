import Item from "../models/item.js";

// Get all items
export async function getAllItems(req, res) {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Get item by ID
export async function getItemById(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Create new item
export async function createItem(req, res) {
  try {
    const { name, brand, price, description, stock, imageUrl } = req.body;
    const newItem = new Item({ name, brand, price, description, stock, imageUrl });
    await newItem.save();
    res.status(201).json({ message: "Item created" });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Update item
export async function updateItem(req, res) {
  try {
    const { name, brand, price, description, stock, imageUrl } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, brand, price, description, stock, imageUrl },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated" });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Delete item
export async function deleteItem(req, res) {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
