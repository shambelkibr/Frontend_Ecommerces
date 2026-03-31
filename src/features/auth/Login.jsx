import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password);
      if (user.role === "seller") navigate("/seller/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } catch {
      setError("Login failed. Check your credentials.");
    }
  }

  return (
    <div className="page-shell max-w-lg">
      <form onSubmit={handleSubmit} className="card-surface p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <input
          className="mt-4 w-full rounded-lg border border-amber-300 p-3"
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
        <button className="mt-4 w-full rounded-lg bg-amber-700 p-3 font-semibold text-white">
          Login
        </button>
      </form>
    </div>
  );
}
