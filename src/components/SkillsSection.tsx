'use client';

import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools';
}

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  const skills: Skill[] = [
    // Frontend
    { name: 'React.js', icon: '⚛️', category: 'frontend' },
    { name: 'Next.js', icon: '▲', category: 'frontend' },
    { name: 'JavaScript', icon: '📜', category: 'frontend' },
    { name: 'TypeScript', icon: '🔷', category: 'frontend' },
    { name: 'HTML5', icon: '🌐', category: 'frontend' },
    { name: 'CSS3', icon: '🎨', category: 'frontend' },
    { name: 'Tailwind CSS', icon: '💨', category: 'frontend' },
    
    // Backend
    { name: 'Node.js', icon: '🟢', category: 'backend' },
    { name: 'Express.js', icon: '🚂', category: 'backend' },
    { name: 'MongoDB', icon: '🍃', category: 'backend' },
    { name: 'REST API', icon: '🔄', category: 'backend' },
    { name: 'GraphQL', icon: '⬢', category: 'backend' },
    
    // Tools
    { name: 'Git', icon: '📊', category: 'tools' },
    { name: 'Docker', icon: '🐳', category: 'tools' },
    { name: 'AWS', icon: '☁️', category: 'tools' },
    { name: 'CI/CD', icon: '🔄', category: 'tools' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 bg-background/50"
    >
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          My Skills
        </h2>
        
        {/* Category Tabs */}
        <div className={`flex justify-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full transition-colors ${activeTab === 'all' ? 'bg-primary text-white' : 'bg-background/80 hover:bg-background/90'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('frontend')}
              className={`px-4 py-2 rounded-full transition-colors ${activeTab === 'frontend' ? 'bg-primary text-white' : 'bg-background/80 hover:bg-background/90'}`}
            >
              Frontend
            </button>
            <button 
              onClick={() => setActiveTab('backend')}
              className={`px-4 py-2 rounded-full transition-colors ${activeTab === 'backend' ? 'bg-primary text-white' : 'bg-background/80 hover:bg-background/90'}`}
            >
              Backend
            </button>
            <button 
              onClick={() => setActiveTab('tools')}
              className={`px-4 py-2 rounded-full transition-colors ${activeTab === 'tools' ? 'bg-primary text-white' : 'bg-background/80 hover:bg-background/90'}`}
            >
              Tools
            </button>
          </div>
        </div>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.name}
              className={`bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-md flex flex-col items-center justify-center transition-all hover:shadow-lg hover:scale-105 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * (index % 8)}s` }}
            >
              <span className="text-3xl mb-2">{skill.icon}</span>
              <h3 className="font-medium text-center">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;