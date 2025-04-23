'use client';
import React from 'react';

interface AddMusicProps {
  image: File;
  onBack: () => void;
  onPost: (file: File) => void;
}

export default function AddMusic({ image, onBack, onPost }: AddMusicProps) {
  const previewUrl = URL.createObjectURL(image);

  return (
    <div id='2'>
      <p><strong>Image Selected:</strong></p>
      <img src={previewUrl} alt="Selected" style={{ width: '100%', borderRadius: 10 }} />

      <input type="text" placeholder="Search music..." style={{ marginTop: 10, width: '100%' }} />
      <div style={{ marginTop: 10, display: 'flex', gap: 10 }} >
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
