'use client';

import React, { useEffect } from 'react';

interface StoryModalProps {
  story: {
    id: number;
    username: string;
    image: string;
  };
  onClose: () => void;
}

export default function StoryModal({ story, onClose }: StoryModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 800000); // Close the modal after some time
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%',
      height: '100%', backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      color: '#fff', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#222', padding: '20px', borderRadius: '10px',
        textAlign: 'center', maxWidth: '90vw', maxHeight: '90vh',
        width: '400px', position: 'relative', boxShadow: '0 0 30px rgba(0,0,0,0.5)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            background: 'transparent', border: 'none',
            color: '#fff', fontSize: '18px', cursor: 'pointer'
          }}
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={story.image}
          alt={story.username}
          style={{
            marginTop: '10px', maxWidth: '100%', borderRadius: '10px'
          }}
        />

        {/* Username */}
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{story.username}</p>

        {/* Message Input */}
        <input
          type="text"
          placeholder="Send a message..."
          style={{
            width: '100%', padding: '8px', marginTop: '10px',
            borderRadius: '5px', border: 'none'
          }}
        />

        {/* Emoji Reactions */}
        <div style={{ marginTop: '10px', fontSize: '22px', cursor: 'pointer' }}>
          ❤️ 😂 😢 🔥 👏
        </div>
      </div>
    </div>
  );
}
