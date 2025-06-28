import { useState } from "react";
import "./VideoTestimonial.css";
import Thumbnail1 from "./Thumbnail_1.png";
import Thumbnail2 from "./Thumbnail_2.png";
import Thumbnail3 from "./Thumbnail_3.png";
import Thumbnail4 from "./Thumbnail_4.png";
import Thumbnail5 from "./Thumbnail_5.png";
import Video1 from "./Testimonial_1.mp4";
import Video2 from "./Testimonial_2.mp4";
import Video3 from "./Testimonial_3.mp4";
import Video4 from "./Testimonial_4.mp4";
import Video5 from "./Testimonial_5.mp4";
import { motion, AnimatePresence } from "framer-motion";

const videoTestimonialData = [
  {
    id: 1,
    nameLabel: "GIFF",
    name: "GIFF, Chief Experience Officer, Escaplan",
    description:
      "Working with Emergency Speaker Coach was transformational. My TEDx talk wouldn’t have landed without his guidance.",
    videoUrl: Video1,
    thumbnailUrl: Thumbnail1,
  },
  {
    id: 2,
    nameLabel: "PAUL",
    name: "PAUL, President / CEO, ViaSpaceHoldings",
    description:
      "I thought I just needed a few tips. What I got was a complete overhaul of how I show up on stage. I got funded. I got offers. I got confidence I’ve never felt before.",
    videoUrl: Video2,
    thumbnailUrl: Thumbnail2,
  },
  {
    id: 3,
    nameLabel: "YOYO",
    name: "Yoyo, Co-Founder, AssetSwap",
    description:
      "Giff helped me turn a mess of bullet points into the speech of my life. I was told afterward it was the best keynote our conference had ever had.",
    videoUrl: Video3,
    thumbnailUrl: Thumbnail3,
  },
  {
    id: 4,
    nameLabel: "JULIE",
    name: "Julie, Founder, ViaSpaceHoldings",
    description:
      "Before this, I hated public speaking. Now, I actually look forward to it. It’s like having a secret weapon in your pocket.",
    videoUrl: Video4,
    thumbnailUrl: Thumbnail4,
  },
  {
    id: 5,
    nameLabel: "BHARAT",
    name: "Bharat, Founding Advisor, Acquire.com",
    description:
      "He helped me connect with my story in a way I never had before. I didn’t just impress the audience—I moved them.",
    videoUrl: Video5,
    thumbnailUrl: Thumbnail5,
  },
];

export default function VideoTestimonial() {
  const [activeVideo, setActiveVideo] = useState(videoTestimonialData[0]);
  const [openVideoPopup, setOpenVideoPopup] = useState(false);

  return (
    <div className="video-testimonial">
      <div className="video-testimonial-contaner">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVideo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="video-testimonial-details-mb"
          >
            <p className="video-testimonial-description">
              {activeVideo.description}
            </p>
            <h2 className="video-testimonial-name">{activeVideo.name}</h2>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVideo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="video-testimonial-thumbnail"
          >
            <img
              src={activeVideo.thumbnailUrl}
              alt={activeVideo.name}
              className="video-testimonial-thumbnail-image"
            />
            <div className="video-testimonial-details">
              <p className="video-testimonial-description">
                {activeVideo.description}
              </p>
              <h2 className="video-testimonial-name">{activeVideo.name}</h2>
            </div>
            <button
              className="video-testimonial-play-button"
              onClick={() => setOpenVideoPopup(true)}
            >
              <div className="video-testimonial-play-icon"></div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="video-testimonial-panel">
        {videoTestimonialData.map((video) => (
          <motion.div
            key={video.id}
            className={`video-testimonial-panel-item ${
              activeVideo.id === video.id ? "active" : ""
            }`}
            onClick={() => setActiveVideo(video)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="video-testimonial-panel-item-image-container">
              <img
                src={video.thumbnailUrl}
                alt={video.name}
                className="video-testimonial-panel-item-image"
              />
            </div>
            <h3 className="video-testimonial-panel-item-title">
              {video.nameLabel}
            </h3>
            {activeVideo.id === video.id && (
              <div className="video-active-underline"></div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openVideoPopup && (
          <motion.div
            className={"video-popup"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="video-popup-content">
              <button
                className="video-popup-close"
                onClick={() => setOpenVideoPopup(false)}
              >
                &times;
              </button>
              <video
                className="video-popup-video"
                width="100%"
                controls
                autoPlay
              >
                <source
                  src={activeVideo.videoUrl}
                  type={
                    activeVideo.videoUrl.endsWith(".mov")
                      ? "video/quicktime"
                      : "video/mp4"
                  }
                />
                Your browser does not support HTML video.
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
