// Hero Section Typing Effect
const words = ["Front-End Developer", "Python Developer", "Data Analyst"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
let typingElement = document.getElementById("typing");

function type() {
    currentWord = words[i];
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, j--);
        if (j < 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
        }
    } else {
        typingElement.textContent = currentWord.substring(0, j++);
        if (j > currentWord.length) {
            isDeleting = true;
        }
    }
    setTimeout(type, isDeleting ? 50 : 100);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleButton = document.querySelector('.dark-mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// About Section Sliding Effect (Two Points at a Time)
function slidePoints() {
    const points = document.querySelectorAll('.slide-point');
    let topIndex = 0;
    let bottomIndex = 1;

    function updatePoints() {
        // Remove all active classes
        points.forEach(point => {
            point.classList.remove('active-top', 'active-bottom');
        });

        // Add active classes to current top and bottom points
        if (topIndex < points.length) {
            points[topIndex].classList.add('active-top');
        }
        if (bottomIndex < points.length) {
            points[bottomIndex].classList.add('active-bottom');
        }

        // Update indices for next pair
        topIndex = (topIndex + 2) % points.length;
        bottomIndex = (bottomIndex + 2) % points.length;

        // If bottomIndex exceeds length, reset to show first pair again
        if (bottomIndex === 1 && topIndex === 0) {
            bottomIndex = 1;
            topIndex = 0;
        }
    }

    // Initial display
    updatePoints();
    setInterval(updatePoints, 3000); // Slide every 3 seconds
}

// Neon Light Animation on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const projectsSection = document.querySelector('.projects-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectsSection.classList.add('active');
            } else {
                projectsSection.classList.remove('active');
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is in view
    });

    if (projectsSection) {
        observer.observe(projectsSection);
    }
});

// Original Skills Section Sliding Effect (Two Parts at a Time)
function slideSkills() {
    const slides = document.querySelectorAll('.skill-slide');
    let currentPair = 0;

    function updateSlides() {
        // Reset all slides
        slides.forEach(slide => {
            slide.classList.remove('active-left', 'active-right');
            slide.classList.add(slide.dataset.index % 2 === 0 ? 'left' : 'right');
            // Reset progress bars
            slide.querySelectorAll('.progress-fill').forEach(fill => {
                fill.style.width = '0';
            });
        });

        // Current pair
        let leftIndex = currentPair * 2;
        let rightIndex = leftIndex + 1;

        // Activate current pair
        if (leftIndex < slides.length) {
            slides[leftIndex].classList.add('active-left');
            slides[leftIndex].querySelectorAll('.progress-fill').forEach(fill => {
                fill.style.width = `${fill.dataset.percent}%`;
            });
        }
        if (rightIndex < slides.length) {
            slides[rightIndex].classList.add('active-right');
            slides[rightIndex].querySelectorAll('.progress-fill').forEach(fill => {
                fill.style.width = `${fill.dataset.percent}%`;
            });
        }

        currentPair = (currentPair + 1) % Math.ceil(slides.length / 2);
    }

    updateSlides();
    setInterval(updateSlides, 4000); // Slide every 4 seconds
}

function slideProjects() {
    const cards = document.querySelectorAll('.project-card');
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

function slideContact() {
    const contactSection = document.querySelector('.contact-container');
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    if (contactSection) {
        observer.observe(contactSection);
    }
}

function fadeFooter() {
    const footerSection = document.querySelector('.footer-container');
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    if (footerSection) {
        observer.observe(footerSection);
    }
}

// Enhanced Skills Section Sliding Effect
function enhancedSlideSkills() {
    const slides = document.querySelectorAll(".skill-slide");
    let currentPair = 0;
    const totalPairs = Math.ceil(slides.length / 2);

    // Add data-index attributes if not already present
    slides.forEach((slide, index) => {
        if (!slide.dataset.index) {
            slide.dataset.index = index;
        }
    });

    function updateSlides() {
        // Reset all slides
        slides.forEach((slide) => {
            slide.classList.remove("active-left", "active-right");
            slide.classList.add(slide.dataset.index % 2 === 0 ? "left" : "right");

            // Reset progress bars
            slide.querySelectorAll(".progress-fill").forEach((fill) => {
                fill.style.width = "0";
            });
        });

        // Current pair
        const leftIndex = currentPair * 2;
        const rightIndex = leftIndex + 1;

        // Activate current pair with staggered animation
        if (leftIndex < slides.length) {
            slides[leftIndex].classList.add("active-left");

            // Staggered animation for progress bars
            setTimeout(() => {
                slides[leftIndex].querySelectorAll(".progress-fill").forEach((fill, i) => {
                    setTimeout(() => {
                        fill.style.width = `${fill.dataset.percent}%`;
                    }, i * 200);
                });
            }, 300);
        }

        if (rightIndex < slides.length) {
            slides[rightIndex].classList.add("active-right");

            // Staggered animation for progress bars with delay
            setTimeout(() => {
                slides[rightIndex].querySelectorAll(".progress-fill").forEach((fill, i) => {
                    setTimeout(() => {
                        fill.style.width = `${fill.dataset.percent}%`;
                    }, i * 200);
                });
            }, 600);
        }

        // Update for next pair
        currentPair = (currentPair + 1) % totalPairs;
    }

    // Initial update
    updateSlides();

    // Set interval for slide changes
    return setInterval(updateSlides, 5000); // Slide every 5 seconds
}

// Add floating animation to social icons
function floatingSocialIcons() {
    const socialIcons = document.querySelectorAll(".social-icon");

    socialIcons.forEach((icon, index) => {
        icon.classList.add("social-icon-float");
        // Stagger animation start times
        icon.style.animationDelay = `${index * 0.5}s`;
    });
}

// Neon Cursor Effect
function createNeonCursor() {
    const cursorNeon = document.querySelector(".cursor-neon");
    if (!cursorNeon) return;

    // Track mouse position
    document.addEventListener("mousemove", (e) => {
        cursorNeon.style.left = `${e.clientX}px`;
        cursorNeon.style.top = `${e.clientY}px`;
    });

    // Add click effect
    document.addEventListener("mousedown", () => {
        cursorNeon.classList.add("active");
    });

    document.addEventListener("mouseup", () => {
        cursorNeon.classList.remove("active");
    });
}


// Add this function to your script.js file

// Image Slider Function
function initImageSlider() {
    const images = document.querySelectorAll('.image-slider img');
    let currentIndex = 0;
    
    // Create neon border elements
    const heroImage = document.querySelector('.neon-border');
    const topBorder = document.createElement('div');
    const bottomBorder = document.createElement('div');
    
    topBorder.className = 'top-border';
    bottomBorder.className = 'bottom-border';
    
    heroImage.appendChild(topBorder);
    heroImage.appendChild(bottomBorder);
    
    // Function to change active image
    function changeImage() {
        // Remove active class from all images
        images.forEach(img => {
            img.classList.remove('active');
            img.classList.add('inactive');
        });
        
        // Add active class to current image
        images[currentIndex].classList.remove('inactive');
        images[currentIndex].classList.add('active');
        
        // Update index for next image
        currentIndex = (currentIndex + 1) % images.length;
    }
    
    // Set initial active image
    changeImage();
    
    // Set interval to change image every 2 seconds
    setInterval(changeImage, 10000);
}






// Certifications Section Animation
function animateCertifications() {
    const certificationCards = document.querySelectorAll('.certification-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered animation delay
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    // Set initial styles and observe
    certificationCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  }

 // Contact Form Email Validation
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    // Email validation function
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    
    // Real-time email validation
    emailInput.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        if (!validateEmail(this.value)) {
          emailError.textContent = 'Email is invalid';
          emailError.style.opacity = '1';
          this.style.borderColor = '#ff5555';
          this.style.boxShadow = '0 0 10px rgba(255, 85, 85, 0.5)';
        } else {
          emailError.textContent = '';
          emailError.style.opacity = '0';
          this.style.borderColor = '#00ddeb';
          this.style.boxShadow = '0 0 10px rgba(0, 221, 235, 0.5)';
        }
      } else {
        emailError.textContent = '';
        emailError.style.opacity = '0';
        this.style.borderColor = 'rgba(74, 74, 255, 0.3)';
        this.style.boxShadow = 'none';
      }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = emailInput.value;
      const message = document.getElementById('message').value;
      
      // Validate email again before submission
      if (!validateEmail(email)) {
        emailError.textContent = 'Email is invalid';
        emailError.style.opacity = '1';
        emailInput.style.borderColor = '#ff5555';
        emailInput.style.boxShadow = '0 0 10px rgba(255, 85, 85, 0.5)';
        emailInput.focus();
        return;
      }
      
      // Here you would normally send the data to a backend
      // For demonstration, we'll simulate a successful submission
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate backend request
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        alert('Message sent successfully! We will get back to you soon.');
        
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Reset styles
        emailInput.style.borderColor = 'rgba(74, 74, 255, 0.3)';
        emailInput.style.boxShadow = 'none';
        emailError.textContent = '';
        emailError.style.opacity = '0';
      }, 1500);
      
      // In a real implementation, you would use fetch or XMLHttpRequest to send data to your backend
      
      fetch('your-backend-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          to: 'ahmadraza2607@gmail.com'
        }),
      })
      .then(response => response.json())
      .then(data => {
        // Handle success
        contactForm.reset();
        alert('Message sent successfully! We will get back to you soon.');
      })
      .catch(error => {
        // Handle error
        alert('There was an error sending your message. Please try again later.');
        console.error('Error:', error);
      })
      .finally(() => {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
      
    });
  } 


  // Add this to your initEnhancedEffects function








// Initialize enhanced effects
function initEnhancedEffects() {
    // Replace original slideSkills with enhanced version
    enhancedSlideSkills();
    
    // Add floating social icons
    floatingSocialIcons();

    animateCertifications();

    setupContactForm();
    
    // Add neon cursor effect
    createNeonCursor();
    
    // Intersection Observer for skills section
    const skillsSection = document.querySelector(".skills-section");
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    skillsSection.style.boxShadow = "0 0 30px rgba(0, 221, 235, 0.5)";
                } else {
                    skillsSection.style.boxShadow = "none";
                }
            });
        },
        {
            threshold: 0.3,
        }
    );
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}



// Initialize All Effects
document.addEventListener("DOMContentLoaded", () => {
    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        document.querySelector(".dark-mode-toggle").innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Original functions
    type();
    slidePoints();
    // slideSkills(); // Comment out the original slideSkills
    slideProjects();
    initImageSlider();
    slideContact();
    fadeFooter();
    
    // Initialize enhanced effects
    initEnhancedEffects();
    
    // Save dark mode preference on toggle
    document.querySelector(".dark-mode-toggle").addEventListener("click", () => {
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});