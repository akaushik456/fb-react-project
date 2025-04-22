'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './UploadStory.module.css';

export default function UploadStory() {
  const fileInput = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoryClick = () => {
    if (previewUrl) {
      setShowPopup(true);
    } else {
      fileInput.current?.click();
    }
  };

  // Detect outside click to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  return (
    <>
      <div
        className={styles.storyImg}
        onClick={handleStoryClick}
        style={{
          backgroundImage: `linear-gradient(#0000, #00000080), url(${previewUrl || '/images/status-1.jpg'})`
        }}
      >
        <div className={styles.background}>
          <img
            src="/images/upload.png"
            alt="Upload"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
          <p>Create Story</p>
        </div>
        <input
          type="file"
          ref={fileInput}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {showPopup && previewUrl && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent} ref={popupRef}>
            <img
              src={previewUrl}
              alt="Story Preview"
              className={styles.popupImage}
            />
            <button
              className={styles.closeBtn}
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
