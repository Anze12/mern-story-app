import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

export default function StoryList({ user, setView, setEditingStory }) {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState('');

  const fetchStories = async () => {
    const res = await axios.get('http://localhost:5000/api/stories');
    setStories(res.data);
  };

  const handleSearch = async () => {
    if (!search.trim()) return fetchStories();
    const res = await axios.get(`http://localhost:5000/api/stories/search?q=${search}`);
    setStories(res.data);
  };

  const favorite = async (id) => {
    await axios.post('http://localhost:5000/api/stories/favorite', { userId: user._id, storyId: id });
    alert('Added to library!');
  };

  const deleteStory = async (id) => {
    await axios.delete(`http://localhost:5000/api/stories/${id}`);
    fetchStories();
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="story-list">
      <h2>All Stories</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search stories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {stories.map(story => (
        <div key={story._id} className="story-card">
          <h3>{story.title}</h3>
          <p>{story.content}</p>
          <p><i>By {story.author.username}</i></p>
          <button onClick={() => favorite(story._id)}>💖 Favorite</button>
          {user._id === story.author._id && (
            <>
              <button onClick={() => { setEditingStory(story); setView('create'); }}>✏️ Edit</button>
              <button onClick={() => deleteStory(story._id)}>🗑️ Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
