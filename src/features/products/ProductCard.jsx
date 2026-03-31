import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  const imageSrc = product.image?.startsWith("http") 
    ? product.image 
    : product.image 
      ? `http://localhost:5000${product.image}` 
      : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <div className="card group flex flex-col h-full bg-white dark:bg-gray-800 transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden aspect-[4/5] bg-gray-100 dark:bg-gray-900">
        <img
          src={imageSrc}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Simple pill overlay */}
        {product.status !== 'inactive' && (
          <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md text-gray-900 dark:text-gray-100 shadow-sm">
            In Stock
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="font-extrabold text-lg text-gray-900 dark:text-white ml-3">
            {product.price} ETB
          </span>
        </div>
        
        {/* Details badges for category/size in card */}
        {(product.category || product.size || product.color) && (
          <div className="flex flex-wrap gap-1 mt-1 mb-2">
            {product.category && <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">{product.category}</span>}
            {product.size && <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">Size {product.size}</span>}
            {product.color && <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">{product.color}</span>}
          </div>
        )}

        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-3 px-4 bg-gray-900 dark:bg-gray-700 text-white font-medium rounded-xl hover:bg-orange-600 dark:hover:bg-orange-500 focus:ring-4 focus:ring-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          Add to Bag
        </button>
      </div>
    </div>
  );
}
