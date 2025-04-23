// components/CreatePostPopup.tsx
'use client';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import ImageCropper from './ImageCropper';
import AddMusic from './AddMusic';
import { uploadImage } from '../utils/uploadImage';

interface CreatePostPopupProps {
  onClose: () => void;
  onPost: (imageUrl: string) => void;  // ← now takes a URL string
}

export default function CreatePostPopup({ onClose, onPost }: CreatePostPopupProps) {
  const [step, setStep] = useState<'upload' | 'crop' | 'music'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string>(''); 
  console.log('file founded', file);
  console.log('files are attach', step);
  console.log('files are disturbing', src);

  // 1) After picking file, go to crop
  const handleUploadNext = (f: File) => {
    setFile(f);
    setSrc(URL.createObjectURL(f));
    setStep('crop');
  };

  // 2) After cropping, go to music step
  const handleCropComplete = (croppedFile: File) => {
    setFile(croppedFile);
    setSrc(URL.createObjectURL(croppedFile));
    setStep('music');
  };

  // 3) Final “Post” — upload then bubble up URL
  const handlePost = async () => {
    if (!file) return;
    try {
      const imageUrl = await uploadImage(file);
      onPost(imageUrl);
      onClose();
    } catch (err) {
      console.error('Upload failed', err);
      alert('Could not upload image.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: '#fff', padding: 20, borderRadius: 10,
        width: 500, position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'transparent', fontSize: 18 }}>✖</button>
        <h3>Create a Post</h3>

        {step === 'upload' && (
          <ImageUpload
            setImage={(f) => handleUploadNext(f!)}
            onNext={() => { } } activeTab={''} setActiveTab={function (value: React.SetStateAction<string>): void {
              throw new Error('Function not implemented.');
            } }/>
        )}

        {step === 'crop' && src && (
          <ImageCropper
            imageSrc={src}
            onCropComplete={handleCropComplete}
          />
        )}

        {step === 'music' && src && file && (
          <div>
            <p><strong>Preview:</strong></p>
            <img src={src} alt="Cropped preview" style={{ width: '100%', borderRadius: 8 }} />
            <AddMusic image={file} onBack={() => setStep('crop')} onPost={function (file: File): void {
              throw new Error('Function not implemented.');
            } } />
          </div>
        )}

        {step === 'music' && file &&  (
          <button onClick={handlePost} style={{ marginTop: 20 }}>
            Post
          </button>
        )}
      </div>
    </div>
  );
}
