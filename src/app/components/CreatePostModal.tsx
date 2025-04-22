// components/ImageUpload.tsx
import React from 'react';

interface ImageUploadProps {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  onNext: () => void;
}

export default function ImageUpload({ setImage, onNext }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file); // Set the uploaded image to state
      onNext(); // Proceed to the next step
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
