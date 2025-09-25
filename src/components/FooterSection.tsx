import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <footer className="w-full bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              © 2024 Mithilesh Patel. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/mithileshpatel888"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <FaGithub />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mithilesh-patel-03a282184"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <FaLinkedin />
              LinkedIn
            </a>
            <a
              href="mailto:mithleshpatel887766@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <FaEnvelope />
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
