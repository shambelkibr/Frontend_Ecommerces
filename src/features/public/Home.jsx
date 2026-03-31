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

  const mockClothes = [
    { id: 'm1', name: 'Debre Birhan Thick Bernos', price: 2500, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a3c46?w=500&q=80', description: 'Hand-woven traditional Ethiopian winter cloak.', category: 'Men', size: 'XL', color: 'Black' },
    { id: 'm2', name: 'Shemma Dress with Tilet', price: 4200, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80', description: 'Elegant cultural wear directly from local weavers.', category: 'Women', size: 'M', color: 'White' },
    { id: 'm3', name: 'Modern Wool Coat', price: 6500, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80', description: 'Stay warm in style with locally manufactured coats.', category: 'Unisex', size: 'L', color: 'Grey' },
    { id: 'm4', name: 'Habesha T-Shirt', price: 800, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', description: 'Casual cotton t-shirt with local art prints.', category: 'Men', size: 'M', color: 'White' },
    { id: 'm5', name: 'Highland Jacket', price: 4500, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80', description: 'Weather resistant jacket, perfect for Debre Birhan cold.', category: 'Women', size: 'S', color: 'Red' }
  ];

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data?.length ? res.data : mockClothes);
      })
      .catch(() => setProducts(mockClothes));
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

  // Derived unique filter options
  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];
  const sizes = ["All", "S", "M", "L", "XL"];
  const colors = ["All", ...new Set(products.map(p => p.color).filter(Boolean))];

  // Apply filters
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchSize = selectedSize === "All" || p.size === selectedSize;
    const matchColor = selectedColor === "All" || p.color === selectedColor;
    return matchCategory && matchSize && matchColor;
  });

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
            Hand-crafted traditional & urban wear optimized for the Ethiopian highland weather.
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filter By
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 outline-none"
                      value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map(s => (
                  <button 
                    key={s} 
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${selectedSize === s ? 'bg-orange-500 text-white border-orange-500' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-orange-500'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {colors.map(c => (
                 <button 
                  key={c} 
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${selectedColor === c ? 'bg-orange-500 text-white border-orange-500' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-orange-500'}`}
                >
                  {c}
                </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => { setSelectedCategory("All"); setSelectedSize("All"); setSelectedColor("All"); }}
              className="w-full py-2.5 mt-2 text-sm font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Collection <span className="text-gray-400 dark:text-gray-500 text-lg font-normal ml-2">({filteredProducts.length} items)</span>
            </h2>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="dark:bg-gray-800 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all h-full bg-white border border-gray-100 shadow-sm flex flex-col">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No clothes found matching your filters.</p>
              <button 
                onClick={() => { setSelectedCategory("All"); setSelectedSize("All"); setSelectedColor("All"); }}
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
