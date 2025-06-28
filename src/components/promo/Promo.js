import "./Promo.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Promo() {
  const wrapperRef = useRef(null);
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
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  );
}
