
import { Github, ExternalLink, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const projects = [
    {
      title: "AI Chat Application",
      description: "A real-time chat application with AI integration using modern web technologies.",
      tags: ["React", "Node.js", "AI", "WebSocket"],
      githubUrl: "https://github.com"
    },
    {
      title: "Linux System Monitor",
      description: "A comprehensive system monitoring tool built for Linux environments.",
      tags: ["Python", "Linux", "System Programming"],
      githubUrl: "https://github.com"
    },
    {
      title: "CTF Challenge Solver",
      description: "Collection of scripts and tools for solving various CTF challenges.",
      tags: ["Python", "Security", "Automation"],
      githubUrl: "https://github.com"
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Featured Projects</h2>
          <p className="text-lg text-gray-400">Some of my recent work and learning projects</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-700 shadow-md bg-gray-900">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-100">
                    {project.title}
                  </CardTitle>
                  <a 
                    href={project.githubUrl}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400 hover:text-gray-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-400 leading-relaxed mb-3 text-sm">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105">
            <Github className="mr-2 h-4 w-4" />
            View All Projects on GitHub
            <ChevronRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
