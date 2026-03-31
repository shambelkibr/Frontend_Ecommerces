import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const DEBRE_BIRHAN_ZONES = [
  { id: 1, kebele: "Kebele 01 (Atse Zera Yacob)", fee: 30 },
  { id: 2, kebele: "Kebele 02 (Basso)", fee: 40 },
  { id: 3, kebele: "Kebele 03 (Tebasi)", fee: 50 },
  { id: 4, kebele: "Kebele 04 (Gwang)", fee: 35 },
  { id: 5, kebele: "Kebele 05", fee: 45 },
  { id: 6, kebele: "Kebele 06", fee: 50 },
  { id: 7, kebele: "Kebele 07", fee: 60 },
  { id: 8, kebele: "Kebele 08 (Industrial Zone)", fee: 70 },
  { id: 9, kebele: "Kebele 09 (University Area)", fee: 40 },
];

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  // Local Shipping State
  const [selectedKebele, setSelectedKebele] = useState(DEBRE_BIRHAN_ZONES[0]);
  const [specificAddress, setSpecificAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cbebirr");

  // Mock static values (In real life, fetch this from cart summary)
  const cartSubtotal = 4200; 
  const totalAmount = cartSubtotal + selectedKebele.fee;

  async function handleCheckout(e) {
    e.preventDefault();
    if (!specificAddress || !contactPhone) {
      setMessage({ text: "Please provide a specific address and phone number.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Pass the specific shipping info down to the order API
      await api.post("/orders/checkout", {
        location_id: selectedKebele.id,
        kebele: selectedKebele.kebele,
        shipping_fee: selectedKebele.fee,
        delivery_address: specificAddress,
        contact_phone: contactPhone,
        payment_method: paymentMethod,
        total_amount: totalAmount
      });
      
      setMessage({ text: "Order created successfully! Redirecting...", type: "success" });
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      setMessage({ text: error?.response?.data?.message || "Checkout failed.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in fade-in">
      
      {/* Left Column: Shipping Info */}
      <form onSubmit={handleCheckout} className="space-y-6">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>📍</span> Delivery Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input 
                type="text" 
                value="Debre Birhan" 
                disabled 
                className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Kebele</label>
              <select 
                value={selectedKebele.id}
                onChange={(e) => {
                  const zone = DEBRE_BIRHAN_ZONES.find(z => z.id === Number(e.target.value));
                  setSelectedKebele(zone);
                }}
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              >
                {DEBRE_BIRHAN_ZONES.map(zone => (
                  <option key={zone.id} value={zone.id}>{zone.kebele}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specific Address</label>
              <textarea 
                required
                rows="2"
                placeholder="E.g. Near St. Trinity Church, House No 142"
                value={specificAddress}
                onChange={(e) => setSpecificAddress(e.target.value)}
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input 
                required
                type="tel" 
                placeholder="+251..."
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>💳</span> Payment Method
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" value="cbebirr" checked={paymentMethod === 'cbebirr'} onChange={(e)=>setPaymentMethod(e.target.value)} className="w-5 h-5 text-orange-600 focus:ring-orange-500" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Commercial_Bank_of_Ethiopia_logo.svg/120px-Commercial_Bank_of_Ethiopia_logo.svg.png" alt="CBE" className="h-6 object-contain" onError={(e) => e.target.style.display='none'}/>
              <span className="font-medium text-gray-800">CBE Birr</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" value="telebirr" checked={paymentMethod === 'telebirr'} onChange={(e)=>setPaymentMethod(e.target.value)} className="w-5 h-5 text-orange-600 focus:ring-orange-500" />
              <span className="font-medium text-gray-800">Telebirr</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="radio" value="cash" checked={paymentMethod === 'cash'} onChange={(e)=>setPaymentMethod(e.target.value)} className="w-5 h-5 text-orange-600 focus:ring-orange-500" />
              <span className="font-medium text-gray-800">Cash on Delivery</span>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-4 text-lg font-bold flex justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : `Pay ${totalAmount.toLocaleString()} ETB & Complete Order`}
        </button>

        {message.text && (
          <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {message.text}
          </div>
        )}
      </form>

      {/* Right Column: Order Summary */}
      <div className="card p-6 md:p-8 h-fit sticky top-24 bg-gray-50 border-none shadow-none">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
        <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center justify-between text-gray-600">
            <span>Subtotal (Mock)</span>
            <span>{cartSubtotal.toLocaleString()} ETB</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span>Delivery Fee ({selectedKebele.kebele})</span>
            <span>{selectedKebele.fee.toLocaleString()} ETB</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xl font-extrabold text-gray-900">
          <span>Total To Pay</span>
          <span>{totalAmount.toLocaleString()} ETB</span>
        </div>
        <div className="mt-8 bg-orange-100 text-orange-800 p-4 rounded-lg text-sm flex gap-3 items-start">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <p>
            Delivery within Debre Birhan takes approximately 2-4 hours. You will receive a call from our dispatch team before arrival.
          </p>
        </div>
      </div>

    </div>
  );
}
