// Blog posts data from Medium publications
const blogPosts = [
    {
        id: 1,
        title: "I Discovered My Code Review Bot Was Always Writing Poetry (And Built a Tool to Prove It)",
        excerpt: "A story about how I built a Python tool that scans GitHub PRs for hidden AI-generated poetry and why it ended up being my most popular project.",
        date: "May 3, 2024",
        readTime: "5 min read",
        tags: ["Python", "AI", "GitHub", "Poetry", "Tools"],
        url: "https://medium.com/@TheRealFREDP3D/i-discovered-my-code-review-bot-was-always-writing-poetry-and-built-a-tool-to-prove-it-abc123",
        featured: true
    },
    {
        id: 2,
        title: "Running qwen2.5-coder-32b with Ollama and Ngrok in Google Colab: A Step-by-Step Guide",
        excerpt: "Want to access the latest LLM models for free? This guide shows you how to set up an Ollama server running the qwen2.5-coder-32b model in Google Colab.",
        date: "Nov 20, 2024",
        readTime: "8 min read",
        tags: ["LLM", "Ollama", "Google Colab", "AI", "Tutorial"],
        url: "https://medium.com/@TheRealFREDP3D/running-qwen2-5-coder-32b-with-ollama-and-ngrok-in-google-colab-def456",
        featured: true
    },
    {
        id: 3,
        title: "CrewAI Project — George Was Right",
        excerpt: "I've been working on a small project to learn how to use the CrewAI framework. This project analyzes current events through the lens of George Orwell's 1984.",
        date: "Aug 16, 2024",
        readTime: "6 min read",
        tags: ["CrewAI", "AI", "Python", "Orwell", "Analysis"],
        url: "https://medium.com/@TheRealFREDP3D/crewai-project-george-was-right-ghi789",
        featured: false
    },
    {
        id: 4,
        title: "The Surveillance State: How Facebook's Data Scandal Echoes 1984",
        excerpt: "In the age of social media, it has become second nature for many of us to share our personal lives online. However, a recent data scandal involving Facebook...",
        date: "Aug 15, 2024",
        readTime: "7 min read",
        tags: ["Privacy", "Surveillance", "Facebook", "1984", "Data"],
        url: "https://medium.com/@TheRealFREDP3D/the-surveillance-state-how-facebooks-data-scandal-echoes-1984-jkl012",
        featured: false
    },
    {
        id: 5,
        title: "Echoes of Orwell: The Erosion of Individual Freedom in 2024",
        excerpt: "In Orwell's '1984,' a totalitarian regime suppresses dissent and individuality. The themes of surveillance and censorship are increasingly relevant today.",
        date: "Aug 13, 2024",
        readTime: "9 min read",
        tags: ["Orwell", "Freedom", "Surveillance", "Society", "Analysis"],
        url: "https://medium.com/@TheRealFREDP3D/echoes-of-orwell-the-erosion-of-individual-freedom-in-2024-mno345",
        featured: false
    },
    {
        id: 6,
        title: "The Erosion of Truth: 1984 Revisited",
        excerpt: "In George Orwell's dystopian novel '1984,' the totalitarian government exercises total control over its citizens by manipulating truth and reality.",
        date: "Jul 11, 2024",
        readTime: "6 min read",
        tags: ["Orwell", "Truth", "Dystopia", "Government", "Control"],
        url: "https://medium.com/@TheRealFREDP3D/the-erosion-of-truth-1984-revisited-pqr678",
        featured: false
    },
    {
        id: 7,
        title: "Chrono Trigger — You Can't Forget Your First",
        excerpt: "Chrono Trigger, an iconic RPG developed by Square Enix and released in 1995, continues to leave an indelible mark on the gaming industry.",
        date: "Jul 29, 2024",
        readTime: "4 min read",
        tags: ["Gaming", "RPG", "Chrono Trigger", "Nostalgia", "Review"],
        url: "https://medium.com/@TheRealFREDP3D/chrono-trigger-you-cant-forget-your-first-stu901",
        featured: false
    },
    {
        id: 8,
        title: "My First Coding Project",
        excerpt: "The week's question on the Codecademy learning platform was: 'What is your favourite place to code?' This got me thinking about my coding journey.",
        date: "Apr 10, 2024",
        readTime: "3 min read",
        tags: ["Coding", "Learning", "Journey", "Codecademy", "Beginner"],
        url: "https://medium.com/@TheRealFREDP3D/my-first-coding-project-vwx234",
        featured: false
    },
    {
        id: 9,
        title: "NOT For Beginners. Do a lot of Tryhackme and PicoCTF first",
        excerpt: "A comprehensive guide for intermediate cybersecurity enthusiasts looking to advance their skills beyond beginner-level platforms.",
        date: "Apr 12, 2023",
        readTime: "10 min read",
        tags: ["Cybersecurity", "CTF", "TryHackMe", "PicoCTF", "Advanced"],
        url: "https://medium.com/@TheRealFREDP3D/not-for-beginners-10092e552fa9",
        featured: false
    }
];

// Function to get featured posts
function getFeaturedPosts() {
    return blogPosts.filter(post => post.featured);
}

// Function to get recent posts
function getRecentPosts(limit = 10) {
    return blogPosts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

// Function to get posts by tag
function getPostsByTag(tag) {
    return blogPosts.filter(post => 
        post.tags.some(postTag => 
            postTag.toLowerCase().includes(tag.toLowerCase())
        )
    );
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { blogPosts, getFeaturedPosts, getRecentPosts, getPostsByTag };
}

