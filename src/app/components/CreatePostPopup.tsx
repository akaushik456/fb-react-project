// components/CreatePostPopup.tsx
'use client';
import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import ImageCropper from './ImageCropper';
import AddMusic from './AddMusic';

interface CreatePostPopupProps {
  onClose: () => void;
  onPost: (image: File) => void;
}

export default function CreatePostPopup({ onClose, onPost }: CreatePostPopupProps) {
  const [step, setStep] = useState<'upload' | 'crop' | 'music'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string>(''); // blob URL for preview & crop
  const [croppedImage, setCroppedImage] = useState<File | null>(null);

  // After the user picks a file:
  const handleUploadNext = (f: File) => {
    const url = URL.createObjectURL(f);
    setFile(f);
    setSrc(url);
    setStep('crop');
  };

  // After they finish cropping:
  const handleCropComplete = (croppedFile: File) => {
    const url = URL.createObjectURL(croppedFile);
    setFile(croppedFile);
    setSrc(url);
    setStep('music');
  };

  const handleCroppedImage = (image: File) => {
    setCroppedImage(image);
    setStep('music'); // Move to the next step after cropping
  };
  
  // Final “Post” button:
  const handlePost = () => {
    if (file) onPost(file);
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
        <button onClick={onClose} style={{
          position: 'absolute', top: 10, right: 10, border: 'none',
          background: 'transparent', fontSize: 18
        }}>✖</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <img src="/images/profile-pic.png.jpg" width={40} height={40} alt="user" style={{ borderRadius: '50%' }} />

          <h3 style={{ margin: 0 }}>Create a Post</h3>

        </div>
        {step === 'upload' && (
          <ImageUpload
            setImage={(f) => handleUploadNext(f!)}
            onNext={() => {/* noop—handled in setImage */}}
          />
        )}

        {step === 'crop' && src && (
          <ImageCropper
            imageSrc={src} onCropComplete={function (croppedImage: string): void {
                throw new Error('Function implemented.');
            } } />
        )}

        {step === 'music' && src && file && (
          <div>
            {/* show a normal <img> so blob URLs work */}
            <p><strong>Preview:</strong></p>
            <img src={src} alt="Cropped preview" style={{ width: '100%', borderRadius: 8 }} />
            <AddMusic image={file} onBack={() => setStep('crop')} onPost={handlePost} />
          </div>
        )}

        {/* only show the final “Post” once we have a file and are in music step */}
        {step === 'music' && file && (
          <button onClick={handlePost} style={{ marginTop: 20 }}>
            Post
          </button>
        )}
      </div>
    </div>
  );
}
