// Three.js Scene Setup
function initWebGL() {
    try {
        const container = document.getElementById('webgl-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        
        // Industrial-style geometry
        const createIndustrialElement = () => {
            const height = Math.random() * 3 + 1;
            const geometry = new THREE.BoxGeometry(1, height, 1);
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(
                edges,
                new THREE.LineBasicMaterial({ color: 0x555555 })
            );
            
            line.position.x = (Math.random() - 0.5) * 20;
            line.position.y = height / 2;
            line.position.z = (Math.random() - 0.5) * 20;
            
            return line;
        };
        
        // Create multiple industrial elements
        for (let i = 0; i < 15; i++) {
            scene.add(createIndustrialElement());
        }
        
        // Add main structure
        const mainGeometry = new THREE.BoxGeometry(8, 3, 8);
        const mainEdges = new THREE.EdgesGeometry(mainGeometry);
        const mainStructure = new THREE.LineSegments(
            mainEdges,
            new THREE.LineBasicMaterial({ color: 0x888888 })
        );
        scene.add(mainStructure);
        
        camera.position.z = 15;
        camera.position.y = 5;
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            
            scene.children.forEach((obj, index) => {
                if (index > 0) { // Skip the main structure
                    obj.rotation.y += 0.001 * index;
                }
            });
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } catch (e) {
        console.error("WebGL initialization error:", e);
        document.getElementById('webgl-container').style.display = 'none';
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize WebGL background
    initWebGL();
    
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements on scroll
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate connection lines
    gsap.to('.connection-line', {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.ecosystem-map',
            start: "top center"
        }
    });
    
    // Animate energy meter
    gsap.to('.meter-fill', {
        width: '100%',
        duration: 2,
        scrollTrigger: {
            trigger: '.energy-meter',
            start: "top center"
        }
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactButton = document.querySelector('.contact-button');
    if (contactButton) {
        contactButton.addEventListener('click', () => {
            // Here you would normally send the request
            // For demo purposes, we'll just show an alert
            alert('Запрос на техническую документацию отправлен. Мы свяжемся с вами в ближайшее время.');
        });
    }
    
    // Initialize Lottie animations
    if (typeof lottie !== 'undefined') {
        // Add your Lottie animations initialization here
        // Example:
        // lottie.loadAnimation({
        //     container: document.getElementById('lottie-animation'),
        //     renderer: 'svg',
        //     loop: true,
        //     autoplay: true,
        //     path: 'path/to/animation.json'
        // });
    }
});

// Fallback for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    import('smoothscroll-polyfill').then((module) => {
        module.polyfill();
    });
}
