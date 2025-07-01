
import { Github, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-gray-950 text-gray-300">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-base mb-3">Let's connect and build something amazing together!</p>
        <div className="flex justify-center space-x-4">
          <Button variant="ghost" size="lg" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="lg" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
            <Code className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-gray-500 mt-6 text-sm">
          © 2024 Learning Journey. Built with passion for technology.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
