'use client';

import ProjectCard from './ProjectCard';

const projects = [
  { title: "Neon Nexus", category: "Fintech Core", color: "cyan-400", size: "large" },
  { title: "Void Engine", category: "WebGL Framework", color: "purple-400", size: "small" },
  { title: "Cipher Wall", category: "Cyber Security", color: "green-400", size: "small" },
  { title: "Hyper Grid", category: "Data Visualization", color: "pink-400", size: "small" },
  { title: "Quantum UI", category: "Design System", color: "blue-400", size: "small" },
];

export default function WorkSection() {
  return (
    <section id="work" className="relative w-full min-h-screen py-24 px-4 flex flex-col items-center">
      
      {/* Section Header */}
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
          ARTIFACTS
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
      </div>

      {/* The Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full perspective-1000">
        {/* We map over our projects array */}
        {projects.map((proj: any, i) => (
          <ProjectCard 
            key={i}
            title={proj.title}
            category={proj.category}
            color={proj.color}
            size={proj.size}
          />
        ))}
      </div>

    </section>
  );
}