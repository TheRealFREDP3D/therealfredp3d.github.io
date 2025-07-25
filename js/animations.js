// Advanced animations and effects

document.addEventListener('DOMContentLoaded', function() {
    
    // Particle system for background
    class ParticleSystem {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 50;
            
            this.resize();
            this.init();
            this.animate();
            
            window.addEventListener('resize', () => this.resize());
        }
        
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        init() {
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }
        
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = this.canvas.width;
                if (particle.x > this.canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = this.canvas.height;
                if (particle.y > this.canvas.height) particle.y = 0;
                
                // Draw particle
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
                this.ctx.fill();
            });
            
            // Draw connections
            this.drawConnections();
            
            requestAnimationFrame(() => this.animate());
        }
        
        drawConnections() {
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - distance / 100)})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }
        }
    }
    
    // Initialize particle system if canvas exists
    const particleCanvas = document.querySelector('#particle-canvas');
    if (particleCanvas) {
        new ParticleSystem(particleCanvas);
    }
    
    // Glitch effect for text
    function createGlitchEffect(element) {
        const text = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        function glitch() {
            let glitchedText = '';
            for (let i = 0; i < text.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += text[i];
                }
            }
            element.textContent = glitchedText;
            
            setTimeout(() => {
                element.textContent = text;
            }, 50);
        }
        
        return glitch;
    }
    
    // Apply glitch effect to specific elements
    const glitchElements = document.querySelectorAll('.glitch-text');
    glitchElements.forEach(element => {
        const glitchFn = createGlitchEffect(element);
        element.addEventListener('mouseenter', glitchFn);
    });
    
    // Floating animation for cards
    function addFloatingAnimation() {
        const cards = document.querySelectorAll('.project-card, .skill-category, .stat-card');
        
        cards.forEach((card, index) => {
            const delay = index * 0.2;
            const duration = 3 + Math.random() * 2;
            
            card.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        });
    }
    
    // CSS for floating animation
    const floatingKeyframes = `
        @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-10px); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = floatingKeyframes;
    document.head.appendChild(style);
    
    addFloatingAnimation();
    
    // Mouse trail effect
    class MouseTrail {
        constructor() {
            this.trail = [];
            this.maxTrailLength = 20;
            this.init();
        }
        
        init() {
            document.addEventListener('mousemove', (e) => {
                this.addTrailPoint(e.clientX, e.clientY);
                this.updateTrail();
            });
        }
        
        addTrailPoint(x, y) {
            this.trail.push({ x, y, life: 1 });
            
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }
        }
        
        updateTrail() {
            // Remove existing trail elements
            document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
            
            this.trail.forEach((point, index) => {
                const trailElement = document.createElement('div');
                trailElement.className = 'mouse-trail';
                trailElement.style.cssText = `
                    position: fixed;
                    left: ${point.x}px;
                    top: ${point.y}px;
                    width: ${4 + index * 2}px;
                    height: ${4 + index * 2}px;
                    background: rgba(0, 255, 136, ${point.life * 0.5});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    transition: opacity 0.3s ease;
                `;
                
                document.body.appendChild(trailElement);
                
                // Fade out
                point.life -= 0.05;
                if (point.life <= 0) {
                    trailElement.remove();
                }
            });
            
            this.trail = this.trail.filter(point => point.life > 0);
        }
    }
    
    // Initialize mouse trail on desktop only
    if (window.innerWidth > 768) {
        new MouseTrail();
    }
    
    // Scroll-triggered animations
    function createScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => {
            scrollObserver.observe(element);
        });
    }
    
    createScrollAnimations();
    
    // Text reveal animation
    function createTextRevealAnimation() {
        const textElements = document.querySelectorAll('.reveal-text');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.3s ease ${index * 0.05}s`;
                element.appendChild(span);
            });
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const spans = entry.target.querySelectorAll('span');
                        spans.forEach(span => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        });
                    }
                });
            });
            
            observer.observe(element);
        });
    }
    
    createTextRevealAnimation();
    
    // Magnetic button effect
    function addMagneticEffect() {
        const buttons = document.querySelectorAll('.btn, .social-link');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    addMagneticEffect();
    
    // Ripple effect for buttons
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // CSS for ripple animation
    const rippleKeyframes = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = rippleKeyframes;
    document.head.appendChild(rippleStyle);
    
    addRippleEffect();
    
    // Parallax scrolling for sections
    function initParallaxScrolling() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    initParallaxScrolling();
    
    // Loading screen animation
    function createLoadingScreen() {
        const loader = document.querySelector('.loader');
        if (loader) {
            window.addEventListener('load', () => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            });
        }
    }
    
    createLoadingScreen();
    
    // Smooth reveal for images
    function initImageReveal() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'all 0.6s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
            
            // If image is already loaded
            if (img.complete) {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }
        });
    }
    
    initImageReveal();
});

