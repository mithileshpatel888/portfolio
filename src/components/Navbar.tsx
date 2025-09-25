'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect and body scroll lock for mobile menu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when clicking on a link
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
      style={{ height: 'var(--header-height)' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MP</span>
          <span className="ml-2 text-lg font-medium hidden sm:inline">Mithilesh Patel</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="#about" 
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link 
            href="#skills" 
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Skills
          </Link>
          <Link 
            href="#projects" 
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Projects
          </Link>
          <Link 
            href="#contact" 
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <a 
            href="/img/Mithilesh patel resume.pdf" 
            className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
            download
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
      <div 
        className={`md:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-background/95 backdrop-blur-md shadow-lg transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full flex flex-col items-center justify-center">
          <nav className="flex flex-col space-y-8 text-center items-center">
            <Link 
              href="#about" 
              className="text-2xl text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link 
              href="#skills" 
              className="text-2xl text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              Skills
            </Link>
            <Link 
              href="#projects" 
              className="text-2xl text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              Projects
            </Link>
            <Link 
              href="#contact" 
              className="text-2xl text-foreground/80 hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>
            <a 
              href="/img/Mithilesh patel resume.pdf" 
              className="mt-4 inline-block px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-lg"
              download
              onClick={closeMenu}
            >
              Resume
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
