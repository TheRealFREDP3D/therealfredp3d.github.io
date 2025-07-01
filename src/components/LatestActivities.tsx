
import { Calendar, GitBranch, Trophy, BookOpen, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LatestActivities = () => {
  const activities = [
    {
      icon: GitBranch,
      type: "commit",
      title: "Updated AI chat interface",
      description: "Improved user experience with better message handling",
      time: "2 hours ago",
      color: "text-green-400"
    },
    {
      icon: Trophy,
      type: "achievement",
      title: "Solved CTF Challenge: Buffer Overflow",
      description: "Successfully exploited a stack-based buffer overflow",
      time: "1 day ago",
      color: "text-yellow-400"
    },
    {
      icon: BookOpen,
      type: "learning",
      title: "Completed Docker Fundamentals",
      description: "Mastered containerization and orchestration basics",
      time: "3 days ago",
      color: "text-blue-400"
    },
    {
      icon: Code,
      type: "project",
      title: "Started new Linux monitoring tool",
      description: "Building a comprehensive system resource tracker",
      time: "5 days ago",
      color: "text-purple-400"
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Latest Activities</h2>
          <p className="text-lg text-gray-400">Recent progress and achievements</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {activities.map((activity, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-700 shadow-md bg-gray-900">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`inline-flex p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700 transition-colors duration-300 ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-100">
                      {activity.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-400 leading-relaxed">
                  {activity.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestActivities;
