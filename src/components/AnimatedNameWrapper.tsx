'use client';

import AnimatedName from './AnimatedName';

const AnimatedNameWrapper = () => {
  return (
    <>
      <AnimatedName />
      <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        MERN Stack Developer
      </span>
    </>
  );
};

export default AnimatedNameWrapper;
