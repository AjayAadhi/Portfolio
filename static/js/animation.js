document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they enter the viewport
    const animateElements = () => {
        const elements = document.querySelectorAll('.fade-in:not(.active)');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('active');
            }
        });
    };

    // Add fade-in class to elements that should be animated
    const addFadeInClass = () => {
        const elementsToAnimate = [
            '.section-title',
            '.section-subtitle',
            '.timeline-item',
            '.skill-item',
            '.project-item',
            '.card',
            '.tool-item'
        ];
        
        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (!element.classList.contains('fade-in')) {
                    element.classList.add('fade-in');
                }
            });
        });
    };

    // Initialize animations
    addFadeInClass();
    animateElements();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateElements);
    
    // Trigger animation on page load
    setTimeout(animateElements, 100);
    
    // Add animation for skill bars
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.progress-bar');
        
        skillBars.forEach(bar => {
            const width = bar.style.width;
            
            // Reset the width to 0
            bar.style.width = '0%';
            
            // Animate to the actual width
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width;
            }, 100);
        });
    };
    
    // Create intersection observer for skill section
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(skillsSection);
    }
    
    // Typing animation for hero section
    const typeAnimation = () => {
        const element = document.querySelector('.hero h2');
        if (!element) return;
        
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    };
    
    // Run typing animation on page load
    setTimeout(typeAnimation, 500);
});
