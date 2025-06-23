<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechBase360 - Производственно-логистический комплекс</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Neue+Haas+Grotesk:wght@400;700&display=swap">
    <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.11.4/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lottie-web@5.10.1/build/player/lottie.min.js"></script>
    <style>
        :root {
            --graphite: #1E1E1E;
            --orange: #FF8C00;
            --orange-bright: #FFA500;
            --text-primary: #D1D1D1;
            --text-secondary: #6C6C6C;
            --success: #34C759;
            --error: #FF3B30;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Neue Haas Grotesk', sans-serif;
            color: var(--text-primary);
            background-color: var(--graphite);
            overflow-x: hidden;
            line-height: 1.6;
        }

        /* WebGL Background */
        #webgl-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.3;
        }

        /* Typography */
        h1, h2, h3, h4 {
            font-weight: 700;
            margin-bottom: 1rem;
            line-height: 1.2;
        }

        h1 {
            font-size: clamp(2.5rem, 5vw, 3.5rem);
            color: var(--orange);
        }

        h2 {
            font-size: clamp(2rem, 4vw, 2.5rem);
        }

        h3 {
            font-size: clamp(1.5rem, 3vw, 1.8rem);
        }

        p {
            font-size: clamp(1rem, 2vw, 1.125rem);
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
        }

        a {
            color: inherit;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        /* Layout */
        .container {
            width: 100%;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        section {
            padding: 6rem 0;
            position: relative;
        }

        /* Navigation */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            z-index: 1000;
            background-color: rgba(30, 30, 30, 0.9);
            backdrop-filter: blur(10px);
        }

        .logo {
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            font-weight: 700;
        }

        .logo-tm {
            font-size: 0.7rem;
            vertical-align: super;
            margin-left: 0.2rem;
        }

        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-links a {
            position: relative;
            padding: 0.5rem 0;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: var(--orange);
            transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
            width: 100%;
        }

        .cta-button {
            background-color: var(--orange);
            color: var(--graphite);
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            font-weight: 700;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-block;
        }

        .cta-button:hover {
            background-color: var(--orange-bright);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
        }

        /* Hero Section */
        .hero {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            position: relative;
            padding-top: 5rem;
        }

        .hero-content {
            max-width: 800px;
            position: relative;
            z-index: 2;
        }

        .hero-title {
            margin-bottom: 2rem;
        }

        .hero-subtitle {
            font-size: clamp(1.25rem, 3vw, 1.5rem);
            margin-bottom: 3rem;
            color: var(--text-primary);
            max-width: 600px;
        }

        .hero-address {
            position: absolute;
            bottom: 3rem;
            left: 2rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }

        .icon {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }

        /* Sections */
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-header h2 {
            margin-bottom: 1.5rem;
        }

        /* Ecosystem Map */
        .ecosystem {
            position: relative;
        }

        .ecosystem-map {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
        }

        .ecosystem-svg {
            width: 100%;
            height: auto;
        }

        .node {
            fill: var(--orange);
            stroke: var(--graphite);
            stroke-width: 2;
            transition: all 0.3s ease;
        }

        .center-node {
            fill: var(--orange-bright);
            filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.5));
        }

        .node-label {
            fill: var(--text-primary);
            font-size: 1rem;
            text-anchor: middle;
        }

        .connection-line {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
        }

        /* Infrastructure */
        .infrastructure {
            background: linear-gradient(rgba(30, 30, 30, 0.9), rgba(30, 30, 30, 0.9)), 
                        url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 0 L100 0 L100 100 L0 100 Z" fill="none" stroke="%232E2E2E" stroke-width="0.5"/></svg>');
        }

        .infrastructure-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .infrastructure-card {
            background: rgba(46, 46, 46, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 2rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }

        .infrastructure-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            border-color: var(--orange);
        }

        .card-icon {
            width: 60px;
            height: 60px;
            margin-bottom: 1.5rem;
            background-color: rgba(255, 140, 0, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Potential Section */
        .potential {
            background: linear-gradient(rgba(30, 30, 30, 0.9), rgba(30, 30, 30, 0.9)), 
                        url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 0 L100 0 L100 100 L0 100 Z" fill="none" stroke="%232E2E2E" stroke-width="0.5"/></svg>');
        }

        .potential-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 3rem;
            margin-top: 3rem;
        }

        .potential-card {
            background: rgba(46, 46, 46, 0.5);
            border-radius: 8px;
            padding: 2rem;
            backdrop-filter: blur(10px);
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .card-icon-lg {
            width: 40px;
            height: 40px;
            fill: var(--orange);
        }

        .energy-meter {
            margin-top: 2rem;
        }

        .meter-track {
            height: 8px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            margin-bottom: 0.5rem;
            overflow: hidden;
        }

        .meter-fill {
            height: 100%;
            width: 20%;
            background: linear-gradient(90deg, var(--orange), var(--orange-bright));
            border-radius: 4px;
        }

        .meter-labels {
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            color: var(--text-secondary);
        }

        /* Contact Section */
        .contact {
            text-align: center;
            background: linear-gradient(rgba(30, 30, 30, 0.9), rgba(30, 30, 30, 0.9)), 
                        url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 0 L100 0 L100 100 L0 100 Z" fill="none" stroke="%232E2E2E" stroke-width="0.5"/></svg>');
        }

        .contact-content {
            max-width: 600px;
            margin: 0 auto;
        }

        .contact-subtitle {
            font-size: 1.25rem;
            margin-bottom: 3rem;
        }

        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .contact-button {
            background-color: var(--orange);
            color: var(--graphite);
            padding: 1rem 2rem;
            border-radius: 4px;
            font-weight: 700;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .contact-button:hover {
            background-color: var(--orange-bright);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
        }

        .button-arrow {
            width: 20px;
            height: 20px;
            fill: var(--graphite);
        }

        /* Responsive */
        @media (max-width: 992px) {
            section {
                padding: 4rem 0;
            }

            .potential-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            .navbar {
                padding: 1rem;
            }

            .nav-links {
                gap: 1rem;
            }

            .hero {
                padding-top: 4rem;
            }

            .hero-content {
                padding: 0 1.5rem;
            }

            .infrastructure-grid {
                grid-template-columns: 1fr;
            }

            .hero-address {
                left: 1.5rem;
                bottom: 2rem;
            }
        }

        @media (max-width: 576px) {
            .container {
                padding: 0 1.5rem;
            }

            .nav-links {
                display: none;
            }

            .hero {
                justify-content: flex-start;
                padding-top: 6rem;
            }

            .contact-button {
                width: 100%;
                justify-content: center;
            }
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes draw {
            to { stroke-dashoffset: 0; }
        }

        .fade-in {
            animation: fadeIn 1s ease forwards;
        }

        .animate-line {
            animation: draw 1.5s ease-out forwards;
        }
    </style>
</head>
<body>
    <!-- WebGL Background -->
    <div id="webgl-container"></div>
    
    <!-- Navigation -->
    <nav class="navbar">
        <div class="container">
            <a href="#" class="logo">
                TechBase360<span class="logo-tm">™</span>
            </a>
            <ul class="nav-links">
                <li><a href="#location">Локация</a></li>
                <li><a href="#infrastructure">Инфраструктура</a></li>
                <li><a href="#potential">Потенциал</a></li>
                <li><a href="#contact" class="cta-button">Контакты</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content fade-in">
                <h1 class="hero-title">TechBase360</h1>
                <p class="hero-subtitle">Производственно-логистический комплекс с готовой инфраструктурой для бизнеса 24/7/365</p>
                <a href="#contact" class="cta-button">Узнать подробности</a>
            </div>
            <div class="hero-address">
                <svg class="icon" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Московская обл., г. Воскресенск, ул. Центральная, с36А</span>
            </div>
        </div>
    </section>

    <!-- Ecosystem Section -->
    <section id="location" class="ecosystem">
        <div class="container">
            <div class="section-header fade-in">
                <h2>Прямой доступ к лидерам рынка</h2>
                <p>Ключевой запрос: склад для маркетплейса. Факт: Склад Wildberries — 10 км. Результат: Оптимизация логистики, работа по модели Fulfillment.</p>
            </div>
            <div class="ecosystem-map fade-in">
                <svg class="ecosystem-svg" viewBox="0 0 800 600">
                    <!-- Center Node -->
                    <circle class="node center-node" cx="400" cy="300" r="40" fill="#FF8C00"/>
                    <text class="node-label" x="400" y="360">TechBase360</text>
                    
                    <!-- Connection Nodes -->
                    <g class="connection-group">
                        <line class="connection-line animate-line" x1="400" y1="300" x2="200" y2="150" stroke="#FF8C00" stroke-width="2"/>
                        <circle class="node" cx="200" cy="150" r="30" fill="#34C759"/>
                        <text class="node-label" x="200" y="200">Wildberries (10 км)</text>
                    </g>
                    
                    <g class="connection-group">
                        <line class="connection-line animate-line" x1="400" y1="300" x2="600" y2="150" stroke="#FF8C00" stroke-width="2"/>
                        <circle class="node" cx="600" cy="150" r="30" fill="#6C6C6C"/>
                        <text class="node-label" x="600" y="200">Завод "Технониколь"</text>
                    </g>
                    
                    <g class="connection-group">
                        <line class="connection-line animate-line" x1="400" y1="300" x2="400" y2="500" stroke="#FF8C00" stroke-width="2"/>
                        <circle class="node" cx="400" cy="500" r="30" fill="#34C759"/>
                        <text class="node-label" x="400" y="550">Трасса М-5 "Урал" (3 км)</text>
                    </g>
                </svg>
            </div>
        </div>
    </section>

    <!-- Infrastructure Section -->
    <section id="infrastructure" class="infrastructure">
        <div class="container">
            <div class="section-header fade-in">
                <h2>Капитальные боксы: производство и сервис</h2>
                <p>Три изолированных бокса (240 м²) с различным назначением</p>
            </div>
            
            <div class="infrastructure-grid">
                <div class="infrastructure-card fade-in">
                    <div class="card-icon">
                        <svg viewBox="0 0 24 24" class="icon">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                            <path d="M11 7h2v2h-2zM11 11h2v2h-2zM11 15h2v2h-2z"/>
                        </svg>
                    </div>
                    <h3>Производственный цех</h3>
                    <p>Высота потолков 4.5 м, нагрузка на пол 5 т/м²</p>
                </div>
                
                <div class="infrastructure-card fade-in">
                    <div class="card-icon">
                        <svg viewBox="0 0 24 24" class="icon">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
                            <circle cx="7.5" cy="14.5" r="1.5"/>
                            <circle cx="16.5" cy="14.5" r="1.5"/>
                        </svg>
                    </div>
                    <h3>База СТО</h3>
                    <p>Сквозной проезд для спецтехники</p>
                </div>
                
                <div class="infrastructure-card fade-in">
                    <div class="card-icon">
                        <svg viewBox="0 0 24 24" class="icon">
                            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                        </svg>
                    </div>
                    <h3>Сборочная линия</h3>
                    <p>Оптимизированная организация пространства</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Potential Section -->
    <section id="potential" class="potential">
        <div class="container">
            <div class="section-header fade-in">
                <h2>Энергетический и ресурсный потенциал</h2>
                <p>Мощность до 50 МВт по запросу • Гарантированное подключение</p>
            </div>
            
            <div class="potential-grid">
                <div class="potential-card fade-in">
                    <div class="card-header">
                        <svg viewBox="0 0 24 24" class="card-icon-lg">
                            <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
                        </svg>
                        <h3>Электроснабжение</h3>
                    </div>
                    <div class="energy-meter">
                        <div class="meter-track">
                            <div class="meter-fill"></div>
                        </div>
                        <div class="meter-labels">
                            <span>Базовое подключение</span>
                            <span>Масштабирование по ТУ +</span>
                        </div>
                    </div>
                </div>
                
                <div class="potential-card fade-in">
                    <div class="card-header">
                        <svg viewBox="0 0 24 24" class="card-icon-lg">
                            <path d="M17 8h2c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h9v2H5v14h14v-9zM12 9l-1.4 1.4L16.2 14H4v2h12.2l-5.6 5.6L12 23l8-8-8-8z"/>
                        </svg>
                        <h3>Газоснабжение</h3>
                    </div>
                    <p>Доступ к природному газу • Техническая возможность подключения</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <div class="contact-content fade-in">
                <h2>TechBase360<sup>®</sup></h2>
                <p class="contact-subtitle">Прямая продажа от собственника</p>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" class="icon">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                        <span>+7 (495) 294-99-22</span>
                    </div>
                    
                    <div class="contact-item">
                        <svg viewBox="0 0 24 24" class="icon">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        <span>info@vskbase.ru</span>
                    </div>
                </div>
                
                <button class="contact-button">
                    Запросить техническую документацию
                    <svg viewBox="0 0 24 24" class="button-arrow">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                </button>
            </div>
        </div>
    </section>

    <script>
        // Three.js Scene Setup
        function initWebGL() {
            const container = document.getElementById('webgl-container');
            
            // Check if WebGL is supported
            if (!WEBGL.isWebGLAvailable()) {
                const warning = WEBGL.getWebGLErrorMessage();
                container.appendChild(warning);
                return;
            }

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
        }

        // Initialize animations when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize WebGL background
            initWebGL();
            
            // Animate elements on scroll
            const animateOnScroll = () => {
                const elements = document.querySelectorAll('.fade-in');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (elementPosition < screenPosition) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
            
            // Initial check
            animateOnScroll();
            
            // Check on scroll
            window.addEventListener('scroll', animateOnScroll);
            
            // Animate energy meter
            const meterFill = document.querySelector('.meter-fill');
            if (meterFill) {
                setTimeout(() => {
                    meterFill.style.width = '100%';
                }, 500);
            }
            
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
        });
    </script>
</body>
</html>
