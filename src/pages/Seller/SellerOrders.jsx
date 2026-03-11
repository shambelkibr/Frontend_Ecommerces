import { useEffect, useState } from "react";
import api from "../../services/api";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/orders/seller")
      .then((res) => setOrders(res.data || []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-bold">Seller Orders</h1>
      <div className="mt-5 space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="card-surface p-4">
            <p className="font-semibold">Order #{order.id}</p>
            <p className="text-sm">Status: {order.order_status}</p>
            <p className="text-sm">Payment: {order.payment_status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
