import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    try {
      await axios.post('/api/auth/register', formData, { withCredentials: true });
    } catch (error) {
      console.log(error.message)
    }

    setFormData({
      name: '',
      email: '',
      password: ''
    });
  }
  return (
    <div className="flex justify-center items-center h-full">
      <div className="shadow-xl p-5 rounded-2xl flex flex-col gap-5 max-w-1/5 w-full">
        <h1 className="text-xl font-bold text-center text-blue-500">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="name">Name: </label>
            <input
              className="px-3 py-1 border-b outline-0"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value})}
              id="name"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email: </label>
            <input
              className="px-3 py-1 border-b outline-0"
              type="email"
              placeholder="example@mail.com"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value})}
              id="email"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password: </label>
            <input
              className="px-3 py-1 border-b outline-0"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value})}
              id="password"
            />
          </div>
          <button
            className="py-2 bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 transition-all duration-500 rounded-2xl"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center">New to Notes Maker <Link className='text-blue-500' to='/login'>Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
