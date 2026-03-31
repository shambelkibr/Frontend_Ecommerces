import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-orange-100 to-white p-12 rounded-3xl shadow-xl overflow-hidden border border-orange-50">
        
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Discover the Heart of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">Debre Birhan</span> Clothing
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Experience the finest authentic Habesha Kemis, heavy winter blankets, 
            and modern street-wear curated specifically from local expert weavers and shops.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary flex items-center justify-center text-lg px-8 py-4">
              Explore Collections
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
            <Link to="/register" className="btn-secondary flex items-center justify-center text-lg px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 hover:bg-gray-50">
              Open a Seller Shop
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="card p-6 text-center hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Local Creators</h3>
          <p className="text-gray-600">Buy directly from top-rated textile artisans in the region.</p>
        </div>
        <div className="card p-6 text-center hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">☀️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Weather-Ready</h3>
          <p className="text-gray-600">Find thick Bernos and modern coats perfect for the Debre Birhan chill.</p>
        </div>
        <div className="card p-6 text-center hover:-translate-y-2 transition-transform duration-300">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⚡</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Delivered specifically to your Kebele within hours of purchasing.</p>
        </div>
      </div>
    </div>
  );
}
