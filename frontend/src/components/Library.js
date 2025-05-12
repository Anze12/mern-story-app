import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; 

export default function Library({ user }) {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/stories/library/${user._id}`)
      .then(res => setLibrary(res.data));
  }, [user]);

  return (
    <div className="story-list">
      <h2>My Library</h2>
      {library.map(story => (
        <div key={story._id} className="story-card">
          <h3>{story.title}</h3>
          <p>{story.content}</p>
        </div>
      ))}
    </div>
  );
}
