
import { Brain, Code, Terminal, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const InterestsSection = () => {
  const interests = [
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Exploring machine learning, deep learning, and AI applications in modern software development.",
      color: "text-pink-400"
    },
    {
      icon: Code,
      title: "Software Development",
      description: "Building applications with modern frameworks, learning best practices, and clean code principles.",
      color: "text-blue-400"
    },
    {
      icon: Terminal,
      title: "Linux & Open Source",
      description: "Mastering Linux systems, shell scripting, and contributing to open source projects.",
      color: "text-green-400"
    },
    {
      icon: Shield,
      title: "Capture The Flag",
      description: "Solving cybersecurity challenges, learning ethical hacking, and developing security mindset.",
      color: "text-red-400"
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-100 mb-3">My Interests</h2>
          <p className="text-lg text-gray-400">Areas I'm passionate about and actively learning</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {interests.map((interest, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-700 shadow-md bg-gray-800">
              <CardHeader className="text-center pb-3">
                <div className={`inline-flex p-3 rounded-full bg-gray-700 group-hover:bg-gray-600 transition-colors duration-300 ${interest.color}`}>
                  <interest.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-100 mt-3">
                  {interest.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-400 leading-relaxed text-sm">
                  {interest.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
