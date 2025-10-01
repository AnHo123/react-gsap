import "./Promo.css";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Video from "./Promo.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function Promo() {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  useEffect(() => {
    const animate = () => {
      // Section reveals with advanced animations
      gsap.utils.toArray(".section-reveal").forEach((section) => {
        if (!section) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none", // Only play once
            once: true, // Not strictly needed, but for clarity
          },
        });

        tl.fromTo(
          section,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotateX: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
          }
        );
      });

      if (wrapperRef.current) {
        gsap.fromTo(
          wrapperRef.current,
          { opacity: 0, y: 200 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 100%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    // Run on mount
    animate();

    // Run on resize
    window.addEventListener("resize", animate);

    // Cleanup
    return () => window.removeEventListener("resize", animate);
  }, []);

  return (
    <section class="promotion-section" id="promotion">
      <div class="container">
        <h2 class="promo-title section-reveal">
          Your Next Promotion, Pitch, or TEDx Talk Begins Here.
        </h2>
        <p class="section-reveal">
          Speak with presence, lead with clarity, and command the room—with
          1-on-1 training tailored to your unique needs, goals, and challenges.
        </p>
      </div>
      <div class="promotion-video-wrapper" ref={wrapperRef}>
        <video
          ref={videoRef}
          className="video-popup-video"
          width="100%"
          controls
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
