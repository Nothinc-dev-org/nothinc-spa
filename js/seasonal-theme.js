(function () {
    const today = new Date();
    const month = today.getMonth(); // 0 = Jan, 11 = Dec

    // Configuration for themes
    const themes = {
        christmas: {
            month: 11, // December
            css: 'css/christmas.css',
            bannerClass: 'christmas-banner',
            bannerContent: '<i class="fas fa-sleigh"></i> <span>¡Nothinc les desea Felices Fiestas!</span> <i class="fas fa-gift"></i>',
            particleClass: 'snowflake',
            particleSymbol: '❄',
            particleCount: 40
        },
        newyear: {
            month: 0, // January
            css: 'css/newyear.css',
            bannerClass: 'newyear-banner',
            bannerContent: '<i class="fas fa-glass-cheers"></i> <span>¡Nothinc les desea un Feliz Año Nuevo!</span> <i class="fas fa-star"></i>',
            particleClass: 'confetti',
            particleSymbol: '✨', // Sparkles/Stars for New Year
            particleCount: 50
        }
    };

    let activeTheme = null;

    if (month === themes.christmas.month) {
        activeTheme = themes.christmas;
        console.log("🎄 Christmas Mode Activated");
    } else if (month === themes.newyear.month) {
        activeTheme = themes.newyear;
        console.log("🎉 New Year Mode Activated");
    }

    if (activeTheme) {
        initTheme(activeTheme);
    }

    function initTheme(theme) {
        // 1. Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = theme.css;
        document.head.appendChild(link);

        // 2. Add Banner
        const banner = document.createElement('div');
        banner.className = theme.bannerClass;
        banner.classList.add('seasonal-banner'); // Common class for selection
        banner.innerHTML = theme.bannerContent;

        // Insert at the very top of body
        document.body.insertBefore(banner, document.body.firstChild);

        // Recalculate layout immediately and on events
        setupScrollSync(theme.bannerClass);

        // 3. seasonal Effect (Particles)
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const particleContainer = document.createElement('div');
            particleContainer.className = 'seasonal-particles-container';

            for (let i = 0; i < theme.particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add(theme.particleClass);
                particle.innerHTML = theme.particleSymbol;

                // Random properties for natural feel
                const left = Math.random() * 100;
                const animDuration = Math.random() * 3 + 4; // 4s to 7s
                const size = Math.random() * 12 + 8; // 8px to 20px
                const opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
                const delay = Math.random() * 5;

                particle.style.left = `${left}%`;
                particle.style.animationDuration = `${animDuration}s`;
                particle.style.fontSize = `${size}px`;
                particle.style.opacity = opacity;
                particle.style.animationDelay = `-${delay}s`;

                particleContainer.appendChild(particle);
            }
            hero.appendChild(particleContainer);
        }
    }

    function setupScrollSync(bannerClass) {
        const navbar = document.querySelector('.navbar');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        function handleScrollEffects() {
            // Logic to handle Banner offset
            const banner = document.querySelector(`.${bannerClass}`);
            let bannerOffset = 0;

            if (banner) {
                const bannerHeight = banner.offsetHeight;
                bannerOffset = Math.max(0, bannerHeight - window.scrollY);
            }

            if (navbar) {
                navbar.style.top = `${bannerOffset}px`;
            }

            if (window.scrollY > 50) {
                navbar?.classList.add('scrolled');
                scrollIndicator?.classList.add('hidden');
            } else {
                navbar?.classList.remove('scrolled');
                scrollIndicator?.classList.remove('hidden');
            }
        }

        window.addEventListener('scroll', handleScrollEffects);
        // Call initially
        handleScrollEffects();
        // Also call on resize
        window.addEventListener('resize', handleScrollEffects);
    }
})();
