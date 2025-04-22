import React from "react";
import Header from "./components/Header";
import StoryGallery from "./components/StoryGallery";
import HomePage from "./components/HomePage";

const Home: React.FC = () => {
  return (
    <div>
      <Header />

      <div className="three-sides">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <div className="container">
            {/* Left sidebar content here */}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="container">
          <HomePage />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="container">
            {/* Right sidebar content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
