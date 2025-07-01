
import { Github, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Learning Journey
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
            Aspiring Software Developer • AI Enthusiast • Linux Explorer
          </p>
          <p className="text-base text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Welcome to my digital space where I document my journey into the world of software development. 
            From exploring the depths of artificial intelligence to mastering Linux systems and solving CTF challenges, 
            I'm passionate about continuous learning and building meaningful projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              <Github className="mr-2 h-4 w-4" />
              View My Projects
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              <Code className="mr-2 h-4 w-4" />
              About My Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
