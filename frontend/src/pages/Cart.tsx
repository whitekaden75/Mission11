import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart(); // Get cart data

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((book) => (
            <li
              key={book.bookId}
              className="flex justify-between border-b py-2">
              <div>
                <p className="font-medium">{book.title}</p>
                <p className="text-sm">Price: ${book.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeFromCart(book.bookId)}
                className="text-red-500">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-lg font-bold flex justify-between">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>
      <button onClick={() => navigate(-1)} className="btn btn-success mt-4">
        Continue Shopping
      </button>
    </div>
  );
}

export default CartPage;
