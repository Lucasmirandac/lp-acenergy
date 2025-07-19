/**
 * ACENERGY Website - Enhanced UI/UX JavaScript
 * Optimized for performance, accessibility, and modern best practices
 */

// Performance optimization: Use passive listeners and debouncing
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Utility function for safe DOM queries
const safeQuerySelector = (selector, parent = document) => {
  try {
    return parent.querySelector(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return null;
  }
};

const safeQuerySelectorAll = (selector, parent = document) => {
  try {
    return parent.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`, error);
    return [];
  }
};

// Main initialization
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features with error handling
  try {
    initializeScrollAnimations();
    initializeNavbarEffects();
    initializeSmoothScrolling();
    initializeContactEnhancements();
    initializeLoadingAnimations();
    initializeMobileMenu();
    initializeParallaxEffect();
    initializeServiceCards();
    initializeCTAEnhancements();
  } catch (error) {
    console.error("Error initializing features:", error);
  }
});

/**
 * Scroll Animations with Intersection Observer
 */
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const elementsToAnimate = safeQuerySelectorAll(
    ".section-padding, .service-item, .tech-item, .audience-section ul li, .commitment-section ul li"
  );

  elementsToAnimate.forEach((el) => {
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease-out";
      observer.observe(el);
    }
  });
}

/**
 * Enhanced Navbar with Performance Optimizations
 */
function initializeNavbarEffects() {
  const navbar = safeQuerySelector(".navbar");
  if (!navbar) return;

  let lastScrollTop = 0;
  let ticking = false;

  const updateNavbar = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove background blur based on scroll
    if (scrollTop > 50) {
      navbar.style.background = "rgba(44, 62, 80, 0.95)";
      navbar.style.backdropFilter = "blur(15px)";
    } else {
      navbar.style.background =
        "linear-gradient(135deg, var(--dark-color) 0%, #34495e 100%)";
      navbar.style.backdropFilter = "blur(10px)";
    }

    // Hide/show navbar on scroll with throttling
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
    ticking = false;
  };

  const throttledUpdateNavbar = () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  };

  window.addEventListener("scroll", throttledUpdateNavbar, { passive: true });
}

/**
 * Smooth Scrolling with Accessibility Support
 */
function initializeSmoothScrolling() {
  const navLinks = safeQuerySelectorAll('nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = safeQuerySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;

        // Announce to screen readers
        const announcement = document.createElement("div");
        announcement.setAttribute("aria-live", "polite");
        announcement.setAttribute(
          "aria-label",
          `Navegando para ${
            targetSection.getAttribute("aria-labelledby") || "seção"
          }`
        );
        announcement.style.position = "absolute";
        announcement.style.left = "-10000px";
        document.body.appendChild(announcement);

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Clean up announcement
        setTimeout(() => {
          document.body.removeChild(announcement);
        }, 1000);
      }
    });
  });
}

/**
 * Contact Section Enhancements
 */
function initializeContactEnhancements() {
  const contactLinks = safeQuerySelectorAll(".contact-section a");

  contactLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    // Keyboard navigation support
    link.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });
}

/**
 * Loading Animations with Performance
 */
function initializeLoadingAnimations() {
  document.body.classList.add("loading");

  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
    }, 500);
  });
}

/**
 * Parallax Effect with Performance Optimization
 */
function initializeParallaxEffect() {
  const heroSection = safeQuerySelector(".hero-section");
  if (!heroSection) return;

  let ticking = false;

  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    heroSection.style.transform = `translateY(${rate}px)`;
    ticking = false;
  };

  const throttledParallax = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener("scroll", throttledParallax, { passive: true });
}

/**
 * Interactive Service Cards
 */
function initializeServiceCards() {
  const serviceCards = safeQuerySelectorAll(".service-item");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    });

    // Keyboard navigation
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });
}

/**
 * Enhanced CTA Buttons with Ripple Effect
 */
function initializeCTAEnhancements() {
  const ctaButtons = safeQuerySelectorAll(".btn");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");
      ripple.setAttribute("aria-hidden", "true");

      this.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });

    // Keyboard support
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });
}

/**
 * Mobile Menu with Enhanced Accessibility
 */
function initializeMobileMenu() {
  const mobileToggle = safeQuerySelector(".mobile-menu-toggle");
  const navMenu = safeQuerySelector(".nav-menu");
  const body = document.body;

  if (!mobileToggle || !navMenu) return;

  const toggleMenu = (isOpen) => {
    navMenu.classList.toggle("active", isOpen);
    mobileToggle.classList.toggle("active", isOpen);
    body.classList.toggle("menu-open", isOpen);

    // Update ARIA attributes
    mobileToggle.setAttribute("aria-expanded", isOpen.toString());

    // Animate menu items
    const menuItems = navMenu.querySelectorAll("ul li");
    menuItems.forEach((item, index) => {
      if (isOpen) {
        item.style.transitionDelay = `${0.1 + index * 0.1}s`;
      } else {
        item.style.transitionDelay = "0s";
      }
    });

    // Announce to screen readers
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute(
      "aria-label",
      isOpen ? "Menu aberto" : "Menu fechado"
    );
    announcement.style.position = "absolute";
    announcement.style.left = "-10000px";
    document.body.appendChild(announcement);

    setTimeout(() => {
      if (announcement.parentNode) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  // Toggle button click
  mobileToggle.addEventListener("click", function () {
    const isCurrentlyOpen = navMenu.classList.contains("active");
    toggleMenu(!isCurrentlyOpen);
  });

  // Close menu when clicking on a link
  const menuLinks = navMenu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      toggleMenu(false);
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      toggleMenu(false);
    }
  });

  // Prevent body scroll when menu is open
  const preventScroll = (e) => {
    if (body.classList.contains("menu-open")) {
      e.preventDefault();
    }
  };

  document.addEventListener("touchmove", preventScroll, { passive: false });
}

/**
 * Performance Monitoring
 */
function initializePerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        if (navigation) {
          console.log(
            "Page Load Time:",
            navigation.loadEventEnd - navigation.loadEventStart,
            "ms"
          );
        }
      }, 0);
    });
  }
}

/**
 * Error Boundary
 */
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
  // In production, you might want to send this to an error tracking service
});

// Initialize performance monitoring
initializePerformanceMonitoring();

// Add CSS for ripple effect and loading states
const style = document.createElement("style");
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .loading {
    opacity: 0;
  }
  
  .loaded {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }

  .fade-in {
    animation: fadeInUp 0.8s ease-out;
  }

  /* Focus indicators for better accessibility */
  .btn:focus-visible,
  .navbar nav.nav-menu ul li a:focus-visible,
  .contact-section a:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .ripple {
      animation: none;
    }
    
    .fade-in {
      animation: none;
    }
  }
`;
document.head.appendChild(style);
