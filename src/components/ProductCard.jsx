import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="card-surface p-4">
      <img
        src={
          product?.image
            ? `http://localhost:5000${product.image}`
            : "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?auto=format&fit=crop&w=600&q=60"
        }
        alt={product?.name}
        className="h-44 w-full rounded-xl object-cover"
      />
      <div className="mt-3">
        <h3 className="text-lg font-bold">{product?.name}</h3>
        <p className="text-sm text-amber-900/70">
          Seller: {product?.seller_name || "Local Seller"}
        </p>
        <p className="mt-2 text-xl font-semibold text-amber-800">
          {Number(product?.price || 0).toFixed(2)} Birr
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        <Link
          to={`/product/${product?.id}`}
          className="rounded-lg border border-amber-300 px-3 py-2 text-sm font-semibold hover:bg-amber-100"
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="rounded-lg bg-amber-700 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-800"
        >
          Add To Cart
        </button>
      </div>
    </article>
  );
}
