import { useState, useEffect } from "react";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

const PinnedReposSection = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        const username = 'therealfredp3d';
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-400',
      Python: 'bg-green-400',
      React: 'bg-cyan-400',
      HTML: 'bg-orange-400',
      CSS: 'bg-purple-400',
      Java: 'bg-red-400',
      'C++': 'bg-pink-400',
    };
    return colors[language] || 'bg-gray-400';
  };

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-100 mb-3">Pinned Repositories</h2>
            <p className="text-lg text-gray-400">Loading repositories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-100 mb-3">Pinned Repositories</h2>
            <p className="text-lg text-red-400">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Pinned Repositories</h2>
          <p className="text-lg text-gray-400">My featured projects and contributions</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <Card key={repo.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-700 shadow-md bg-gray-900">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-100 truncate">
                    {repo.name}
                  </CardTitle>
                  <a 
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400 hover:text-gray-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-400 leading-relaxed mb-4 text-sm line-clamp-3">
                  {repo.description || "No description available"}
                </CardDescription>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-3 w-3" />
                      <span>{repo.forks_count}</span>
                    </div>
                  </div>
                  {repo.language && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                      <span className="text-sm text-gray-400">{repo.language}</span>
                    </div>
                  )}
                </div>
                
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => window.open('https://github.com/therealfredp3d', '_blank')}
          >
            <Github className="mr-2 h-4 w-4" />
            View All Repositories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PinnedReposSection;
