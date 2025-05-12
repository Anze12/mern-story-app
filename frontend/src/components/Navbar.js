import React from 'react';
import '../App.css'; 

export default function Navbar({ user, setView, setUser }) {
  return (
    <nav className="navbar">
      <h1 onClick={() => setView('home')}>📚 Story App</h1>
      {user && (
        <div>
          <button onClick={() => setView('create')}>Write</button>
          <button onClick={() => setView('library')}>My Library</button>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      )}
    </nav>
  );
}