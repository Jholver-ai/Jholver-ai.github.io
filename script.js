document.addEventListener('DOMContentLoaded', () => {
    // Número de WhatsApp (Cambiar por el número real del Dr. Chinchay con código de país, ej: 51987654321)
    const GLOBAL_PHONE_NUMBER = "51976823951";

    // 1. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(31, 54, 40, 0.95)';
            navbar.style.padding = '15px 5%';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.padding = '20px 5%';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Add fade-up class to elements we want to animate
    const animateElements = document.querySelectorAll('.section-title, .about-text p, .service-card, .step, .benefit-item, .contact-info, .trato-list li, .t-card, .testimonial-card, .info-block, .info-alert');

    animateElements.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // 4. Form submission handler (WhatsApp Redirect)
    const form = document.getElementById('whatsappForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('wpNombre').value;
            const lugar = document.getElementById('wpLugar').value;
            const servicio = document.getElementById('wpServicio').value;
            const edad = document.getElementById('wpEdad').value;
            const consulta = document.getElementById('wpConsulta').value;

            const phoneNumber = GLOBAL_PHONE_NUMBER;

            // Construir el mensaje
            let message = `Hola, me gustaría agendar una cita.\n\n`;
            message += `*Nombres:* ${nombre}\n`;
            message += `*Edad:* ${edad} años\n`;
            message += `*Lugar/Ubicación:* ${lugar}\n`;
            if (servicio) message += `*Servicio de interés:* ${servicio}\n`;
            if (consulta) message += `*Consulta:* ${consulta}`;

            // Codificar el mensaje para la URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Abrir WhatsApp en una nueva pestaña
            window.open(whatsappUrl, '_blank');

            form.reset();
        });
    }

    // Set WhatsApp float button link dynamically
    const floatBtn = document.getElementById('whatsapp-float-btn');
    if (floatBtn) {
        const phoneNumber = GLOBAL_PHONE_NUMBER;
        const message = "Hola, me gustaría más información sobre sus servicios.";
        floatBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    }

    // 5. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 6. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });
    }
});
