import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { useAuth } from "../auth/AuthContext";
import api from "../../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/products")
      .then((res) => {
        // Flatten variants for easy filtering on frontend if needed, or check if variant array includes filter
        if (res.data) setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  async function handleAddToCart(product) {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (role !== "buyer") {
      setNotice("Only buyer accounts can add products to cart.");
      return;
    }
    try {
      await api.post("/orders/cart", { productId: product.id, quantity: 1 });
      setNotice(`Added ${product.name} to your bag.`);
      setTimeout(() => setNotice(""), 3000);
    } catch (error) {
      setNotice(error?.response?.data?.message || "Failed to add to cart.");
      setTimeout(() => setNotice(""), 3000);
    }
  }

  // Derive all unique filter options directly from actual DB variations!
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const allSizes = products.flatMap((p) =>
    p.variants ? p.variants.map((v) => v.size) : [],
  );
  const sizes = ["All", ...new Set(allSizes.filter(Boolean))];

  const allColors = products.flatMap((p) =>
    p.variants ? p.variants.map((v) => v.color) : [],
  );
  const colors = ["All", ...new Set(allColors.filter(Boolean))];

  // Apply filters robustly against variant nested arrays
  const filteredProducts = (() => {
    let list = products.filter((p) => {
      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const hasSize =
        !p.variants || p.variants.length === 0
          ? false
          : p.variants.some((v) => v.size === selectedSize);
      const matchSize = selectedSize === "All" || hasSize;

      const hasColor =
        !p.variants || p.variants.length === 0
          ? false
          : p.variants.some((v) => v.color === selectedColor);
      const matchColor = selectedColor === "All" || hasColor;

      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        query === "" ||
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query);

      return matchCategory && matchSize && matchColor && matchSearch;
    });

    if (sortBy === "price-low-high") {
      list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high-low") {
      list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "newest") {
      list = [...list].sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate;
      });
    }

    return list;
  })();

  return (
    <div className="space-y-10 animate-fade-in fade-in transition-colors duration-300 dark:text-gray-100">
      {/* Featured Banner */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl h-72 flex items-center justify-center bg-gray-900 group mt-4">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&q=80"
          alt="Winter collection"
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
            The Debre Birhan Collection
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto drop-shadow-sm">
            Hand-crafted traditional & urban wear optimized for the Ethiopian
            highland weather.
          </p>
        </div>
      </section>

      {notice && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-gray-900 dark:bg-gray-100 dark:text-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <span>🛍️</span> {notice}
        </div>
      )}

      {/* Grid and Filtering Section */}
      <section className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit sticky top-24">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>
            Filter By
          </h3>

          <div className="space-y-6">
            {categories.length > 1 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 outline-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {sizes.length > 1 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${selectedSize === s ? "bg-orange-500 text-white border-orange-500" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-orange-500"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {colors.length > 1 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Colors
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${selectedColor === c ? "bg-orange-500 text-white border-orange-500" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-orange-500"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedSize("All");
                setSelectedColor("All");
              }}
              className="w-full py-2.5 mt-2 text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Collection{" "}
              <span className="text-gray-400 dark:text-gray-500 text-lg font-normal ml-2">
                ({filteredProducts.length} items)
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search clothing..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pl-10 pr-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                    ></path>
                  </svg>
                </span>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 px-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 animate-pulse space-y-4"
                >
                  <div className="w-full aspect-[4/5] bg-gray-200 dark:bg-gray-800 rounded-xl" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="dark:bg-gray-800 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all h-full bg-white border border-gray-100 shadow-sm flex flex-col"
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No clothes found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedSize("All");
                  setSelectedColor("All");
                  setSearchQuery("");
                  setSortBy("featured");
                }}
                className="mt-4 text-orange-500 font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
