import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function VerifySellers() {
  const [licenses, setLicenses] = useState([]);

  function loadPending() {
    api
      .get("/sellers/licenses/pending")
      .then((res) => setLicenses(res.data || []))
      .catch(() => setLicenses([]));
  }

  useEffect(() => {
    loadPending();
  }, []);

  async function review(id, status) {
    await api.patch(`/sellers/licenses/${id}/review`, { status });
    loadPending();
  }

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-bold">Verify Sellers</h1>
      <div className="mt-5 space-y-3">
        {licenses.map((item) => (
          <div key={item.id} className="card-surface p-4">
            <p className="font-semibold">{item.seller_name}</p>
            <p className="text-sm">Status: {item.status}</p>
            <div className="mt-3 flex gap-2">
              <button
                className="rounded bg-teal-700 px-3 py-2 text-sm font-semibold text-white"
                onClick={() => review(item.id, "approved")}
              >
                Approve
              </button>
              <button
                className="rounded bg-red-700 px-3 py-2 text-sm font-semibold text-white"
                onClick={() => review(item.id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
