// components/ImageUpload.tsx
'use client';
import React from 'react';

interface ImageUploadProps {
  setImage: (image: File | null) => void;
  onNext: () => void;
}

export default function ImageUpload({ setImage, onNext }: ImageUploadProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file); // Pass the selected image to the parent
      onNext(); // Proceed to next step (e.g., crop step)
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
}
