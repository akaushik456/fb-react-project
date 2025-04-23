'use client';
import React from 'react';

interface ImageUploadProps {
  setImage: (image: File | null) => void;
  onNext: () => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export default function ImageUpload({ setImage, onNext }: ImageUploadProps) {
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(file);

      // Upload to API
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          console.log('Uploaded:', data.imageUrl);
          // Optionally: store imageUrl in parent state too
          onNext(); // go to crop step or next step
        } else {
          console.error('Upload failed:', data.error);
        }
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
}
