import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Calculate total items and total price
  const totalItems = cart.reduce((sum, item) => sum + 1, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-md">
      <h3 className="text-lg font-semibold">Cart Summary</h3>
      <p>
        Total Items: <strong>{totalItems}</strong>
      </p>
      <p>
        Total Price: <strong>${totalPrice}</strong>
      </p>
      <button onClick={() => navigate("/cart")} className="btn btn-primary">
        View Cart
      </button>
    </div>
  );
}

export default CartSummary;
