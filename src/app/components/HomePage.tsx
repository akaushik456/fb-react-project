'use client';
import { useState } from 'react';
import styles from './HomePage.module.css';
import Image from 'next/image';
import StoryGallery from '../components/StoryGallery';
import CreatePostModal from '../components/CreatePostPopup';

interface Post {
  imageUrl: string;
  createdAt: string;
  likes: number;
  comments: string[];
  commentInput: string;
}

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePost = (imageUrl: string) => {
    const newPost: Post = {
      imageUrl,
      createdAt: new Date().toLocaleString(),
      likes: 0,
      comments: [],
      commentInput: '',
    };
    setPosts([newPost, ...posts]);
    setShowModal(false);
  };

  const handleLike = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
  };

  const handleCommentInputChange = (index: number, value: string) => {
    const updatedPosts = [...posts];
    updatedPosts[index].commentInput = value;
    setPosts(updatedPosts);
  };

  const handleComment = (index: number) => {
    const updatedPosts = [...posts];
    const comment = updatedPosts[index].commentInput.trim();
    if (comment) {
      updatedPosts[index].comments.push(comment);
      updatedPosts[index].commentInput = '';
      setPosts(updatedPosts);
    }
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

      {/* Posts Loop */}
      {posts.map((post, index) => (
        <div key={index} className={styles.post}>
          <div className={styles.postHeader}>
            <Image src="/images/profile-pic.png.jpg" width={40} height={40} alt="profile" className={styles.profile} />
            <div>
              <strong><p>Aman Kaushik</p></strong>
              <p>{post.createdAt}</p>
            </div>
          </div>

          <div className={styles.postContent}>
            <div className={styles.postImageBox}>
              <p>
                Look once at my <b>RESUME</b>. To see more, go to my GitHub and watch my videos.
                <a href="#">#github</a> <a href="#">#AmanKaushik</a>
              </p>
              <a href="https://akaushik456.github.io/my-resume/" target="_blank">
                <Image src={post.imageUrl} alt="post-img" className="post-img" width={500} height={300} />
              </a>
            </div>

            {/* Post Actions */}
            <div className={styles.postActions}>
              <button onClick={() => handleLike(index)}>❤️ Like ({post.likes})</button>
              <button onClick={() => alert('Share functionality coming soon')}>🔗 Share</button>
            </div>

            {/* Comments Section */}
            <div className={styles.comments}>
              <input
                type="text"
                value={post.commentInput}
                onChange={(e) => handleCommentInputChange(index, e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={() => handleComment(index)}>Comment</button>

              <div className={styles.commentList}>
                {post.comments.map((comment, cIndex) => (
                  <p key={cIndex}>💬 {comment}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && <CreatePostModal onClose={() => setShowModal(false)} onPost={handlePost} />}
    </div>
  );
}
