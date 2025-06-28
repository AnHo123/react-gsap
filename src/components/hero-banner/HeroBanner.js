import { useEffect } from "react";
import "./HeroBanner.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBanner() {
  // Determine which headline to show based on screen size
  const [isTablet, setIsTablet] = useState(
    window.matchMedia("(min-width: 620px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 620px)");
    const handleChange = (e) => setIsTablet(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  function initializeAnimations() {
    // Header scroll effect
    ScrollTrigger.create({
      start: "top -80",
      end: 99999,
      toggleClass: { className: "scrolled", targets: ".main-header" },
    });

    // Hero section elements
    const heroVideo = document.querySelector(".hero-video");
    const heroVideoOverlay = document.querySelector(".hero-video-overlay");
    const headlineLines = document.querySelectorAll(
      ".hero-headline .headline-line"
    );
    const heroCta = document.querySelector(".hero-cta");

    if (
      !heroVideo ||
      !heroVideoOverlay ||
      headlineLines.length === 0 ||
      !heroCta
    ) {
      console.error("Essential elements not found");
      return;
    }

    const heroHeadline = document.querySelector(".hero-headline");

    gsap.set(heroCta, { opacity: 0, y: 30, scale: 0.8 });
    gsap.set(heroVideoOverlay, { opacity: 0 });
    gsap.set(heroHeadline, { opacity: 1 });

    // Enhanced text splitting with glitch effect
    const splitTextIntoChars = (element) => {
      const text = element.textContent;
      element.innerHTML = "";
      const words = text.split(" ");
      const spans = [];
      words.forEach((word, idx) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        span.style.opacity = 0;
        span.style.transform = "translateY(100px) rotateX(90deg)";
        element.appendChild(span);
        spans.push(span);
        if (idx < words.length - 1) {
          element.appendChild(document.createTextNode("\u00A0"));
        }
      });
      return spans;
    };

    // Enhanced hero animation with advanced effects
    const startHeroAnimation = () => {
      const tl = gsap.timeline({
        defaults: { ease: "back.out(1.7)", once: true },
      });

      // Animate text with 3D transforms and stagger
      headlineLines.forEach((line, index) => {
        const chars = splitTextIntoChars(line);

        tl.to(
          chars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: {
              amount: 0.8,
              from: "random",
            },
            ease: "back.out(1.7)",
          },
          index * 0.3
        );
      });

      // CTA with bounce effect
      tl.to(
        heroCta,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        }
        // "+=0.3"
      );

      // Continuous floating animation for CTA
      gsap.to(heroCta, {
        y: 0,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        //   delay: 0.25,
      });

      // Video expansion with elastic effect
      tl.to(
        heroVideo,
        {
          clipPath: "circle(150% at 50% 50%)",
          duration: 2.5,
          ease: "elastic.out(1, 0.5)",
        },
        "+=0.5"
      );

      // Overlay with gradient animation
      tl.to(
        heroVideoOverlay,
        {
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
        },
        "<"
      );
    };

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: target,
            ease: "power2.inOut",
          });
        }
      });
    });

    // Hero video load handling
    heroVideo.oncanplaythrough = () => {
      startHeroAnimation();
    };

    heroVideo.onerror = () => {
      gsap.set(heroVideo, { opacity: 0 });
      startHeroAnimation();
    };

    if (heroVideo.readyState >= 4) {
      startHeroAnimation();
    }
  }

  // Enhanced text splitting with glitch effect
  const splitTextIntoChars = (element) => {
    const text = element.textContent;
    element.innerHTML = "";
    const words = text.split(" ");
    const spans = [];
    words.forEach((word, idx) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.opacity = 0;
      span.style.transform = "translateY(100px) rotateX(90deg)";
      element.appendChild(span);
      spans.push(span);
      if (idx < words.length - 1) {
        element.appendChild(document.createTextNode("\u00A0"));
      }
    });
    return spans;
  };

  const startHeroAnimation = () => {
    // Hero section elements
    const heroVideo = document.querySelector(".hero-video");
    const heroVideoOverlay = document.querySelector(".hero-video-overlay");
    const headlineLines = document.querySelectorAll(
      ".hero-headline .headline-line"
    );
    const heroCta = document.querySelector(".hero-cta");

    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
    const heroHeadline = document.querySelector(".hero-headline");

    gsap.set(heroCta, { opacity: 0, y: 30, scale: 0.8 });
    gsap.set(heroVideoOverlay, { opacity: 0 });
    gsap.set(heroHeadline, { opacity: 1 });

    if (
      !heroVideo ||
      !heroVideoOverlay ||
      headlineLines.length === 0 ||
      !heroCta
    ) {
      console.error("Essential elements not found");
      return;
    }

    // Animate text with 3D transforms and stagger
    headlineLines.forEach((line, index) => {
      const words = splitTextIntoChars(line);

      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: {
            amount: 0.8,
            from: "random",
          },
        },
        index * 0.3
      );
    });

    // CTA with bounce effect
    tl.to(
      heroCta,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      }
      // "+=0.3"
    );

    // Continuous floating animation for CTA
    gsap.to(heroCta, {
      y: 0,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      //   delay: 0.25,
    });

    // Video expansion with elastic effect
    tl.to(
      heroVideo,
      {
        clipPath: "circle(150% at 50% 50%)",
        duration: 2.5,
        ease: "elastic.out(1, 0.5)",
      },
      "+=0.5"
    );

    // Overlay with gradient animation
    tl.to(
      heroVideoOverlay,
      {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    );
  };

  useEffect(() => {
    // Loading screen animation
    const loadingScreen = document.querySelector(".loading-screen");

    gsap.to(loadingScreen, {
      opacity: 0,
      duration: 0,
      // duration: 1,
      // delay: 2,
      ease: "power2.inOut",
      onComplete: () => {
        loadingScreen.style.display = "none";
        initializeAnimations();
        startHeroAnimation();
      },
    });
    // eslint-disable-next-line
  }, [isTablet]);

  return (
    <>
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <span>Loading Experience...</span>
      </div>

      <section className="hero-section" id="home">
        <div className="hero-video-container">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source
              src="https://videos.pexels.com/video-files/3256542/3256542-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="hero-video-overlay"></div>
        <div className="hero-content">
          {!isTablet ? (
            <h1 className="hero-headline headline-mobile">
              <span className="headline-line">Have a World Public</span>
              <span className="headline-line">Speaking Champion</span>
              <span className="headline-line">as your own personal,</span>
              <span className="headline-line">speech coach,</span>
              <span className="headline-line">speech writer, and more.</span>
            </h1>
          ) : (
            <h1 className="hero-headline headline-tablet">
              <span className="headline-line">
                Have a World Public Speaking Champion
              </span>
              <span className="headline-line">
                as your own personal speech coach,
              </span>
              <span className="headline-line">speech writer, and more.</span>
            </h1>
          )}
          <a href="#promotion" className="btn btn-secondary hero-cta">
            Schedule a free consultation
          </a>
        </div>
      </section>
    </>
  );
}
