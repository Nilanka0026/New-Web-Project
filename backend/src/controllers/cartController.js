import User from "../models/user.js";

// Get cart for a user
// Get cart for a user
export async function getCart(req, res) {
  try {
    const user = await User.findById(req.params.userId).populate("cart.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ items: user.cart }); // always return { items: [...] }
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
}


// Add item to cart
export async function addToCart(req, res) {
  try {
    const { userId, itemId, quantity } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingItem = user.cart.find(i => i.productId.toString() === itemId);
    if (existingItem) {
      existingItem.quantity += quantity; // increment quantity
    } else {
      user.cart.push({ productId: itemId, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Item added to cart successfully!" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
}


// Remove item from cart
export async function removeFromCart(req, res) {
  try {
    const { userId, itemId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((i) => i.productId.toString() !== itemId);
    await user.save();

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Update item quantity in cart
export async function updateCartQuantity(req, res) {
  try {
    const { userId, itemId, action } = req.body; // action = "increment" or "decrement"

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItem = user.cart.find(i => i.productId.toString() === itemId);
    if (!cartItem) return res.status(404).json({ message: "Item not in cart" });

    if (action === "increment") {
      cartItem.quantity += 1;
    } else if (action === "decrement") {
      cartItem.quantity = Math.max(cartItem.quantity - 1, 1); // minimum 1
    }

    await user.save();
    res.status(200).json({ message: "Cart updated", item: cartItem });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

