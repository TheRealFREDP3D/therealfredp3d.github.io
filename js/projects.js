
const projectsData = [
    {
        "id": 1161091627,
        "name": "QuickHubPulse",
        "title": "Quickhubpulse",
        "description": "A streamlined, modern dashboard for quick repository overview with detailed insights. Built with React 19, Tailwind CSS, and Vite.",
        "stars": 1,
        "forks": 0,
        "url": "https://github.com/TheRealFREDP3D/quickhubpulse",
        "image": "https://raw.githubusercontent.com/TheRealFREDP3D/quickhubpulse/master/image/Overview.png",
        "pushed_at": "2026-06-04T09:56:40Z",
        "tags": [
            "dashboard",
            "github",
            "repository",
            "stats"
        ],
        "narrative": "### The Vision\nQuickHubPulse was born from the need for a faster, more intuitive way to monitor GitHub repository health. While GitHub provides extensive data, navigating multiple tabs to see traffic, stars, and issues can be cumbersome. I wanted a \"pulse\" view that combined visual trends with deep insights.\n\n### The Evolution\nThe development journey focused on making the application professional and production-ready. Early commits show the core implementation using React 19 and Tailwind CSS 4. As the project matured, I shifted focus to robust state management, implementing persistent authentication via sessionStorage and refining the OAuth flow to be fully standards-compliant. The move to Node.js 20 and optimized Netlify builds ensured the dashboard stays as fast as the data it displays.\n\n### Key Features\n- **Real-time Visualization**: Using Recharts to transform raw GitHub API data into actionable traffic trends.\n- **Modern Stack**: Built with the latest React 19 features for maximum performance.\n- **Architecture**: A clean, modular design that separates the data fetching layer from the UI, as documented in the core system architecture.\n"
    },
    {
        "id": 1116828897,
        "name": "Buzz-Bites",
        "title": "Buzz Bites",
        "description": "A lane defense game",
        "stars": 0,
        "forks": 0,
        "url": "https://github.com/TheRealFREDP3D/Buzz-Bites",
        "image": "assets/images/python-background.jpg",
        "pushed_at": "2026-06-01T18:14:06Z",
        "tags": ["Game", "Python", "RTS"],
        "narrative": "### The Vision\nBackyard Battle (Buzz vs Bite) is a passion project exploring real-time strategy (RTS) mechanics in a web environment. The goal was to create a complex simulation of colony warfare between bees and ants that runs smoothly in the browser.\n\n### The Evolution\nThe git history reveals a transition from simple unit movement to a comprehensive game loop. A major milestone was the implementation of multi-level progression and difficulty scaling, allowing the game to challenge players as they progress. I spent significant time refactoring the game state management to ensure that hundreds of active units don't compromise performance. The \"ImgBot\" integrations also highlight a commitment to optimizing assets for web delivery.\n\n### Key Features\n- **Spatial Grid Optimization**: Efficient collision and target detection for high unit counts.\n- **Adaptive AI**: An ant opponent that scales its aggression based on the player's progress.\n- **Resource Economy**: A dual-resource system (Nectar/Pollen) that forces strategic decision-making.\n"
    },
    {
        "id": 1175833725,
        "name": "fish-sim-reboot",
        "title": "Fish Sim Reboot",
        "description": "A sophisticated underwater ecosystem simulation featuring neural network-driven fish, dynamic plant growth, and real-time brain visualization. This project creates a living underwater world where fish evolve, plants grow, and ecological interactions emerge naturally.",
        "stars": 1,
        "forks": 0,
        "url": "https://github.com/TheRealFREDP3D/fish-sim-reboot",
        "image": "assets/images/python-background.jpg",
        "pushed_at": "2026-05-28T21:03:09Z",
        "tags": [
            "brain",
            "fish",
            "neural-network",
            "simulation"
        ],
        "narrative": "### The Vision\nThis project is a deep dive into neuroevolution. I wanted to build a world where \"intelligence\" isn't programmed, but emerges from the need to survive. Every fish in the sim is controlled by its own neural network, evolving over generations to find food and avoid predators.\n\n### The Evolution\nRecent development has been heavily focused on the \"Brain Visualizer.\" I moved away from static charts to an \"organic brain visualizer\" with bioluminescent themes and behavioral insights. This allows the user to see exactly which neurons are firing when a fish decides to turn or eat. Technical refactors also corrected thrust normalization in the NeuralFish model, leading to more realistic movement patterns.\n\n### Key Features\n- **Neural Evolution**: A custom-built neuroevolution engine where fish pass their \"brain\" weights to offspring.\n- **Living Ecosystem**: A dynamic world with day/night cycles, seasonal changes, and plant growth that responds to soil nutrients.\n- **Bioluminescent UI**: A high-performance Pygame interface that visualizes the invisible world of neural computation.\n"
    },
    {
        "id": 1102381089,
        "name": "HTB-MCP-Client",
        "title": "Htb Mcp Client",
        "description": "LLM-less Full-featured Textual-based TUI client for the HackTheBox MCP server",
        "stars": 2,
        "forks": 0,
        "url": "https://github.com/TheRealFREDP3D/HTB-MCP-Client",
        "image": "https://raw.githubusercontent.com/TheRealFREDP3D/HTB-MCP-Client/main/HTB-MCP-Client-Banner.png",
        "pushed_at": "2026-05-23T14:06:42Z",
        "tags": [
            "client",
            "ctf",
            "ctf-events",
            "ctf-tools",
            "hackthebox",
            "htb",
            "htb-mcp",
            "mcp",
            "mcp-client",
            "python"
        ],
        "narrative": "### The Vision\nHackTheBox (HTB) is a premier platform for cybersecurity training. I created this TUI (Terminal User Interface) client to streamline the experience of managing challenges and interacting with the HTB Model Context Protocol (MCP) server directly from the command line.\n\n### The Evolution\nThe project started as a tool for quick challenge lookups. It evolved into a robust management suite. Commits show a shift towards modular architecture, specifically in how schema templates are generated for the MCP. I also focused heavily on error handling and stability, replacing silent exceptions with structured logging to make the tool reliable for active CTF competitions.\n\n### Key Features\n- **Textual TUI**: A beautiful and responsive terminal interface built with Python.\n- **Container Management**: Integrated controls to start/stop challenge instances via the HTB API.\n- **Persistent State**: Automated session management so you can pick up exactly where you left off.\n"
    },
    {
        "id": 1116543196,
        "name": "PullRequest-Mermaid-Extractor",
        "title": "Pullrequest Mermaid Extractor",
        "description": "A developer tool to extract, view, and export Mermaid diagrams from GitHub Pull Requests conversations.",
        "stars": 1,
        "forks": 0,
        "url": "https://github.com/TheRealFREDP3D/PullRequest-Mermaid-Extractor",
        "image": "assets/images/python-background.jpg",
        "pushed_at": "2026-05-11T01:12:14Z",
        "tags": [
            "developer-tools",
            "diagram",
            "github",
            "mermaid",
            "pull-request"
        ],
        "narrative": "### The Vision\nArchitecture documentation often lives in GitHub Pull Requests but gets buried once the PR is merged. This tool was built to surface those Mermaid diagrams, making it easy to discover and visualize the structural changes proposed in any repository.\n\n### The Evolution\nStarting as a prototype, the project quickly moved toward v0.1.1. The development focus was on the reliability of the \"MermaidRenderer\" component. I iterated on how the extractor identifies diagrams within PR comments and descriptions, ensuring that even complex nested diagrams are captured correctly. Recent maintenance focused on keeping the dependencies like picomatch and rollup updated for security and performance.\n\n### Key Features\n- **Automated Extraction**: Scans PR history to find and render Mermaid diagrams.\n- **Multiple Export Formats**: Export discovered diagrams to Markdown or Draw.io XML.\n- **Developer-Centric**: Built with React 19 and TypeScript for a type-safe, modern experience.\n"
    },
    {
        "id": 891248393,
        "name": "Ollama-Colab",
        "title": "Ollama Colab",
        "description": "Run Ollama on Google Colab with a public HTTPS endpoint via Cloudflare Tunnel or ngrok.",
        "stars": 9,
        "forks": 7,
        "url": "https://github.com/TheRealFREDP3D/Ollama-Colab",
        "image": "https://raw.githubusercontent.com/TheRealFREDP3D/Ollama-Colab/main/assets/header.jpg",
        "pushed_at": "2026-05-09T19:46:39Z",
        "tags": [
            "ai",
            "cloudflare",
            "coding-assistants",
            "colab",
            "free-llm",
            "llm",
            "ngrok",
            "ollama",
            "tunnel"
        ],
        "narrative": "### The Vision\nLocal LLMs are powerful but require significant hardware. Ollama Colab bridges this gap, allowing anyone to run state-of-the-art models like Llama 3 or DeepSeek-R1 on Google's free GPU tier with zero local setup.\n\n### The Evolution\nThe project has seen rapid iterations to keep up with the fast-moving LLM landscape. V2.4 introduced multi-tunnel support (Cloudflare and ngrok), giving users more options for connectivity. The recent v2.5 release focused on optimizing the workflow for DeepSeek-R1, adding a live model browser that lets users pull and switch models without restarting the notebook.\n\n### Key Features\n- **One-Click Deployment**: Optimized Colab notebook for the fastest possible startup time.\n- **Secure Access**: Integration with Cloudflare Tunnels for stable, HTTPS-encrypted access to the Ollama API.\n- **Hardware Monitoring**: Built-in VRAM and system usage tracking to help users manage their Colab resources.\n"
    }
];

class ProjectManager {
    constructor() {
        this.projects = projectsData;
        this.filteredProjects = [...this.projects];
        this.currentFilter = 'all';
        this.searchQuery = '';

        this.init();
    }

    init() {
        this.renderProjects();
        this.setupEventListeners();
        this.updateStats();
    }

    escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    renderProjects() {
        const container = document.getElementById('projects-grid');
        if (!container) return;

        if (this.filteredProjects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No projects found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredProjects.map(project => this.createProjectCard(project)).join('');
        this.animateCards();
    }

    createProjectCard(project) {
        const tags = project.tags.map(tag => `<span class="tag-badge">${this.escapeHTML(tag)}</span>`).join('');
        const title = this.escapeHTML(project.title);
        const description = this.escapeHTML(project.description);
        const image = this.escapeHTML(project.image);
        const url = this.escapeHTML(project.url);

        return `
            <div class="project-card" data-id="${project.id}">
                <div class="project-image">
                    <img src="${image}" alt="${title}" onerror="this.src='assets/images/python-background.jpg'">
                    <div class="project-stats-overlay">
                        <span><i class="fas fa-star"></i> ${project.stars}</span>
                        <span><i class="fas fa-code-branch"></i> ${project.forks}</span>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${title}</h3>
                    <p class="project-description">${description}</p>
                    <div class="project-tags">
                        ${tags}
                    </div>
                    <div class="project-footer">
                        <button class="btn btn-primary view-details" data-id="${project.id}">View Details</button>
                        <a href="${url}" target="_blank" class="github-link"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-projects');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        document.querySelectorAll('.tag-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentFilter = e.target.dataset.tag;
                document.querySelectorAll('.tag-filter').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.applyFilters();
            });
        });

        // Modal triggers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details')) {
                const id = e.target.dataset.id;
                this.openModal(id);
            }
        });

        const modal = document.getElementById('project-modal');
        if (modal) {
            window.addEventListener('click', (event) => {
                if (event.target == modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });

            // ESC key to close
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }

    applyFilters() {
        this.filteredProjects = this.projects.filter(p => {
            const searchLower = this.searchQuery.toLowerCase();
            const matchesSearch = p.title.toLowerCase().includes(searchLower) ||
                                 p.description.toLowerCase().includes(searchLower);

            const matchesTag = this.currentFilter === 'all' ||
                             p.tags.some(tag => tag.toLowerCase() === this.currentFilter.toLowerCase());
            return matchesSearch && matchesTag;
        });
        this.renderProjects();
    }

    openModal(id) {
        const project = this.projects.find(p => p.id == id);
        if (!project) return;

        const modal = document.getElementById('project-modal');
        const content = document.getElementById('modal-project-content');

        const title = this.escapeHTML(project.title);
        const image = this.escapeHTML(project.image);
        const url = this.escapeHTML(project.url);

        content.innerHTML = `
            <div class="modal-header">
                <img src="${image}" alt="${title}" class="modal-hero-image" onerror="this.src='assets/images/python-background.jpg'">
                <h2>${title}</h2>
                <div class="modal-meta">
                    <span><i class="fas fa-star"></i> ${project.stars} Stars</span>
                    <span><i class="fas fa-code-branch"></i> ${project.forks} Forks</span>
                    <span><i class="fas fa-clock"></i> Last updated: ${new Date(project.pushed_at).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="modal-body">
                <div class="narrative">
                    ${this.formatMarkdown(project.narrative)}
                </div>
            </div>
            <div class="modal-footer">
                <a href="${url}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> View Repository
                </a>
            </div>
        `;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };
        }
    }

    formatMarkdown(text) {
        const lines = text.split('\n');
        let html = [];
        let inList = false;

        lines.forEach(line => {
            const trimmed = line.trim();

            if (trimmed.startsWith('- ')) {
                if (!inList) {
                    html.push('<ul>');
                    inList = true;
                }
                html.push(`<li>${this.formatInline(trimmed.substring(2))}</li>`);
            } else {
                if (inList) {
                    html.push('</ul>');
                    inList = false;
                }

                if (trimmed.startsWith('### ')) {
                    html.push(`<h3>${this.formatInline(trimmed.substring(4))}</h3>`);
                } else if (trimmed.startsWith('## ')) {
                    html.push(`<h2>${this.formatInline(trimmed.substring(3))}</h2>`);
                } else if (trimmed.startsWith('# ')) {
                    html.push(`<h1>${this.formatInline(trimmed.substring(2))}</h1>`);
                } else if (trimmed !== '') {
                    html.push(`<p>${this.formatInline(trimmed)}</p>`);
                }
            }
        });

        if (inList) html.push('</ul>');
        return html.join('\n');
    }

    formatInline(text) {
        return this.escapeHTML(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }

    animateCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }

    updateStats() {
        const countEl = document.getElementById('project-count');
        if (countEl) countEl.textContent = `${this.projects.length} Projects`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});
