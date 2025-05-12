import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 

export default function Login({ setUser, setView }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      setUser(res.data);
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          value={form.username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
        />
        <button type="submit">Login</button>
        <p onClick={() => setView('register')}>
          Don't have an account? <span>Register</span>
        </p>
      </form>
    </div>
  );
}
