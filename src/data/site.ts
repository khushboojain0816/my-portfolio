export const site = {
  name: "Khushboo Jain",
  tagline: "Frontend developer crafting clean, thoughtful web experiences.",
  email: "khushboojain0816@gmail.com",
  location: "India",
  social: {
    github: "https://github.com/khushboojain0816",
    linkedin: "https://www.linkedin.com/in/",
  },
};

export const about = {
  heading: "About Me",
  paragraphs: [
    "I'm a developer who enjoys turning ideas into fast, accessible, and visually polished web applications. I care about clean code, good design, and building products that feel good to use.",
    "My toolkit centers on React, Next.js, and TypeScript, with a strong eye for UI/UX and responsive design. I'm always learning — currently exploring modern frontend architecture and design systems.",
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Git & GitHub",
  ],
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Task Flow",
    description:
      "A drag-and-drop task management app with boards, labels, and due dates, built to help small teams stay organized.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Weather Now",
    description:
      "A minimal weather dashboard that shows real-time conditions and a 5-day forecast for any city, with saved favorites.",
    tags: ["React", "REST API", "CSS"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Recipe Book",
    description:
      "A searchable recipe collection with filtering by cuisine and ingredients, plus a personal favorites list saved locally.",
    tags: ["Next.js", "Node.js", "MongoDB"],
    liveUrl: "#",
    repoUrl: "#",
  },
];
