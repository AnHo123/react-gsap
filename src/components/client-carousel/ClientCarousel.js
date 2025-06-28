import "./ClientCarousel.css";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClientCarouselStatItem from "./ClientCarouselStatItem";

const mainClients = [
  {
    src: "https://placehold.co/200x80/667eea/FFFFFF?text=GOOGLE",
    alt: "Google",
  },
  {
    src: "https://placehold.co/200x80/764ba2/FFFFFF?text=MICROSOFT",
    alt: "Microsoft",
  },
  {
    src: "https://placehold.co/200x80/667eea/FFFFFF?text=APPLE",
    alt: "Apple",
  },
  {
    src: "https://placehold.co/200x80/764ba2/FFFFFF?text=TESLA",
    alt: "Tesla",
  },
  {
    src: "https://placehold.co/200x80/667eea/FFFFFF?text=AMAZON",
    alt: "Amazon",
  },
  { src: "https://placehold.co/200x80/764ba2/FFFFFF?text=META", alt: "Meta" },
  {
    src: "https://placehold.co/200x80/667eea/FFFFFF?text=NETFLIX",
    alt: "Netflix",
  },
  {
    src: "https://placehold.co/200x80/764ba2/FFFFFF?text=SPOTIFY",
    alt: "Spotify",
  },
  {
    src: "https://placehold.co/200x80/667eea/FFFFFF?text=AIRBNB",
    alt: "Airbnb",
  },
  { src: "https://placehold.co/200x80/764ba2/FFFFFF?text=UBER", alt: "Uber" },
];

const reverseClients = [
  {
    src: "https://placehold.co/200x80/9333ea/FFFFFF?text=SALESFORCE",
    alt: "Salesforce",
  },
  {
    src: "https://placehold.co/200x80/ec4899/FFFFFF?text=ADOBE",
    alt: "Adobe",
  },
  {
    src: "https://placehold.co/200x80/9333ea/FFFFFF?text=NVIDIA",
    alt: "Nvidia",
  },
  { src: "https://placehold.co/200x80/ec4899/FFFFFF?text=ZOOM", alt: "Zoom" },
  {
    src: "https://placehold.co/200x80/9333ea/FFFFFF?text=SLACK",
    alt: "Slack",
  },
  {
    src: "https://placehold.co/200x80/ec4899/FFFFFF?text=DROPBOX",
    alt: "Dropbox",
  },
  {
    src: "https://placehold.co/200x80/9333ea/FFFFFF?text=SHOPIFY",
    alt: "Shopify",
  },
  {
    src: "https://placehold.co/200x80/ec4899/FFFFFF?text=STRIPE",
    alt: "Stripe",
  },
  {
    src: "https://placehold.co/200x80/9333ea/FFFFFF?text=TWILIO",
    alt: "Twilio",
  },
  {
    src: "https://placehold.co/200x80/ec4899/FFFFFF?text=FIGMA",
    alt: "Figma",
  },
];

const stats = [
  { target: 500, label: "Leaders Coached" },
  { target: 50, label: "Fortune 500 Companies" },
  { target: 25, label: "TEDx Talks Delivered" },
  { target: 98, label: "% Success Rate" },
];

gsap.registerPlugin(ScrollTrigger);

export default function ClientCarousel() {
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  useEffect(() => {
    const slider1 = slider1Ref.current;
    const slider2 = slider2Ref.current;
    if (!slider1 || !slider2) return;

    function animateSlider(slider, direction = 1) {
      const slides = slider.children;
      if (!slides.length) return null;
      const slideWidth = slides[0].offsetWidth + 60;
      const totalWidth = (slideWidth * slides.length) / 2;
      gsap.set(slider, { x: direction === 1 ? 0 : -totalWidth });
      return gsap.to(slider, {
        x: direction === 1 ? -totalWidth : 0,
        duration: 40,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(slider, { x: direction === 1 ? 0 : -totalWidth });
        },
      });
    }

    // Animate entrance and start auto-scroll
    ScrollTrigger.create({
      trigger: ".clients-section",
      start: "top 60%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.fromTo(
          ".clients-header",
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            stagger: { amount: 0.5, from: "start" },
          }
        ).fromTo(
          [slider1, slider2],
          { y: 100, opacity: 0 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            onComplete: () => {
              animateSlider(slider1, 1);
              animateSlider(slider2, -1);
            },
          }
        );
      },
    });
  }, []);

  return (
    <section className="clients-section" id="clients">
      <div className="container">
        <div>
          <h2
            className="clients-header"
            style={{
              textAlign: "center",
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              fontWeight: 800,
              marginBottom: 30,
            }}
          >
            Trusted by Industry Leaders
          </h2>
          <p
            className="clients-header"
            style={{
              textAlign: "center",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              maxWidth: 800,
              margin: "0 auto",
              opacity: 0.9,
            }}
          >
            From Fortune 500 companies to innovative startups, world-class
            organizations choose Simon for transformational speaking coaching.
          </p>
        </div>

        <div className="clients-slider-container">
          {/* Main Slider */}
          <div className="clients-slider" id="clientsSlider" ref={slider1Ref}>
            {mainClients.map((client, idx) => (
              <div className="client-slide" key={client.alt + idx}>
                <img
                  src={client.src}
                  alt={client.alt}
                  className="client-logo"
                />
              </div>
            ))}
          </div>

          {/* Reverse Slider */}
          <div
            className="clients-slider reverse"
            id="clientsSliderReverse"
            ref={slider2Ref}
          >
            {reverseClients.map((client, idx) => (
              <div className="client-slide" key={client.alt + idx}>
                <img
                  src={client.src}
                  alt={client.alt}
                  className="client-logo"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          {stats.map((stat, idx) => (
            <ClientCarouselStatItem
              label={stat.label}
              target={stat.target}
              key={stat.label + idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
