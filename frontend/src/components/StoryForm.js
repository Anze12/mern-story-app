import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

export default function StoryForm({ user, editingStory, setEditingStory, setView }) {
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    if (editingStory) {
      setForm({ title: editingStory.title, content: editingStory.content });
    }
  }, [editingStory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingStory) {
      await axios.put(`http://localhost:5000/api/stories/${editingStory._id}`, form);
      alert('Story updated!');
      setEditingStory(null);
    } else {
      await axios.post('http://localhost:5000/api/stories/create', { ...form, userId: user._id });
      alert('Story created!');
    }
    setForm({ title: '', content: '' });
    setView('home');
  };

  return (
    <div className="story-form">
      <h2>{editingStory ? 'Edit Story' : 'Write a Story'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Story content..."
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        ></textarea>
        <button type="submit">{editingStory ? 'Update' : 'Publish'}</button>
        {editingStory && (
          <button type="button" onClick={() => { setEditingStory(null); setForm({ title: '', content: '' }); }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
