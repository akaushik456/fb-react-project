'use client';
import React from 'react';

interface StoryItemProps {
  story: {
    id: number;
    username: string;
    image: string;
  };
  onClick: () => void;
}

export default function StoryItem({ story, onClick }: StoryItemProps) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', height:'100%' }}>
      <img
        src={story.image}
        alt={story.username}
        style={{ width: '100%', height: '100%', objectFit: 'cover', position:'relative' }}
      />
      <p style={{position:'absolute', bottom:'15px', width:'100%', color:'#fff'}}>{story.username}</p>
    </div>
  );
}
