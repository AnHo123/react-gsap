import "./Promo.css";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Video from "./Promo.mp4";
import VideoThumbnail from "./video-thumbnail.png";

gsap.registerPlugin(ScrollTrigger);

export default function Promo() {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const rootRef = useRef(null);
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(rootRef, { amount: 0.5, once: true });

  useEffect(() => {
    const animate = () => {
      // Section reveals with advanced animations
      gsap.fromTo(
        ".section-reveal",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: { amount: 0.5, from: "start" },
        }
      );
    };

    if (isInView) animate();
  }, [isInView]);

  return (
    <section ref={rootRef} className="promotion-section" id="promotion">
      <div className="container">
        <h2 className="promo-title section-reveal">
          Your Next Promotion, Pitch, or TEDx Talk Begins Here.
        </h2>
        <p className="section-reveal">
          Speak with presence, lead with clarity, and command the room—with
          1-on-1 training tailored to your unique needs, goals, and challenges.
        </p>
      </div>
      <div className="promotion-video-wrapper section-reveal" ref={wrapperRef}>
        <video
          ref={videoRef}
          className="video-popup-video"
          width="100%"
          controls
          poster={VideoThumbnail}
        >
          <source src={Video} type="video/mp4" />
          Your browser does not support HTML video.
        </video>

        {showPlayButton && (
          <button
            className="promotion-video-play-button"
            onClick={() => {
              videoRef.current.play();
              setShowPlayButton(false);
            }}
          >
            <div className="promotion-video-play-icon"></div>
          </button>
        )}
      </div>
    </section>
  );
}
