import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const user = await register({ name, email, password, role });
      if (user.role === "seller") navigate("/seller/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch {
      setError("Registration failed.");
    }
  }

  return (
    <div className="page-shell max-w-lg">
      <form onSubmit={handleSubmit} className="card-surface p-6">
        <h1 className="text-2xl font-bold">Register</h1>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <input
          className="mt-4 w-full rounded-lg border border-amber-300 p-3"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="mt-3 w-full rounded-lg border border-amber-300 p-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mt-3 w-full rounded-lg border border-amber-300 p-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="mt-3 w-full rounded-lg border border-amber-300 p-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button className="mt-4 w-full rounded-lg bg-amber-700 p-3 font-semibold text-white">
          Create Account
        </button>
      </form>
    </div>
  );
}
