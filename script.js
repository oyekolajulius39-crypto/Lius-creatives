// ===================================
// LIUS CREATIVE - INTERACTIVE FEATURES
// ===================================

// === NAVIGATION ===
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  const navLinksItems = document.querySelectorAll('.nav-links a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', function() {
      if (mobileToggle) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinksItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // === TESTIMONIAL SLIDER ===
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonials = document.querySelectorAll('.testimonial');
  const sliderDots = document.querySelectorAll('.slider-dot');
  
  if (testimonials.length > 0) {
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
      // Remove active class from all
      testimonials.forEach(t => t.classList.remove('active'));
      sliderDots.forEach(d => d.classList.remove('active'));
      
      // Add active class to current
      testimonials[index].classList.add('active');
      if (sliderDots[index]) {
        sliderDots[index].classList.add('active');
      }
      
      // Move track
      if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
      }
    }
    
    // Dot navigation
    sliderDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
      });
    });
    
    // Auto-advance testimonials
    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }
    
    // Show first testimonial
    showTestimonial(0);
    
    // Auto-advance every 5 seconds
    setInterval(nextTestimonial, 5000);
  }
  
  // === SCROLL REVEAL ANIMATIONS ===
  const revealElements = document.querySelectorAll('.reveal');
  
  function reveal() {
    revealElements.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  if (revealElements.length > 0) {
    window.addEventListener('scroll', reveal);
    reveal(); // Check on load
  }
  
  // === PORTFOLIO FILTER ===
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          // Trigger animation
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
  
  // === CONTACT FORM ===
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const service = formData.get('service');
      const message = formData.get('message');
      
      // Create WhatsApp message
      const whatsappMessage = `Hello Lius Creative!%0A%0AName: ${name}%0AEmail: ${email}%0AService Needed: ${service}%0A%0AMessage: ${message}`;
      
      // Redirect to WhatsApp
      window.open(`https://wa.me/2348018728787?text=${whatsappMessage}`, '_blank');
      
      // Show success message
      alert('Redirecting you to WhatsApp to complete your message!');
      
      // Reset form
      this.reset();
    });
  }
  
  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
  
  // === BUTTON RIPPLE EFFECT ===
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // === LAZY LOADING FOR IMAGES ===
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // === COUNTER ANIMATION (for stats if needed) ===
  function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
  
  // Observe counters if they exist
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }
  
  // === PERFORMANCE: Reduce motion for users who prefer it ===
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition', 'none');
  }
  
});

// === PAGE LOAD ANIMATION ===
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// === SERVICE WORKER (Optional - for PWA capabilities) ===
if ('serviceWorker' in navigator) {
  // Uncomment to enable service worker
  // navigator.serviceWorker.register('/sw.js');
}
