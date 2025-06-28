import "./CardScroll.css";
import CardScrollItem from "./CardScrollItem";
import { useRef } from "react";
import { useScroll } from "framer-motion";

// --- Data for the cards ---
const projects = [
  {
    id: 1,
    title: "A Story-Driven Career",
    description:
      "I’ve spent over 20 years helping people bring their words to life—from students and startup founders to business professionals working with the NFL, AT&T, McKinsey, and more.",
    src: "https://cdn.pixabay.com/photo/2023/08/17/10/44/mountain-8197779_1280.jpg",
    color: "#e63946",
  },
  {
    id: 2,
    title: "An Unexpected Beginning",
    description:
      "My journey started unexpectedly at age 12 after a heart surgery forced me to shift my energy from sports to speech competitions. By 14, I’d won my first international competition; at 16, I’d given nearly 200 presentations; at 18, I won a world championship in impromptu public speaking.",
    src: "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg",
    color: "#457b9d",
  },
  {
    id: 3,
    title: "A Fulfilling Mission",
    description:
      "Since then I've enjoyed a wonderfully fulfilling career spent helping others to communicate with clarity and confidence.",
    src: "https://cdn.pixabay.com/photo/2017/08/06/12/03/computer-2591741_1280.jpg",
    color: "#a8dadc",
  },
  {
    id: 4,
    title: "My Unique Specialty",
    description:
      "Whether it’s a TEDx Talk, a high-stakes investor pitch, or a life milestone like a wedding or funeral, I’ve written it, coached it, and rehearsed it down to the last pause and power phrase.",
    src: "https://cdn.pixabay.com/photo/2019/12/17/40/conference-4702006_1280.jpg",
    color: "#f4a261",
  },
  {
    id: 5,
    title: "The Core Goal",
    description:
      "Clients work with me for different reasons—some need urgent turnaround before a keynote, others want long-term coaching to find their voice, tell better stories, or prepare for life-changing interviews. But they all come to me with one goal: to be heard. To feel seen. To walk into the spotlight with something worth saying, and the skill to say it well.",
    src: "https://cdn.pixabay.com/photo/2020/07/22/07/19/woman-5428456_1280.jpg",
    color: "#2a9d8f",
  },
  {
    id: 6,
    title: "Let's Connect",
    description:
      "If you’re looking for someone to help you communicate with more precision, presence, and power—whether for your next speech or your next chapter—I’d love to connect.",
    src: "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
    color: "#1d3557",
    link: "#",
    linkText: "LET’S GET STARTED",
  },
];

export default function CardScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative bg-white" ref={containerRef}>
      <h1 className="cards-wrapper-title bg-white sticky top-0 px-8 py-6 w-full text-4xl md:text-6xl font-extrabold text-black text-center z-[1000]">
        Hi, I'm Andrew Simon
      </h1>
      <div
        id="cards-wrapper"
        className="relative flex flex-col gap-12 items-center py-8"
      >
        {projects.map((project, index) => {
          const targetRange = 1 - (projects.length - index) * 0.05;
          return (
            <CardScrollItem
              project={project}
              key={project.id}
              idx={index}
              progress={scrollYProgress}
              range={[index * 0.06, 1]}
              targetScale={targetRange}
            />
          );
        })}
      </div>
    </section>
  );
}
