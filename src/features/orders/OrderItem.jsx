export default function OrderItem({ order }) {
  return (
    <div className="card-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-bold">Order #{order.id}</p>
        <p className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-900">
          {order.order_status || "pending"}
        </p>
      </div>
      <p className="mt-2 text-sm">
        Total: {Number(order.total_price || 0).toFixed(2)} Birr
      </p>
      <p className="text-sm">Payment: {order.payment_status}</p>
    </div>
  );
}
