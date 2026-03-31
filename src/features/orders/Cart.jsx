import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import api from "../../services/api";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  function loadCart() {
    api
      .get("/orders/cart")
      .then((res) => setCart(res.data))
      .catch(() => setCart({ items: [], total: 0 }));
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function removeItem(productId) {
    await api.delete(`/orders/cart/${productId}`);
    loadCart();
  }

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="mt-5 space-y-3">
        {cart.items?.map((item) => (
          <CartItem key={item.id} item={item} onRemove={removeItem} />
        ))}
      </div>
      <div className="mt-6 card-surface p-4">
        <p className="text-xl font-semibold">
          Total: {Number(cart.total || 0).toFixed(2)} Birr
        </p>
        <Link
          to="/checkout"
          className="mt-3 inline-block rounded-lg bg-amber-700 px-4 py-2 font-semibold text-white"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
