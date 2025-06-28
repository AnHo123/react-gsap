import "./VideoService.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function VideoService() {
  const containerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const debounceRef = useRef(null);

  useEffect(() => {
    const videos = gsap.utils.toArray(".video-bg");
    videos.forEach((video) => {
      video.play().catch((error) => {
        const section = video.closest(".video-section");
        if (section) section.style.backgroundImage = "";
      });
    });

    let masterTimeline;

    const createMasterTimeline = (scrollEnd) => {
      if (masterTimeline) masterTimeline.kill();
      masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${scrollEnd}`,
          id: "master-st",
        },
      });

      const animateSection = (selector) =>
        gsap
          .timeline()
          .to(`${selector} .line`, {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power2.out",
          })
          .to({}, { duration: 1.5 });

      masterTimeline
        .addLabel("startSection1")
        .add(animateSection("#section1"))

        .addLabel("startSection2")
        .to("#section1", { opacity: 0, duration: 1 }, "-=1")
        .to("#section2", { opacity: 1, duration: 1 }, "<")
        .add(animateSection("#section2"))

        .addLabel("startSection3")
        .to("#section2", { opacity: 0, duration: 1 }, "-=1")
        .to("#section3", { opacity: 1, duration: 1 }, "<")
        .add(animateSection("#section3"))

        .addLabel("startFinalSection");
    };

    const setupTimeline = () => {
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": () => createMasterTimeline(5000),
        "(max-width: 768px)": () => createMasterTimeline(3000),
      });
    };

    setupTimeline();

    const handleResize = () => {
      ScrollTrigger.killAll();
      setupTimeline();
    };

    window.addEventListener("resize", handleResize);

    ScrollTrigger.addEventListener("scrollEnd", () => {
      const masterST = ScrollTrigger.getById("master-st");
      if (!masterST) return;

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const progress = masterST.progress;
        const final = document.querySelector("#final-section");

        if (window.scrollY >= (final?.offsetTop || 0) - window.innerHeight) {
          currentIndexRef.current = 3;
        } else if (progress < 0.33) {
          currentIndexRef.current = 0;
        } else if (progress < 0.66) {
          currentIndexRef.current = 1;
        } else {
          currentIndexRef.current = 2;
        }
      }, 50);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main ref={containerRef} className="video-container">
      <section id="section1" className="video-section">
        <video
          className="video-bg"
          src="https://videos.pexels.com/video-files/3256542/3256542-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1920x1080/000000/ffffff?text=Video+Error";
          }}
        ></video>
        <div className="text-content">
          <h4 className="line service-heading">Our Services</h4>
          <h2 className="line service-title">Coaching</h2>
          <p className="line service-desc">
            Unlock your full potential with personalized guidance.
          </p>
          <p className="line service-desc">
            Navigate challenges and achieve your ambitious goals.
          </p>
          <p className="line service-desc">
            Transform your approach, transform your result.
          </p>
          <div className="line price-box">
            <span className="price">$997/Month</span>
            <span className="price-subtext">Limited spaces available.</span>
          </div>
          <a href="#" className="line cta-button">
            LET'S GET STARTED
          </a>
        </div>
      </section>

      <section id="section2" className="video-section">
        <video
          className="video-bg"
          src="https://videos.pexels.com/video-files/7414128/7414128-hd_1920_1080_24fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1920x1080/000000/ffffff?text=Video+Error";
          }}
        ></video>
        <div className="text-content">
          <h4 className="line service-heading">Our Services</h4>
          <h2 className="line service-title">TUNE UP</h2>
          <p className="line service-desc">
            Refine your strategies with expert insights.
          </p>
          <p className="line service-desc">
            Get targeted advice to overcome specific hurdles.
          </p>
          <p className="line service-desc">
            A quick way to boost performance and clarity.
          </p>
          <div className="line price-box">
            <span className="price">$250/hr</span>
            <span className="price-subtext">
              Additional detail or selling point goes here.
            </span>
          </div>
          <a href="#" className="line cta-button">
            LET'S GET STARTED
          </a>
        </div>
      </section>

      <section id="section3" className="video-section">
        <video
          className="video-bg"
          src="https://videos.pexels.com/video-files/5725960/5725960-hd_1920_1080_30fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/1920x1080/000000/ffffff?text=Video+Error";
          }}
        ></video>
        <div className="text-content">
          <h4 className="line service-heading">Our Services</h4>
          <h2 className="line service-title">Presentations</h2>
          <p className="line service-desc">
            Craft compelling narratives that captivate audiences.
          </p>
          <p className="line service-desc">
            Deliver your message with confidence and impact.
          </p>
          <p className="line service-desc">
            From concept to stage, we've got you covered.
          </p>
          <div className="line price-box">
            <span className="price">$100/minute of speaking time</span>
            <span className="price-subtext">
              (ie 10 minute speech - $1000). Includes first draft, edits, and
              presentation training.
            </span>
          </div>
          <a href="#" className="line cta-button">
            LET'S GET STARTED
          </a>
        </div>
      </section>
    </main>
  );
}
