'use client';

import { useEffect, useRef, useState } from 'react';


interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'frontend' | 'fullstack' | 'backend';
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'frontend' | 'fullstack' | 'backend'>('all');

  const projects: Project[] = [
    {
      id: 'project1',
      title: 'ANI LIVING SPACES',
      description: 'An end-to-end booking system for service apartments with features for property listings, reservations, and user account management.',
      image: '/placeholder.jpg',
      tags: ['Next.js', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Docker', 'CI/CD', 'AWS'],
      liveUrl: 'https://anilivingspaces.com',
      githubUrl: 'https://github.com/mithileshpatel888',
      category: 'fullstack'
    },
    {
      id: 'project2',
      title: 'DrishtiAI – Multi-LLM Response Platform',
      description: 'A unified platform to interact with multiple AI providers (ChatGPT, DeepSeek, Grok AI) from a single interface.',
      image: '/placeholder.jpg',
      tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'JWT', 'Google OAuth', 'Git'],
      githubUrl: 'https://github.com/mithileshpatel888',
      category: 'fullstack'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="pt-[var(--header-height)] py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          My Projects
        </h2>
        
        {/* Filter Buttons */}
        <div className={`flex justify-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-background/80 hover:bg-background/90'}`}
            >
              All Projects
            </button>
            <button 
              onClick={() => setActiveFilter('frontend')}
              className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'frontend' ? 'bg-primary text-white' : 'bg-background/80 hover:bg-background/90'}`}
            >
              Frontend
            </button>
            <button 
              onClick={() => setActiveFilter('fullstack')}
              className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'fullstack' ? 'bg-primary text-white' : 'bg-background/80 hover:bg-background/90'}`}
            >
              Full Stack
            </button>
            <button 
              onClick={() => setActiveFilter('backend')}
              className={`px-4 py-2 rounded-full transition-colors ${activeFilter === 'backend' ? 'bg-primary text-white' : 'bg-background/80 hover:bg-background/90'}`}
            >
              Backend
            </button>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`bg-background/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${0.2 * (index % 4)}s` }}
            >
              {/* Project Image */}
              <div className="relative w-full h-48 bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-4xl">🖥️</span>
                {/* Uncomment when you have actual images */}
                {/* <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover"
                /> */}
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-foreground/80 mb-4">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-background/50 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-foreground/20 rounded-full hover:bg-background/90 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
