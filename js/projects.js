// Allowed URL schemes for security validation
const ALLOWED_URL_SCHEMES = ['https:', 'http:'];

/**
 * Safely sets an href or src attribute after validating the URL.
 * Blocks javascript: and other dangerous schemes.
 * @param {HTMLElement} el - Element to set attribute on
 * @param {string} attr - Attribute name ('href' or 'src')
 * @param {string} value - URL value to validate and set
 * @param {string[]} [allowedSchemes] - Allowed URL schemes
 */
function setSafeUrl(el, attr, value, allowedSchemes = ALLOWED_URL_SCHEMES) {
    if (!value || typeof value !== 'string') {
        console.warn(`setSafeUrl: empty or non-string value for ${attr}`);
        return;
    }
    try {
        const parsed = new URL(value, window.location.href);
        if (!allowedSchemes.includes(parsed.protocol)) {
            console.warn(`setSafeUrl: blocked disallowed scheme "${parsed.protocol}" for ${attr}:`, value);
            return;
        }
        el.setAttribute(attr, parsed.href);
    } catch {
        console.warn(`setSafeUrl: invalid URL blocked for ${attr}:`, value);
    }
}

/**
 * Creates a DOM element with optional class, text content, and safe attributes.
 * Validates href/src attributes to prevent XSS via javascript: URLs.
 * When target="_blank" is set, rel="noopener noreferrer" is always applied
 * to prevent reverse-tabnabbing attacks via window.opener.
 * @param {string} tag
 * @param {string} [text]
 * @param {string} [className]
 * @param {Object} [attributes]
 * @returns {HTMLElement}
 */
function createSafeElement(tag, text = '', className = '', attributes = {}) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;

    let hasBlankTarget = false;

    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'href' || key === 'src') {
            setSafeUrl(el, key, value);
        } else if (key === 'target') {
            if (value === '_blank') {
                el.setAttribute('target', '_blank');
                hasBlankTarget = true;
            }
        } else {
            const SAFE_ATTRS = new Set([
                'alt', 'class', 'id', 'type', 'placeholder',
                'data-id', 'data-tag', 'title', 'rel', 'aria-label'
            ]);
            if (SAFE_ATTRS.has(key)) {
                el.setAttribute(key, value);
            }
        }
    }

    if (hasBlankTarget) {
        el.setAttribute('rel', 'noopener noreferrer');
    }

    return el;
}

/** Shared fallback image path used when a project image fails to load. */
const FALLBACK_IMAGE = 'assets/images/python-background.jpg';

/**
 * Attaches an onerror listener to an img element that swaps in the fallback
 * image. Keeping this in JS (rather than an inline onerror attribute) means
 * behaviour logic stays out of markup and is easy to update in one place.
 * @param {HTMLImageElement} img
 */
function attachImageFallback(img) {
    img.addEventListener('error', () => {
        if (img.src !== new URL(FALLBACK_IMAGE, window.location.href).href) {
            img.src = FALLBACK_IMAGE;
        }
    }, { once: true });
}

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
        "pushed_at": "2025-06-04T09:56:40Z",
        "tags": [
            "dashboard",
            "github",
            "repository",
            "stats",
            "TypeScript"
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
        "pushed_at": "2025-06-01T18:14:06Z",
        "tags": [
            "Game",
            "Python",
            "RTS"
        ],
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
        "pushed_at": "2025-05-28T21:03:09Z",
        "tags": [
            "brain",
            "fish",
            "neural-network",
            "simulation",
            "AI"
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
        "pushed_at": "2025-05-23T14:06:42Z",
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
            "Python",
            "Cybersecurity"
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
        "pushed_at": "2025-05-11T01:12:14Z",
        "tags": [
            "developer-tools",
            "diagram",
            "github",
            "mermaid",
            "pull-request",
            "TypeScript"
        ],
        "narrative": "### The Vision\nArchitecture documentation often lives in GitHub Pull Requests but gets buried once the PR is merged. This tool was built to surface those Mermaid diagrams, making it easy to discover and visualize the structural changes proposed in any repository.\n\n### The Evolution\nStarting as a prototype, the project quickly moved toward v0.1.1. The development focus was on the reliability of the \"MermaidRenderer\" component. I iterated on how the extractor identifies diagrams within PR comments and descriptions, ensuring that even complex nested diagrams are captured correctly. Recent maintenance focused on keeping the dependencies like picomatch and rollup updated for security and performance.\n\n### Key Features\n- **Automated Extraction**: Scans PR history to find and render Mermaid diagrams.\n- **Multiple Export Formats**: Export discovered diagrams to Markdown or Draw.io XML.\n- **Developer-Centric**: Built with TypeScript for a type-safe, modern experience.\n"
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
        "pushed_at": "2025-05-09T19:46:39Z",
        "tags": [
            "AI",
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

    renderProjects() {
        const container = document.getElementById('projects-grid');
        if (!container) return;

        // Clear container safely — no innerHTML
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        if (this.filteredProjects.length === 0) {
            const emptyState = createSafeElement('div', '', 'empty-state');
            const icon = createSafeElement('i', '', 'fas fa-search');
            emptyState.appendChild(icon);
            emptyState.appendChild(createSafeElement('h3', 'No projects found'));
            emptyState.appendChild(createSafeElement('p', 'Try adjusting your search or filters.'));
            container.appendChild(emptyState);
            return;
        }

        const fragment = document.createDocumentFragment();
        this.filteredProjects.forEach(project => {
            fragment.appendChild(this.createProjectCard(project));
        });
        container.appendChild(fragment);
        this.animateCards();
    }

    createProjectCard(project) {
        const card = createSafeElement('div', '', 'project-card');
        card.dataset.id = project.id;

        // Image container
        const imageContainer = createSafeElement('div', '', 'project-image');

        const img = document.createElement('img');
        img.alt = project.title || '';
        img.className = '';
        setSafeUrl(img, 'src', project.image || '');
        // Attach fallback via JS event listener — no inline onerror attribute
        attachImageFallback(img);

        const overlay = createSafeElement('div', '', 'project-stats-overlay');

        const starSpan = createSafeElement('span');
        starSpan.appendChild(createSafeElement('i', '', 'fas fa-star'));
        starSpan.appendChild(document.createTextNode(` ${Number.isFinite(project.stars) ? project.stars : 0}`));

        const forkSpan = createSafeElement('span');
        forkSpan.appendChild(createSafeElement('i', '', 'fas fa-code-branch'));
        forkSpan.appendChild(document.createTextNode(` ${Number.isFinite(project.forks) ? project.forks : 0}`));

        overlay.appendChild(starSpan);
        overlay.appendChild(forkSpan);
        imageContainer.appendChild(img);
        imageContainer.appendChild(overlay);

        // Content
        const content = createSafeElement('div', '', 'project-content');
        content.appendChild(createSafeElement('h3', project.title || 'Untitled', 'project-title'));
        content.appendChild(createSafeElement('p', project.description || '', 'project-description'));

        const tagsContainer = createSafeElement('div', '', 'project-tags');
        (project.tags || []).forEach(tag => {
            tagsContainer.appendChild(createSafeElement('span', String(tag), 'tag-badge'));
        });
        content.appendChild(tagsContainer);

        // Footer
        const footer = createSafeElement('div', '', 'project-footer');

        const btn = createSafeElement('button', 'View Details', 'btn btn-primary view-details');
        btn.dataset.id = project.id;

        const githubLink = createSafeElement('a', '', 'github-link', {
            href: project.url || '',
            target: '_blank'
        });
        githubLink.appendChild(createSafeElement('i', '', 'fab fa-github'));

        footer.appendChild(btn);
        footer.appendChild(githubLink);
        content.appendChild(footer);

        card.appendChild(imageContainer);
        card.appendChild(content);
        return card;
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

        // Modal triggers via event delegation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details')) {
                const id = e.target.dataset.id;
                this.openModal(id);
            }
        });

        const modal = document.getElementById('project-modal');
        if (modal) {
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });

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
            const matchesSearch =
                (p.title || '').toLowerCase().includes(searchLower) ||
                (p.description || '').toLowerCase().includes(searchLower);

            const matchesTag =
                this.currentFilter === 'all' ||
                (p.tags || []).some(tag => tag.toLowerCase() === this.currentFilter.toLowerCase());

            return matchesSearch && matchesTag;
        });
        this.renderProjects();
    }

    openModal(id) {
        const project = this.projects.find(p => p.id == id);
        if (!project) return;

        const modal = document.getElementById('project-modal');
        const content = document.getElementById('modal-project-content');
        if (!modal || !content) return;

        // Clear content safely — no innerHTML
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }

        // --- Header ---
        const header = createSafeElement('div', '', 'modal-header');

        const img = document.createElement('img');
        img.className = 'modal-hero-image';
        img.alt = project.title || '';
        setSafeUrl(img, 'src', project.image || '');
        // Fallback via JS listener — no inline onerror attribute
        attachImageFallback(img);
        header.appendChild(img);

        header.appendChild(createSafeElement('h2', project.title || 'Untitled'));

        const meta = createSafeElement('div', '', 'modal-meta');

        const stars = createSafeElement('span');
        stars.appendChild(createSafeElement('i', '', 'fas fa-star'));
        stars.appendChild(document.createTextNode(` ${Number.isFinite(project.stars) ? project.stars : 0} Stars`));

        const forks = createSafeElement('span');
        forks.appendChild(createSafeElement('i', '', 'fas fa-code-branch'));
        forks.appendChild(document.createTextNode(` ${Number.isFinite(project.forks) ? project.forks : 0} Forks`));

        const updated = createSafeElement('span');
        updated.appendChild(createSafeElement('i', '', 'fas fa-clock'));
        let dateStr = 'Unknown';
        try { dateStr = new Date(project.pushed_at).toLocaleDateString(); } catch { /* keep default */ }
        updated.appendChild(document.createTextNode(` Last updated: ${dateStr}`));

        meta.appendChild(stars);
        meta.appendChild(forks);
        meta.appendChild(updated);
        header.appendChild(meta);

        // --- Body (narrative) ---
        const body = createSafeElement('div', '', 'modal-body');
        const narrativeDiv = createSafeElement('div', '', 'narrative');
        // formatMarkdown returns a DocumentFragment — append directly, no innerHTML needed
        narrativeDiv.appendChild(this.formatMarkdown(project.narrative || ''));
        body.appendChild(narrativeDiv);

        // --- Footer ---
        const footer = createSafeElement('div', '', 'modal-footer');
        const link = createSafeElement('a', '', 'btn btn-primary', {
            href: project.url || '',
            target: '_blank'
        });
        link.appendChild(createSafeElement('i', '', 'fab fa-github'));
        link.appendChild(document.createTextNode(' View Repository'));
        footer.appendChild(link);

        content.appendChild(header);
        content.appendChild(body);
        content.appendChild(footer);

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            const newClose = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newClose, closeBtn);
            newClose.onclick = () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            };
        }
    }

    /**
     * Converts a limited markdown subset (###/##/#, **bold**, bullet lists, plain paragraphs)
     * into safe DOM nodes. No innerHTML is used at any point.
     * @param {string} text
     * @returns {DocumentFragment}
     */
    formatMarkdown(text) {
        const lines = (text || '').split('\n');
        const fragment = document.createDocumentFragment();
        let currentList = null;

        lines.forEach(line => {
            const trimmed = line.trim();

            if (trimmed.startsWith('- ')) {
                if (!currentList) {
                    currentList = document.createElement('ul');
                    fragment.appendChild(currentList);
                }
                const li = document.createElement('li');
                this.appendInline(li, trimmed.substring(2));
                currentList.appendChild(li);
            } else {
                currentList = null;

                if (trimmed.startsWith('### ')) {
                    const h3 = document.createElement('h3');
                    this.appendInline(h3, trimmed.substring(4));
                    fragment.appendChild(h3);
                } else if (trimmed.startsWith('## ')) {
                    const h2 = document.createElement('h2');
                    this.appendInline(h2, trimmed.substring(3));
                    fragment.appendChild(h2);
                } else if (trimmed.startsWith('# ')) {
                    const h1 = document.createElement('h1');
                    this.appendInline(h1, trimmed.substring(2));
                    fragment.appendChild(h1);
                } else if (trimmed !== '') {
                    const p = document.createElement('p');
                    this.appendInline(p, trimmed);
                    fragment.appendChild(p);
                }
            }
        });

        return fragment;
    }

    /**
     * Appends inline text with **bold** support to a parent element.
     * Uses textContent exclusively — no innerHTML.
     * @param {HTMLElement} el
     * @param {string} text
     */
    appendInline(el, text) {
        const parts = (text || '').split(/(\*\*.+?\*\*)/g);
        parts.forEach(part => {
            if (part.startsWith('**') && part.endsWith('**')) {
                const strong = document.createElement('strong');
                strong.textContent = part.substring(2, part.length - 2);
                el.appendChild(strong);
            } else if (part) {
                el.appendChild(document.createTextNode(part));
            }
        });
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
