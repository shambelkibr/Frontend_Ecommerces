export default function CartItem({ item, onRemove }) {
  return (
    <div className="card-surface flex items-center justify-between gap-4 p-4">
      <div>
        <h4 className="font-bold">{item.name}</h4>
        <p className="text-sm text-amber-900/70 dark:text-amber-200/80">
          Qty: {item.quantity}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold">
          {Number(item.line_total || 0).toFixed(2)} Birr
        </p>
        <button
          type="button"
          onClick={() => onRemove?.(item.product_id)}
          className="mt-2 rounded-md bg-red-700 px-3 py-1.5 text-xs font-semibold text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
