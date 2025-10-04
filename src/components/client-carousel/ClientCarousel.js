import "./ClientCarousel.css";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClientCarouselStatItem from "./ClientCarouselStatItem";
import LogoATAndT from "./logo-AT&T.png";
import LogoFacebook from "./logo-facebook.png";
import LogoHoneywell from "./logo-Honeywell.png";
import LogoItserve from "./logo-itserve.png";
import LogoMCkinsey from "./logo-mckinsey.png";
import LogoMit from "./logo-mit.png";
import LogoTrinket from "./logo-trinket.svg";
import LogoVia from "./logo-via.png";

const mainClients = [
  {
    src: LogoATAndT,
    alt: "AT & T",
  },
  {
    src: LogoFacebook,
    alt: "Facebook",
  },
  {
    src: LogoHoneywell,
    alt: "Honeywell",
  },
  {
    src: LogoItserve,
    alt: "Itserve",
  },
  {
    src: LogoATAndT,
    alt: "AT & T",
  },
  {
    src: LogoFacebook,
    alt: "Facebook",
  },
  {
    src: LogoHoneywell,
    alt: "Honeywell",
  },
  {
    src: LogoItserve,
    alt: "Itserve",
  },
];

const reverseClients = [
  {
    src: LogoMCkinsey,
    alt: "McKinsey",
  },
  {
    src: LogoMit,
    alt: "MIT",
  },
  {
    src: LogoTrinket,
    alt: "Trinket",
  },
  {
    src: LogoVia,
    alt: "Via",
  },
  {
    src: LogoMCkinsey,
    alt: "McKinsey",
  },
  {
    src: LogoMit,
    alt: "MIT",
  },
  {
    src: LogoTrinket,
    alt: "Trinket",
  },
  {
    src: LogoVia,
    alt: "Via",
  },
];

const stats = [
  { target: 20, label: "Years of public speaking experience", unit: "+" },
  { target: 200, label: "Speeches Written", unit: "+" },
  { target: 18, label: "Ivy MBA Applications Secured" },
  { target: 100, label: "Satisfaction Guarantee", unit: "%" },
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
      // Calculate total width dynamically for variable-width slides
      let totalWidth = 0;
      for (let i = 0; i < slides.length; i++) {
        totalWidth += slides[i].offsetWidth + 60; // 60px gap
      }
      totalWidth = totalWidth / 2;
      // Use explicit pixel values for transform
      gsap.set(slider, { x: direction === 1 ? 0 : -totalWidth });
      return gsap.to(slider, {
        x: direction === 1 ? -totalWidth : 0,
        duration: 30,
        ease: "none",
        repeat: -1,
        autoRound: false, // Prevent Safari rounding issues
        force3D: true, // Enable hardware acceleration for Safari
        onUpdate: () => {
          // Force transform to use px
          slider.style.transform = `translateX(${gsap.getProperty(
            slider,
            "x"
          )}px)`;
        },
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
            From senior executives to aspiring changemakers, professionals from
            some of the world’s top institutions choose Speak With Simon’s
            transformative speaking coaching.
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
              unit={stat.unit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
