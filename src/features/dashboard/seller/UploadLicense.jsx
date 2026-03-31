import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function UploadLicense() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [license, setLicense] = useState(null);

  async function loadLicense() {
    try {
      const { data } = await api.get("/sellers/license/me");
      setLicense(data);
    } catch {
      setLicense(null);
    }
  }

  useEffect(() => {
    loadLicense();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("license", file);

    try {
      await api.post("/sellers/license/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("License uploaded. Awaiting admin review.");
      setFile(null);
      loadLicense();
    } catch (error) {
      setMessage(error?.response?.data?.message || "Upload failed.");
    }
  }

  return (
    <div className="page-shell max-w-2xl">
      <form onSubmit={handleSubmit} className="card-surface p-6">
        <h1 className="text-2xl font-bold">Upload Trading License</h1>
        <p className="mt-2 text-sm text-amber-900/80">
          Current status:{" "}
          <span className="font-semibold">
            {license?.status || "not uploaded"}
          </span>
        </p>
        <input
          className="mt-4 block w-full"
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button className="mt-4 rounded-lg bg-amber-700 px-4 py-2 font-semibold text-white">
          Upload
        </button>
        {message && <p className="mt-3 text-sm">{message}</p>}
      </form>
    </div>
  );
}
