import { useEffect, useState } from "react";
import OrderItem from "../../components/OrderItem";
import api from "../../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/orders/my")
      .then((res) => setOrders(res.data || []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-bold">My Orders</h1>
      <div className="mt-5 space-y-3">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
