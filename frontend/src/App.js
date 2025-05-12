import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import StoryList from './components/StoryList';
import StoryForm from './components/StoryForm';
import Login from './components/Login';
import Register from './components/Register';
import Library from './components/Library';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home');
  const [editingStory, setEditingStory] = useState(null);

  const renderView = () => {
    if (!user) {
      return view === 'register'
        ? <Register setUser={setUser} />
        : <Login setUser={setUser} setView={setView} />;
    }

    switch (view) {
      case 'home':
        return <StoryList user={user} setView={setView} setEditingStory={setEditingStory} />;
      case 'create':
        return <StoryForm user={user} editingStory={editingStory} setEditingStory={setEditingStory} setView={setView} />;
      case 'library':
        return <Library user={user} />;
      default:
        return <StoryList user={user} setView={setView} setEditingStory={setEditingStory} />;
    }
  };

  return (
    <div>
      <Navbar user={user} setView={setView} setUser={setUser} />
      <div className="container">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
