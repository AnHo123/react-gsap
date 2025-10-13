import "./BeforeWeBegin.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// --- UTILITY: TEXT SPLITTING ---
function splitTextIntoLines(selector) {
  document.querySelectorAll(selector).forEach((p) => {
    const text = p.innerHTML;
    p.innerHTML = `<span className="line-inner">${text}</span>`;
  });
}

function splitTextIntoChars(selector) {
  const element = document.querySelector(selector);
  if (element) {
    const text = element.textContent.trim();
    element.innerHTML = text
      .split(" ")
      .map(
        (char) =>
          `<span className="char" style="display:inline-block;">${
            char.trim() === "" ? "&nbsp;" : char
          }</span><span> </span>`
      )
      .join("");
    return element.querySelectorAll(".char");
  }
  return [];
}

export default function BeforeWeBegin() {
  const mainRef = useRef(null);
  const isInView = useInView(mainRef, { amount: 0.15, once: true });

  useEffect(() => {
    function initPageAnimations() {
      // Split text for animations
      splitTextIntoLines(".bwg-client-text p");

      // --- HERO SECTION ---
      const heroTitleChars = splitTextIntoChars(".bwg-hero-title");
      const heroSubtitleChars = splitTextIntoChars(".bwg-hero-subtitle");

      // Detect mobile device
      const isMobile = window.innerWidth < 768;

      if (isMobile && isInView) {
        const timeline = gsap.timeline();
        // Simple fade-in animation for mobile
        timeline
          .fromTo(".bwg-hero", { opacity: 0 }, { opacity: 1, duration: 0.5 })
          .fromTo(".bwg-hero", { opacity: 0 }, { opacity: 1, duration: 0.5 })
          .fromTo(
            ".bwg-hero-title",
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            }
          )
          .fromTo(
            ".bwg-hero-subtitle",
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            "<0.1"
          )
          .to(
            ".bwg-main-container",
            {
              backgroundColor: "transparent",
              duration: 0.5,
              ease: "power2.inOut",
            },
            "<"
          )
          .from(".bwg-cards-container .bwg-section-title", {
            opacity: 0,
            y: 50,
          })
          .from(
            ".bwg-card",
            {
              opacity: 0,
              y: 100,
              rotationX: -45,
              stagger: 0.2,
              ease: "power3.out",
            },
            "<"
          )
          .to(
            ".bwg-card .bwg-x-mark",
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
              stagger: 0.15,
            },
            ">0.5"
          )
          .to(".bwg-card", { filter: "brightness(0.4)", duration: 0.5 }, "<")
          .from(
            ".bwg-rejection-text",
            { opacity: 0, y: 20, rotationX: -90, stagger: 0.02 },
            ">0.25"
          )
          .to(
            [".bwg-cards-grid", ".bwg-cards-container .bwg-section-title"],
            { opacity: 0, y: -50, duration: 0.5, ease: "power2.in" },
            ">1"
          )
          .to(
            ".bwg-rejection-text-wrapper",
            { y: "-=300", duration: 1, ease: "power2.inOut" },
            "<"
          )
          .to(
            ".bwg-rejection-text",
            {
              fontSize: "clamp(1.5rem, 5vw, 4rem)",
              duration: 1,
              ease: "power2.inOut",
            },
            "<"
          )
          .to(".bwg-new-content", { opacity: 1, duration: 0.5 }, ">-0.25")
          .from(".bwg-new-content-text", {
            opacity: 0,
            y: 20,
            stagger: 0.015,
          })
          .to(".bwg-main-container", {
            backgroundColor: "#000000",
            duration: 1,
            ease: "power2.inOut",
          });
        return;
      }

      gsap.fromTo(".bwg-hero", { opacity: 0 }, { opacity: 1, duration: 0.5 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".bwg-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: window.innerWidth > 768, // disable pin on mobile
          },
        })
        .from(heroTitleChars, {
          y: "100%",
          rotationX: -90,
          opacity: 0,
          stagger: 0.02,
          ease: "power3.out",
        })
        .from(
          heroSubtitleChars,
          {
            y: "100%",
            rotationX: -90,
            opacity: 0,
            stagger: 0.02,
            ease: "power3.out",
          },
          "<"
        )
        .to(
          ".bwg-hero-content",
          {
            scale: 0.9,
            opacity: 0,
            filter: "blur(5px)",
            ease: "power2.in",
          },
          "-=0.25"
        )
        .to(
          ".bwg-main-container",
          {
            backgroundColor: "transparent",
            duration: 0.5,
            ease: "power2.inOut",
          },
          "<"
        );

      // --- CARDS SECTION ---
      const rejectionChars = splitTextIntoChars(".bwg-rejection-text");
      const newContentChars = splitTextIntoChars(".bwg-new-content-text");

      let cardsTimeline;
      ScrollTrigger.create({
        trigger: ".bwg-cards-section",
        start: "top 80%",
        onEnter: () => {
          if (cardsTimeline) return; // Prevent duplicate timelines
          cardsTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".bwg-cards-section",
              start: "top top",
              end: "bottom top",
              scrub: 1,
              pin: window.innerWidth > 768, // disable pin on mobile
            },
          });

          cardsTimeline
            .from(".bwg-cards-container .bwg-section-title", {
              opacity: 0,
              y: 50,
            })
            .from(
              ".bwg-card",
              {
                opacity: 0,
                y: 100,
                rotationX: -45,
                stagger: 0.2,
                ease: "power3.out",
              },
              "<"
            )
            .to(
              ".bwg-card .bwg-x-mark",
              {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: "back.out(1.7)",
                stagger: 0.15,
              },
              ">0.5"
            )
            .to(".bwg-card", { filter: "brightness(0.4)", duration: 0.5 }, "<")
            .from(
              rejectionChars,
              { opacity: 0, y: 20, rotationX: -90, stagger: 0.02 },
              ">0.25"
            )
            .to(
              [".bwg-cards-grid", ".bwg-cards-container .bwg-section-title"],
              { opacity: 0, y: -50, duration: 0.5, ease: "power2.in" },
              ">1"
            )
            .to(
              ".bwg-rejection-text-wrapper",
              { y: "-=300", duration: 1, ease: "power2.inOut" },
              "<"
            )
            .to(
              ".bwg-rejection-text",
              {
                fontSize: "clamp(1.5rem, 5vw, 4rem)",
                duration: 1,
                ease: "power2.inOut",
              },
              "<"
            )
            .to(".bwg-new-content", { opacity: 1, duration: 0.5 }, ">-0.25")
            .from(newContentChars, {
              opacity: 0,
              y: 20,
              stagger: 0.015,
            })
            .to(".bwg-main-container", {
              backgroundColor: "#000000",
              duration: 1,
              ease: "power2.inOut",
            });
        },
      });

      // force refresh for mobile viewport issues
      ScrollTrigger.refresh();
      window.addEventListener("resize", ScrollTrigger.refresh);
    }

    initPageAnimations();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", ScrollTrigger.refresh);
    };
  }, []);

  return (
    <section className="bwg-main-container" ref={mainRef}>
      <section className="bwg-section bwg-hero">
        <div className="bwg-hero-content">
          <h1 className="bwg-hero-title">Before We Begin...</h1>
          <p className="bwg-hero-subtitle">
            If we're going to work together, I want to make sure that I can help
            you get the progress you need, as quickly as possible.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="bwg-section bwg-cards-section">
        <div className="bwg-cards-container">
          <h2 className="bwg-section-title">If you're looking for...</h2>
          <div className="bwg-cards-grid">
            <div className="bwg-card" data-card="1">
              <div className="bwg-card-icon">🚀</div>
              <h3 className="bwg-card-title">A quick fix</h3>
              <p className="bwg-card-description">
                Looking for an overnight transformation without the work
              </p>
              <div className="bwg-x-overlay">
                <div className="bwg-x-mark">✗</div>
              </div>
            </div>
            <div className="bwg-card" data-card="2">
              <div className="bwg-card-icon">🔄</div>
              <h3 className="bwg-card-title">Resistant to feedback</h3>
              <p className="bwg-card-description">
                Not open to critique or new ways of thinking
              </p>
              <div className="bwg-x-overlay">
                <div className="bwg-x-mark">✗</div>
              </div>
            </div>
            <div className="bwg-card" data-card="3">
              <div className="bwg-card-icon">👀</div>
              <h3 className="bwg-card-title">Passive participation</h3>
              <p className="bwg-card-description">
                Expecting transformation just by showing up
              </p>
              <div className="bwg-x-overlay">
                <div className="bwg-x-mark">✗</div>
              </div>
            </div>
            <div className="bwg-card" data-card="4">
              <div className="bwg-card-icon">🎲</div>
              <h3 className="bwg-card-title">Winging it</h3>
              <p className="bwg-card-description">
                Relying on luck instead of strategy
              </p>
              <div className="bwg-x-overlay">
                <div className="bwg-x-mark">✗</div>
              </div>
            </div>
          </div>
          <div className="bwg-rejection-text-wrapper">
            <p className="bwg-rejection-text">
              ...then I'd rather not waste your time and money.
            </p>
          </div>

          <div className="bwg-new-content">
            <p className="bwg-new-content-text">
              But if you're looking for someone who listens, challenges, and
              helps you to craft your unique voice — you're in the right place.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
