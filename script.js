// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Create mailto link
        const mailtoLink = `mailto:malaikamuneer15@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
        
        window.location.href = mailtoLink;
        
        // Optional: Show success message
        alert('Thank you for your message! Opening email client...');
        contactForm.reset();
    });
}

// Image Upload Functionality
function setupImageUpload(imageElementId, fileInputId) {
    const imageElement = document.getElementById(imageElementId);
    
    if (!imageElement) return;

    // Create invisible file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Click on image to upload
    imageElement.style.cursor = 'pointer';
    imageElement.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imageElement.src = event.target.result;
                // Store in localStorage
                localStorage.setItem(imageElementId, event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved image from localStorage on page load
    const savedImage = localStorage.getItem(imageElementId);
    if (savedImage) {
        imageElement.src = savedImage;
    }
}

// Initialize image uploads
document.addEventListener('DOMContentLoaded', () => {
    setupImageUpload('profileImage', 'profileImageInput');
    setupImageUpload('aboutImage', 'aboutImageInput');
});

// Add active state to navigation based on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-primary)';
        }
    });
});