'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
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
  }, [hasAnimated]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-[var(--header-height)] py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            About Me
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* About Image */}
            <div className={`w-64 h-64 rounded-full md:rounded-lg overflow-hidden shadow-xl mx-auto md:mx-0 md:w-full ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <Image
                src="/img/WhatsApp Image 2025-09-25 at 01.47.37.jpeg"
                alt="About Me"
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
            
            {/* About Text */}
            <div className={`space-y-4 ${isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.4s' }}>
              <p className="text-lg">
                I'm a passionate MERN Stack Developer with over 2 years of experience in building modern web applications. My journey in web development started with a curiosity about how websites work, and it has evolved into a career I truly enjoy.
              </p>
              
              <p className="text-lg">
                I specialize in creating responsive, user-friendly interfaces with React.js and Next.js, while implementing robust backend solutions with Node.js and MongoDB. I'm also experienced with containerization using Docker and deploying applications on AWS.
              </p>
              
              <p className="text-lg">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying outdoor activities to maintain a healthy work-life balance.
              </p>
              <div className="mt-6 text-center md:text-left">
                <a
                  href="/img/Mithilesh patel resume.pdf"
                  download
                  className="inline-block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
