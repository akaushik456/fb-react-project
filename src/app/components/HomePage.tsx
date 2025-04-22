// HomePage.tsx
'use client';
import { useState } from 'react';
import styles from './HomePage.module.css';
import Image from 'next/image';
import StoryGallery from '../components/StoryGallery';
import CreatePostModal from '../components/CreatePostPopup';

export default function HomePage() {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [postTime] = useState(new Date().toLocaleString());
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);  // Add this to store posts

  const handleLike = () => setLikes(likes + 1);

  const handleComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput('');
    }
  };

  // This is where you handle the post (the image in this case)
  const handlePost = (image: File) => {
    // You can add more logic here to save the post, upload to a server, etc.
    const newPost = {
      image,
      createdAt: new Date().toLocaleString(),
    };
    setPosts([newPost, ...posts]); // Add the new post to the posts list
    setShowModal(false); // Close the modal after posting
  };

  return (
    <div className="container">
      {/* Create Post Box */}
      <div className={styles.createPost}>
        <div className={styles.inputRow}>
          <Image src="/images/profile-pic.png.jpg" width={40} height={40} alt="profile" className={styles.profile} />
          <input type="text" placeholder="What's on your mind, Aman?" />
        </div>
        <div className={styles.actionRow}>
          <span>📹 Live video</span>
          <span onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>📷 Photo/video</span>
          <span>😊 Feeling/activity</span>
        </div>
      </div>

      <StoryGallery />

      {/* Post */}
      <div className={styles.post}>
        <div className={styles.postHeader}>
          <Image src="/images/profile-pic.png.jpg" width={40} height={40} alt="profile" className={styles.profile} />
          <div>
            <strong><p>Aman Kaushik</p></strong>
            <p>{postTime}</p>
          </div>
        </div>

        <div className={styles.postContent}>
          <div className={styles.postImageBox}>
            <p>
              Look once at my <b>RESUME</b>. To see more, go to my GitHub and watch my videos.
              <a href="#">#github</a> <a href="#">#AmanKaushik</a>
            </p>
            <a href="https://akaushik456.github.io/my-resume/" target="_blank">
              <Image src="/images/feed-image-1.png" alt="post-img" className="post-img" width={500} height={300} />
            </a>
          </div>

          {/* Post Actions */}
          <div className={styles.postActions}>
            <button onClick={handleLike}>❤️ Like ({likes})</button>
            <button onClick={() => alert('Share functionality coming soon')}>🔗 Share</button>
          </div>

          {/* Comments Section */}
          <div className={styles.comments}>
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
            />
            <button onClick={handleComment}>Comment</button>

            <div className={styles.commentList}>
              {comments.map((comment, index) => (
                <p key={index}>💬 {comment}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Create Post */}
      {showModal && <CreatePostModal onClose={() => setShowModal(false)} onPost={handlePost} />}
    </div>
  );
}
