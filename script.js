document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    initLoader();
    
    // Initialize all features
    initHeaderScroll();
    initParallaxEffects();
    initTextAnimations();
    initSmoothScrolling();
    initVideoBackground();
});

// Loader animation
function initLoader() {
    const loader = document.querySelector('.loader__wrapper');
    
    if (loader) {
        // Hide loader after page is loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.style.opacity = '0';
                loader.style.pointerEvents = 'none';
                
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 1000);
            }, 500);
        });
    }
}

// Header scroll behavior
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// Parallax effects
function initParallaxEffects() {
    const programSections = document.querySelectorAll('.program-section');
    
    // Add data-parallax attributes to elements
    programSections.forEach(section => {
        const bg = section.querySelector('.program-bg');
        const content = section.querySelector('.program-content');
        
        if (bg) bg.setAttribute('data-parallax', 'background');
        if (content) content.setAttribute('data-parallax', 'content');
    });
    
    // Parallax on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallaxPositions();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Parallax on mouse move (3D effect)
    document.addEventListener('mousemove', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateMouseParallax(e);
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial update
    updateParallaxPositions();
}

// Update parallax positions based on scroll
function updateParallaxPositions() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const section = element.closest('.program-section');
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if section is in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const scrollProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
            const parallaxType = element.getAttribute('data-parallax');
            
            if (parallaxType === 'background') {
                // Move background slower than scroll for parallax effect
                const translateY = scrollProgress * 100; // px
                element.style.transform = `translate3d(0, ${translateY * 0.2}px, 0)`;
            } else if (parallaxType === 'content') {
                // Significantly reduce content movement to keep it centered
                // Only apply minimal movement to maintain the effect without displacing content
                const translateY = scrollProgress * 10; // Reduced from 30
                element.style.transform = `translate3d(0, ${-translateY * 0.05}px, 0)`;
            }
        }
    });
}

// Update parallax based on mouse position with different effects for each section
function updateMouseParallax(e) {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    // Calculate mouse position relative to center of screen
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (mouseX - centerX) / centerX; // -1 to 1
    const moveY = (mouseY - centerY) / centerY; // -1 to 1
    
    parallaxElements.forEach(element => {
        const section = element.closest('.program-section');
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if section is in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const parallaxType = element.getAttribute('data-parallax');
            const sectionId = section.id;
            
            if (parallaxType === 'content') {
                // Different movement for each section's content
                switch(sectionId) {
                    case 'trans-tuntas':
                        element.style.transform = `translate3d(${moveX * 3}px, ${moveY * 1}px, 0)`;
                        break;
                    case 'trans-lokal':
                        element.style.transform = `translate3d(${moveX * -3}px, ${moveY * 1}px, 0)`;
                        break;
                    case 'trans-gotong-royong':
                        element.style.transform = `translate3d(${moveX * 0}px, ${moveY * 2}px, 0)`;
                        break;
                    case 'trans-patriot':
                        element.style.transform = `translate3d(${moveX * 4}px, ${moveY * 2}px, 0)`;
                        break;
                    case 'trans-karya':
                        element.style.transform = `translate3d(${moveX * -4}px, ${moveY * 0}px, 0)`;
                        break;
                    default:
                        element.style.transform = `translate3d(${moveX * 2}px, ${moveY * 2}px, 0)`;
                }
            }
        }
    });
    
    // Handle video background parallax
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(container => {
        const section = container.closest('.program-section');
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const video = container.querySelector('.program-bg-video');
            if (video) {
                const sectionId = section.id;
                switch(sectionId) {
                    case 'trans-tuntas':
                        video.style.transform = `translate(-50%, -50%) translate3d(${moveX * -10}px, ${moveY * -5}px, 0)`;
                        break;
                    case 'trans-lokal':
                        video.style.transform = `translate(-50%, -50%) translate3d(${moveX * -5}px, ${moveY * -10}px, 0)`;
                        break;
                    case 'trans-gotong-royong':
                        video.style.transform = `translate(-50%, -50%) translate3d(${moveX * -7}px, ${moveY * -7}px, 0)`;
                        break;
                    case 'trans-patriot':
                        video.style.transform = `translate(-50%, -50%) translate3d(${moveX * -8}px, ${moveY * -3}px, 0)`;
                        break;
                    default:
                        video.style.transform = `translate(-50%, -50%) translate3d(${moveX * -7}px, ${moveY * -7}px, 0)`;
                }
            }
        }
    });
}

// Text animations
function initTextAnimations() {
    // Add animation classes to text elements
    const programNumbers = document.querySelectorAll('.program-number');
    const programTitles = document.querySelectorAll('.program-content h2');
    const taglines = document.querySelectorAll('.tagline');
    const programDescriptions = document.querySelectorAll('.program-description');
    
    // Add animation classes
    programNumbers.forEach(el => el.classList.add('fade-in'));
    programTitles.forEach(el => el.classList.add('fade-in'));
    taglines.forEach(el => el.classList.add('fade-in'));
    
    // Set up intersection observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation to child elements
                if (entry.target.classList.contains('program-content')) {
                    const children = entry.target.querySelectorAll('.fade-in');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, 100 * index);
                    });
                    
                    // Add animation to program description
                    const description = entry.target.querySelector('.program-description');
                    if (description) {
                        setTimeout(() => {
                            description.classList.add('visible');
                        }, 400);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe program sections
    document.querySelectorAll('.program-section').forEach(section => {
        observer.observe(section);
        observer.observe(section.querySelector('.program-content'));
        
        const programDescription = section.querySelector('.program-description');
        if (programDescription) {
            observer.observe(programDescription);
        }
    });
    
    // Ensure content is centered on load
    window.addEventListener('load', function() {
        document.querySelectorAll('.program-content').forEach(content => {
            content.style.opacity = 1;
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active state in navigation
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Ensure content stays centered when scrolling between sections
window.addEventListener('scroll', function() {
    // Reset any transform that might have pushed content away from center
    document.querySelectorAll('.program-content').forEach(content => {
        // Add a class that ensures content stays centered
        content.classList.add('stay-centered');
    });
});

// Video background handling
function initVideoBackground() {
    const videos = document.querySelectorAll('.program-bg-video');
    
    videos.forEach(video => {
        // Ensure video plays on iOS devices
        video.play().catch(function(error) {
            console.log("Video play failed:", error);
        });
        
        // Handle visibility changes
        document.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                video.pause();
            } else {
                video.play().catch(function(error) {
                    console.log("Video play failed:", error);
                });
            }
        });
        
        // Optimize performance by reducing quality when not in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(function(error) {
                        console.log("Video play failed:", error);
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(video.closest('.video-container'));
    });
}

// Intersection Observer for animations
const animateOnScroll = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to program number
                const programNumber = entry.target.querySelector('.program-number');
                if (programNumber) {
                    programNumber.classList.add('visible');
                }

                // Add visible class to h2 with delay
                const heading = entry.target.querySelector('h2');
                if (heading) {
                    setTimeout(() => {
                        heading.classList.add('visible');
                    }, 200);
                }

                // Add visible class to tagline with delay
                const tagline = entry.target.querySelector('.tagline');
                if (tagline) {
                    setTimeout(() => {
                        tagline.classList.add('visible');
                    }, 400);
                }

                // Add visible class to program description with delay
                const description = entry.target.querySelector('.program-description');
                if (description) {
                    setTimeout(() => {
                        description.classList.add('visible');
                    }, 600);
                }

                // Animate each paragraph in program description separately
                const paragraphs = entry.target.querySelectorAll('.program-description p');
                paragraphs.forEach((p, index) => {
                    setTimeout(() => {
                        p.style.opacity = '0';
                        p.style.transform = 'translateY(20px)';
                        p.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        
                        setTimeout(() => {
                            p.style.opacity = '1';
                            p.style.transform = 'translateY(0)';
                        }, 50);
                    }, 600 + (index * 200));
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all program content sections
    document.querySelectorAll('.program-content').forEach(section => {
        observer.observe(section);
    });
};

// Handle header visibility on scroll
let lastScrollTop = 0;
const header = document.querySelector('header');

const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('header-hidden');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
    }
    
    // Update scroll position
    lastScrollTop = scrollTop;
    
    // Add scrolled class when not at top
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Handle video backgrounds
const handleVideos = () => {
    const videos = document.querySelectorAll('.program-bg-video');
    
    // Create Intersection Observer for videos
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe each video
    videos.forEach(video => {
        videoObserver.observe(video);
        
        // Handle iOS video playback
        video.play().catch(() => {
            document.body.addEventListener('touchstart', () => {
                video.play();
            }, { once: true });
        });
    });
};

// Mouse parallax effect with text interaction
const handleParallax = () => {
    let sections = document.querySelectorAll('.program-section');
    
    sections.forEach(section => {
        const content = section.querySelector('.program-content');
        const video = section.querySelector('.program-bg-video');
        const programNumber = content.querySelector('.program-number');
        const heading = content.querySelector('h2');
        const tagline = content.querySelector('.tagline');
        const description = content.querySelector('.program-description');
        
        section.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = section.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            // Base content movement
            if (content) {
                content.style.transform = `
                    translate(${x * 15}px, ${y * 15}px)
                `;
            }
            
            // Video parallax
            if (video) {
                video.style.transform = `
                    translate(-50%, -50%)
                    scale(1.1)
                    translate(${x * 25}px, ${y * 25}px)
                `;
            }
            
            // Interactive text elements with different movement speeds and directions
            if (programNumber) {
                programNumber.style.transform = `
                    translate(${x * -8}px, ${y * -8}px)
                    rotate(${x * 2}deg)
                `;
            }
            
            if (heading) {
                heading.style.transform = `
                    translate(${x * 10}px, ${y * 10}px)
                    rotate(${x * 1}deg)
                `;
                heading.style.textShadow = `
                    ${x * -5}px ${y * -5}px 10px rgba(0,0,0,0.3)
                `;
            }
            
            if (tagline) {
                tagline.style.transform = `
                    translate(${x * -12}px, ${y * -12}px)
                    scale(${1 + Math.abs(x) * 0.05})
                `;
            }
            
            if (description) {
                description.style.transform = `
                    translate(${x * 5}px, ${y * 5}px)
                `;
                
                // Subtle letter spacing animation for better readability
                description.style.letterSpacing = `${Math.abs(x) * 0.2}px`;
            }
        });
        
        // Smooth reset on mouse leave
        section.addEventListener('mouseleave', () => {
            if (content) {
                content.style.transform = 'translate(0, 0)';
            }
            if (video) {
                video.style.transform = 'translate(-50%, -50%) scale(1)';
            }
            if (programNumber) {
                programNumber.style.transform = 'translate(0, 0) rotate(0deg)';
            }
            if (heading) {
                heading.style.transform = 'translate(0, 0) rotate(0deg)';
                heading.style.textShadow = 'none';
            }
            if (tagline) {
                tagline.style.transform = 'translate(0, 0) scale(1)';
            }
            if (description) {
                description.style.transform = 'translate(0, 0)';
                description.style.letterSpacing = 'normal';
            }
        });
        
        // Add transition for smooth movement
        const elements = [content, programNumber, heading, tagline, description];
        elements.forEach(element => {
            if (element) {
                element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.willChange = 'transform';
            }
        });
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body after a short delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // Initialize all handlers
    animateOnScroll();
    handleVideos();
    handleParallax();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle active navigation links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
});

// Update footer year
document.getElementById('currentYear').textContent = new Date().getFullYear();