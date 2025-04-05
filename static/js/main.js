document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltips.map(function(tooltip) {
        return new bootstrap.Tooltip(tooltip);
    });
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('dark-icon');
    const lightIcon = document.getElementById('light-icon');
    const htmlElement = document.documentElement;
    
    // Always use dark as the default theme, the toggle only affects accent colors and text
    localStorage.setItem('theme', 'dark');
    htmlElement.setAttribute('data-bs-theme', 'dark');
    
    // Custom theme colors for "light mode" that still maintain dark backgrounds
    const darkModeColors = {
        primary: '#0d6efd',
        secondary: '#6c757d',
        text: '#f8f9fa'
    };
    
    const lightModeColors = {
        primary: '#0a58ca',
        secondary: '#5c636a',
        text: '#ffffff'
    };
    
    let isAlternatePalette = false;
    
    // Theme toggle click handler - custom implementation that doesn't change the theme to light
    themeToggle.addEventListener('click', () => {
        if (!isAlternatePalette) {
            // Switch to "light mode" palette while keeping dark backgrounds
            darkIcon.classList.add('d-none');
            lightIcon.classList.remove('d-none');
            isAlternatePalette = true;
            
            // Update accent colors but keep dark backgrounds
            document.documentElement.style.setProperty('--bs-primary', lightModeColors.primary);
            document.documentElement.style.setProperty('--bs-secondary', lightModeColors.secondary);
        } else {
            // Switch back to default dark mode
            lightIcon.classList.add('d-none');
            darkIcon.classList.remove('d-none');
            isAlternatePalette = false;
            
            // Reset to original colors
            document.documentElement.style.setProperty('--bs-primary', darkModeColors.primary);
            document.documentElement.style.setProperty('--bs-secondary', darkModeColors.secondary);
        }
    });

    // Navbar scroll effect
    let navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // If mobile menu is open, close it
                if (document.querySelector('.navbar-collapse.show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        });
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.project-filters .btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            contactForm.classList.add('was-validated');
        });
    }
});
