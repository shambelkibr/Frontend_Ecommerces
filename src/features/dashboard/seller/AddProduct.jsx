import { useState } from "react";
import api from "../../../services/api";
import Sidebar from "../../../core/layout/Sidebar";

const links = [
  { to: "/seller/dashboard", label: "Dashboard overview" },
  { to: "/seller/add-product", label: "Add New Product" },
  { to: "/seller/products", label: "Manage Inventory" },
  { to: "/seller/orders", label: "Fulfill Orders" },
  { to: "/seller/upload-license", label: "Business License" },
];

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    basePrice: "",
    categoryId: "1", // defaulting to a generic clothing type
  });
  
  const [variants, setVariants] = useState([
    { size: 'M', color: '', material: 'Shemma', quantity: 1, priceAdjustment: 0 }
  ]);
  
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleAddVariant = () => {
    setVariants([...variants, { size: 'L', color: '', material: 'Shemma', quantity: 1, priceAdjustment: 0 }]);
  };
  
  const handleRemoveVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    const minified = [...variants];
    minified[index][field] = value;
    setVariants(minified);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    // Accommodate old API expectations until backend rewrite is 100% finished
    formData.append("price", Number(form.basePrice));
    formData.append("quantity", variants.reduce((acc, curr) => acc + Number(curr.quantity), 0));
    formData.append("categoryId", form.categoryId);
    
    // Pass strictly new variant data as JSON string for backend
    formData.append("variantsData", JSON.stringify(variants));

    if (imageFile) formData.append("image", imageFile);

    try {
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ text: "Product published successfully to your shop!", type: "success" });
      setForm({ name: "", description: "", basePrice: "", categoryId: "1" });
      setVariants([{ size: 'M', color: '', material: 'Shemma', quantity: 1, priceAdjustment: 0 }]);
      setImageFile(null);
    } catch (error) {
      setMessage({ text: error?.response?.data?.message || "Failed to publish product.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-[280px_1fr] animate-fade-in fade-in">
      <Sidebar links={links} title="Seller Portal" />
      
      <div className="space-y-6">
        <div className="card p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Listing</h1>
            <p className="text-gray-500 mt-2">Add a new local clothing product, specify sizes, materials, and inventory.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Base Information */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><span>📝</span> Basic Detail</h3>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                    placeholder="e.g. Handmade Tilet Dress"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (ETB)</label>
                  <input
                    required
                    type="number"
                    min="0"
                    placeholder="2500"
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow"
                    value={form.basePrice}
                    onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  >
                    <option value="1">Traditional Clothes (Habesha Kemis)</option>
                    <option value="2">Winter Wear (Bernos/Coats)</option>
                    <option value="3">Accessories</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows="3"
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Describe the fabric, heritage, and fitting..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 2. Variants Section (Size, Material, Stock) */}
            <div className="bg-orange-50/50 p-6 rounded-xl border border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><span>👕</span> Variations & Stock</h3>
                <button type="button" onClick={handleAddVariant} className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  Add Variant
                </button>
              </div>

              <div className="space-y-3">
                {variants.map((v, i) => (
                  <div key={i} className="flex flex-wrap md:flex-nowrap gap-3 items-end bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative group">
                    <div className="w-full md:w-auto flex-1">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Size</label>
                      <select value={v.size} onChange={e=>updateVariant(i, 'size', e.target.value)} className="w-full border-gray-300 rounded p-2 text-sm bg-gray-50 outline-none">
                        <option>One Size</option><option>S</option><option>M</option><option>L</option><option>XL</option>
                      </select>
                    </div>
                    <div className="w-full md:w-auto flex-1">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Color / Tilet Options</label>
                      <input type="text" placeholder="e.g. Red/Gold" value={v.color} onChange={e=>updateVariant(i, 'color', e.target.value)} className="w-full border-gray-300 bg-gray-50 rounded p-2 text-sm outline-none border focus:border-orange-500" />
                    </div>
                    <div className="w-full md:w-auto flex-1">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Material Details</label>
                      <input type="text" placeholder="e.g. Pure Cotton" value={v.material} onChange={e=>updateVariant(i, 'material', e.target.value)} className="w-full border-gray-300 bg-gray-50 rounded p-2 text-sm outline-none border focus:border-orange-500" />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Quantity</label>
                      <input type="number" min="0" value={v.quantity} onChange={e=>updateVariant(i, 'quantity', e.target.value)} className="w-full border-gray-300 bg-gray-50 rounded p-2 text-sm outline-none border focus:border-orange-500" />
                    </div>
                    {variants.length > 1 && (
                      <button type="button" onClick={() => handleRemoveVariant(i)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg self-end mb-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Image Upload */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
              <label className="w-full cursor-pointer flex flex-col items-center py-6 border-2 border-dashed border-gray-300 rounded-xl hover:bg-orange-50 hover:border-orange-300 transition-all">
                <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span className="text-sm font-medium text-gray-600">
                  {imageFile ? imageFile.name : "Click to upload primary image"}
                </span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  required
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <button
              disabled={loading}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Publishing Uploads...
                </>
              ) : "Publish Listing"}
            </button>
            
            {message.text && (
              <div className={`p-4 rounded-xl text-center font-medium ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                {message.text}
              </div>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
}
