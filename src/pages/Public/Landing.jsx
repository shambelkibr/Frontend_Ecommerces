import { Link } from "react-router-dom";

const featured = [
  {
    name: "Debre Gold Traditional",
    type: "Traditional",
    price: 420,
    image:
      "https://images.unsplash.com/photo-1609346749122-f4fbf15f9a78?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Honey Flame Reserve",
    type: "Flavored",
    price: 510,
    image:
      "https://images.unsplash.com/photo-1514361892635-6f5b0f6f3f80?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Highland Premium Oak",
    type: "Premium",
    price: 680,
    image:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Landing() {
  return (
    <div className="page-shell space-y-8">
      <section className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-900">
            Verified Sellers • CBE Birr Payment
          </p>
          <h1 className="text-5xl font-bold leading-tight text-amber-900">
            Authentic Areke,
            <span className="block text-teal-800">
              bottled with local pride.
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-amber-900/85">
            Shop from trusted Debre Birhan sellers. Safe onboarding, license
            verification, and smooth checkout.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white transition hover:bg-amber-800"
            >
              Start Shopping
            </Link>
            <Link
              to="/register"
              className="rounded-xl border border-amber-400 bg-amber-100 px-5 py-3 font-semibold text-amber-900 transition hover:bg-amber-200"
            >
              Become a Seller
            </Link>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1571421580360-6479f18f9d16?auto=format&fit=crop&w=1200&q=80"
          alt="Areke bottle presentation"
          className="card-surface h-[380px] w-full object-cover"
        />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-amber-900">
            Featured Products
          </h2>
          <Link
            to="/"
            className="text-sm font-semibold text-teal-900 underline"
          >
            Explore all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <article
              key={item.name}
              className="card-surface overflow-hidden transition hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-teal-800">
                  {item.type}
                </p>
                <h3 className="mt-1 text-lg font-bold">{item.name}</h3>
                <p className="mt-2 font-semibold text-amber-800">
                  {item.price} Birr
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card-surface p-5">
          <p className="text-3xl font-bold text-amber-800">100%</p>
          <p className="mt-2 text-sm text-amber-900/80">
            Seller licenses verified before product listing.
          </p>
        </div>
        <div className="card-surface p-5">
          <p className="text-3xl font-bold text-amber-800">24/7</p>
          <p className="mt-2 text-sm text-amber-900/80">
            Order support and tracking visibility for customers.
          </p>
        </div>
        <div className="card-surface p-5">
          <p className="text-3xl font-bold text-amber-800">CBE</p>
          <p className="mt-2 text-sm text-amber-900/80">
            Easy payment process with CBE Birr flow.
          </p>
        </div>
      </section>
    </div>
  );
}
