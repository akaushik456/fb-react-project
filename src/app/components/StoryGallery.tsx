'use client';
import styles from './StoryGallery.module.css';
import dynamic from 'next/dynamic';
import React, { useState, useRef } from 'react';
import StoryItem from './StoryItem'; // Import StoryItem component

const StoryModal = dynamic(() => import('./StoryModal'), { ssr: false });
const UploadStory = dynamic(() => import('./UploadStory'), { ssr: false });

const dummyStories = [
  { id: 1, username: 'Alisoin', image: '/images/member-1.png' },
  { id: 2, username: 'Jackson', image: '/images/member-2.png' },
  { id: 3, username: 'Neilsein', image: '/images/member-3.png' },
  { id: 4, username: 'Richard', image: '/images/member-4.png' },
  { id: 5, username: 'Richard', image: '/images/member-4.png' },
];

export default function StoryGallery() {
  const [activeStory, setActiveStory] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      {/* Story Container - Drag to scroll */}
      <div
        className={styles.container}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* Upload Story Card */}
        <div className={`${styles.storyCard} ${styles.uploadStory}`}>
          <UploadStory />
        </div>

        {/* Render Stories */}
        {dummyStories.map(story => (
          <div key={story.id} className={styles.storyCard}>
            <StoryItem
              story={story}
              onClick={() => setActiveStory(story)} // Set active story on click
            />
          </div>
        ))}
      </div>

      {/* Story Modal - Display active story */}
      {activeStory && (
        <StoryModal
          story={activeStory}
          onClose={() => setActiveStory(null)} // Close the modal and reset active story
        />
      )}
    </>
  );
}
