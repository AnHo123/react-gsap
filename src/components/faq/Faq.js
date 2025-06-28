import React, { useEffect, useRef } from "react";
import "./Faq.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView, motion, inView } from "framer-motion";
import FaqQuestion from "./FaqQuestion";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "Are you available for speaker training services worldwide?",
    answer:
      "Yes! I am happy to facilitate your speaker training worldwide, whether remotely or in person.",
  },
  {
    question:
      "My presentation is coming up ASAP--how quickly can you prepare a presentation?",
    answer:
      "I specialize in ultra-fast turnaround times for high-stakes presentations. I regularly draft TEDx Talks and major keynotes in 72 hours or less.",
  },
  {
    question:
      "English isn't my first language, can you help me to communicate clearly, improve my vocabulary, and to connect effectively with the audience?",
    answer:
      "Absolutely. I have supported clients from across Europe, Africa, Asia, MENA, and South America for over two decades. Cross-cultural communication has been central to my work.",
  },
  {
    question:
      "I'm not necessarily looking to give speeches, but I'd like to sound and feel more confident when I speak or conduct interviews. Can you help with that?",
    answer:
      "We have developed extensive training programs specifically for clients looking to communicate with confidence and clarity in interviews, office meetings and everyday settings. Please reach out, and we will be happy to share more information.",
  },
  {
    question:
      "Do you have workshops, seminars, or corporate training packages available?",
    answer:
      "Yes--please contact us, and we will be happy to share you an up-to-date listing of all of our available corporate training services and packages.",
  },
];

function splitTextIntoWords(text) {
  return text.split(" ").map((word, i) => (
    <span className="word" key={i}>
      {word.split("").map((char, j) => (
        <span className="char" key={j}>
          {char}
        </span>
      ))}{" "}
    </span>
  ));
}

export default function Faq() {
  const canvasRef = useRef(null);
  const faqRefs = useRef([]);
  const answerRefs = useRef([]);
  const questionTextRefs = useRef([]);
  const answerLineRefs = useRef([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    // Aurora Canvas Animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width, height;
    let animationFrameId;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", resize);
    resize();

    const gradients = [
      { stop1: "rgba(102, 126, 234, 0.2)", stop2: "rgba(102, 126, 234, 0)" },
      { stop1: "rgba(118, 75, 162, 0.2)", stop2: "rgba(118, 75, 162, 0)" },
    ];

    let orbs = gradients.map((grad) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 400 + 200,
      vx: Math.random() * 0.4 - 0.2,
      vy: Math.random() * 0.4 - 0.2,
      gradient: grad,
    }));

    function drawFaq() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle =
        getComputedStyle(document.documentElement).getPropertyValue(
          "--faq-bg-color"
        ) || "#fff";
      ctx.fillRect(0, 0, width, height);

      orbs.forEach((orb) => {
        let gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        gradient.addColorStop(0, orb.gradient.stop1);
        gradient.addColorStop(1, orb.gradient.stop2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 0 || orb.x > width) orb.vx *= -1;
        if (orb.y < 0 || orb.y > height) orb.vy *= -1;
      });
    }

    function animate() {
      drawFaq();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5, ease: "easeOut" },
    }),
  };

  //   useEffect(() => {
  //     // FAQ Items Animation
  //     // Run FAQ Items Animation only once when in view
  //     // Ensure FAQ animation runs fully even if user scrolls quickly
  //     ScrollTrigger.batch(".faq-item", {
  //       onEnter: (batch) => {
  //         gsap.to(batch, {
  //           opacity: 1,
  //           y: 0,
  //           duration: 0.8,
  //           stagger: 0.15,
  //           ease: "power3.out",
  //           onComplete: () => {
  //             // Animate question text after items are fully visible
  //             batch.forEach((item) => {
  //               gsap.fromTo(
  //                 item.querySelectorAll(".faq-question-text .char"),
  //                 { yPercent: 100, opacity: 0 },
  //                 {
  //                   yPercent: 0,
  //                   opacity: 1,
  //                   stagger: 0.02,
  //                   duration: 0.5,
  //                   ease: "power2.out",
  //                   overwrite: "auto",
  //                 }
  //               );
  //             });
  //           },
  //         });
  //       },
  //       start: "top 90%",
  //       onEnterBack: (batch) => {
  //         // If user scrolls back up, ensure items are visible
  //         gsap.set(batch, { opacity: 1, y: 0 });
  //       },
  //     });

  //     // If user scrolls too fast and misses trigger, force animation
  //     setTimeout(() => {
  //       document.querySelectorAll(".faq-item").forEach((item) => {
  //         if (window.scrollY + window.innerHeight > item.offsetTop + 40) {
  //           gsap.set(item, { opacity: 1, y: 0 });
  //           gsap.set(item.querySelectorAll(".faq-question-text .char"), {
  //             yPercent: 0,
  //             opacity: 1,
  //           });
  //         }
  //       });
  //     }, 1000);
  //   }, []);

  // Accordion logic
  //   const handleAccordion = (idx) => {
  //     faqRefs.current.forEach((item, i) => {
  //       if (i !== idx && item.classList.contains("active")) {
  //         item.classList.remove("active");
  //         gsap.to(answerRefs.current[i], {
  //           maxHeight: 0,
  //           duration: 0.4,
  //           ease: "power2.inOut",
  //         });
  //       }
  //     });

  //     const item = faqRefs.current[idx];
  //     const answer = answerRefs.current[idx];
  //     const answerLine = answerLineRefs.current[idx];

  //     const isActive = item.classList.toggle("active");
  //     if (isActive) {
  //       gsap
  //         .timeline()
  //         .to(answer, {
  //           maxHeight: "500px",
  //           duration: 0.5,
  //           ease: "power3.inOut",
  //         })
  //         .from(
  //           answerLine,
  //           {
  //             yPercent: 120,
  //             opacity: 0,
  //             stagger: 0.1,
  //             duration: 0.6,
  //             ease: "power3.out",
  //           },
  //           "-=0.2"
  //         );
  //     } else {
  //       gsap.to(answer, {
  //         maxHeight: 0,
  //         duration: 0.4,
  //         ease: "power2.inOut",
  //       });
  //     }
  //   };

  return (
    <section ref={ref} className="faq-section-wrapper">
      <div className="background-container">
        <canvas
          ref={canvasRef}
          id="faq-bg"
          className="background-canvas"
        ></canvas>
      </div>
      <div className="main-container">
        <section className="section faq-section">
          <div className="faq-container">
            <motion.h2
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              className="faq-title"
            >
              Frequently Asked Questions
            </motion.h2>
            {faqData.map((item, idx) => (
              <FaqQuestion key={idx} idx={idx} item={item} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
//   <div
//                 className="faq-item"
//                 key={idx}
//                 ref={(el) => (faqRefs.current[idx] = el)}
//                 style={{ opacity: 0, transform: "translateY(40px)" }}
//               >
//                 <div
//                   className="faq-question"
//                   onClick={() => handleAccordion(idx)}
//                 >
//                   <span
//                     className="faq-question-text"
//                     ref={(el) => (questionTextRefs.current[idx] = el)}
//                   >
//                     {splitTextIntoWords(item.question)}
//                   </span>
//                   <span className="faq-icon">+</span>
//                 </div>
//                 <div
//                   className="faq-answer"
//                   ref={(el) => (answerRefs.current[idx] = el)}
//                 >
//                   <p>
//                     <span
//                       className="line-inner"
//                       ref={(el) => (answerLineRefs.current[idx] = el)}
//                     >
//                       {item.answer}
//                     </span>
//                   </p>
//                 </div>
//               </div>
