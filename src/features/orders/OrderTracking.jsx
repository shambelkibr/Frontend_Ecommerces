import { useState } from "react";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId) {
      setError("Please enter a valid order ID");
      return;
    }
    setError("");
    
    // Mocking tracking fetch response for Debre Birhan Delivery
    setTimeout(() => {
      if (orderId === "123") {
        setTrackingData({
          id: "123",
          status: "shipped", // Try "pending", "processing", "shipped", "delivered"
          kebele: "Kebele 03 (Tebasi)",
          driverPhone: "+251 911 234 567",
          estimatedArrival: "Today, 4:30 PM",
          items: "Shemma Dress (M), Thick Bernos"
        });
      } else {
        setError("Order not found. Please verify your ID.");
        setTrackingData(null);
      }
    }, 600);
  };

  const steps = [
    { label: "Order Placed", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "On the Way", value: "shipped" },
    { label: "Delivered", value: "delivered" }
  ];

  const getCurrentStepIndex = (status) => {
    return steps.findIndex(s => s.value === status);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Track Your Package 📦</h1>
        <p className="text-gray-500 mt-2 text-lg">Enter your order ID below to see live updates</p>
      </div>

      <div className="card p-6 md:p-8 bg-white border border-gray-100 shadow-xl shadow-orange-100 mb-8">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="e.g. 123"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 p-4 text-gray-900 focus:ring-2 focus:ring-orange-500 outline-none text-lg"
          />
          <button type="submit" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            Track Order
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 font-medium px-2">{error}</p>}
      </div>

      {trackingData && (
        <div className="card p-6 md:p-10 border border-gray-100 shadow-md">
          <div className="flex flex-wrap justify-between items-start mb-10 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Order #{trackingData.id}</h2>
              <p className="text-gray-500 mt-1">{trackingData.items}</p>
            </div>
            <div className="text-right mt-4 sm:mt-0">
              <p className="text-sm text-gray-500 font-medium">Estimated Arrival</p>
              <p className="text-xl font-extrabold text-orange-600">{trackingData.estimatedArrival}</p>
            </div>
          </div>

          {/* Progress Bar UI */}
          <div className="relative mb-12">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-200 rounded-full"></div>
            
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-orange-600 rounded-full transition-all duration-1000"
              style={{ width: `${(getCurrentStepIndex(trackingData.status) / (steps.length - 1)) * 100}%` }}
            ></div>

            <div className="relative flex justify-between z-10">
              {steps.map((step, index) => {
                const isActive = index <= getCurrentStepIndex(trackingData.status);
                return (
                  <div key={step.value} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-colors duration-500 ${isActive ? 'bg-orange-600 text-white border-4 border-orange-100' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                      {isActive ? '✓' : index + 1}
                    </div>
                    <span className={`mt-3 text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Delivery Specifics */}
          <div className="bg-orange-50 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 bg-orange-200 text-orange-600 rounded-full flex items-center justify-center text-3xl shrink-0">
              🛵
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Destination: {trackingData.kebele}</h4>
              <p className="text-gray-600 mt-1 text-sm">
                Your local rider is preparing your package. For direct updates, you can contact the rider through the provided dispatch number.
              </p>
            </div>
            <div className="shrink-0 bg-white px-4 py-3 rounded-lg border border-orange-100 shadow-sm text-center">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Driver Contact</p>
              <p className="text-orange-600 font-black">{trackingData.driverPhone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
