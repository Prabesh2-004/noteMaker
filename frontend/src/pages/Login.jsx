import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Login = () => {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      localStorage.setItem("accessToken", res.data.accessToken);
      setUser(res.data.user);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="shadow-xl p-5 rounded-2xl flex flex-col gap-5 w-full max-w-sm">
        <h1 className="text-xl font-bold text-center text-blue-500">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="bg-blue-500 text-white py-2 rounded-xl">
            Sign In
          </button>
        </form>

        <p className="text-center">
          New here?{" "}
          <Link className="text-blue-500" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
