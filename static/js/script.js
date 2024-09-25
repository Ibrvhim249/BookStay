document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scrolling for Anchor Links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Smooth scroll to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle "Book Now" and "More Details" Buttons in Room Cards
    const handleRoomActions = () => {
        const bookButtons = document.querySelectorAll('.book-btn');
        const detailsButtons = document.querySelectorAll('.details-btn');

        bookButtons.forEach(button => {
            button.addEventListener('click', function () {
                const roomName = this.closest('.room-card').querySelector('h3').innerText;
                alert(`Booking for ${roomName} is not available yet. Stay tuned!`);
            });
        });

        detailsButtons.forEach(button => {
            button.addEventListener('click', function () {
                const roomName = this.closest('.room-card').querySelector('h3').innerText;
                alert(`More details about ${roomName} will be available soon.`);
            });
        });
    };

    handleRoomActions();

    // Testimonials Carousel
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    };

    showTestimonial(currentTestimonial);

    // Auto-slide Testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Availability Form Submission Handling
    const availabilityForm = document.getElementById('availability-form');
    
    availabilityForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = {
            checkin: this.checkin.value,
            checkout: this.checkout.value,
            adults: this.adults.value,
            children: this.children.value
        };

        // Display selected values in an alert or handle form logic
        alert(`Checking availability:\nCheck-in: ${formData.checkin}\nCheck-out: ${formData.checkout}\nAdults: ${formData.adults}\nChildren: ${formData.children}`);

        // Here you can add code to handle availability check, e.g., sending data to a server.
    });

    // Lazy Loading Images for Performance
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = () => {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight && img.getAttribute('data-src')) {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            }
        });
    };

    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    lazyLoad(); // Initial check to load visible images

    // Mobile Navbar Toggle
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar ul');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function () {
            navbarMenu.classList.toggle('active');
        });
    }

    // Close mobile navbar when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', function () {
            if (navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
            }
        });
    });

    // Form Validation for Availability Form
    availabilityForm.addEventListener('submit', function (event) {
        const checkin = this.checkin.value;
        const checkout = this.checkout.value;

        if (!checkin || !checkout) {
            alert('Please fill in both the check-in and check-out dates.');
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });

    // Login Modal Show/Hide
    const loginModal = document.getElementById('login-modal');
    const loginButton = document.getElementById('show-login');
    const closeLoginButton = document.getElementById('close-login');

    if (loginButton && closeLoginButton && loginModal) {
        loginButton.addEventListener('click', () => loginModal.classList.remove('hidden'));
        closeLoginButton.addEventListener('click', () => loginModal.classList.add('hidden'));
    }

    // Register Modal Show/Hide
    const registerModal = document.getElementById('register-modal');
    const registerButton = document.getElementById('show-register');
    const closeRegisterButton = document.getElementById('close-register');

    if (registerButton && closeRegisterButton && registerModal) {
        registerButton.addEventListener('click', () => registerModal.classList.remove('hidden'));
        closeRegisterButton.addEventListener('click', () => registerModal.classList.add('hidden'));
    }
});

// Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Perform login logic (e.g., API call)
    console.log('Login attempt:', { email, password });
});

// Registration Form Submission
document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Perform registration logic (e.g., API call)
    console.log('Registration attempt:', { name, email, password });
});
