// --- Typing Animation ---
const text = "Développeur full-stack, créatif & passionné par la tech.";
const typingElement = document.getElementById("typewriter");
let i = 0;

function typeWriter() {
  if (i < text.length) {
    typingElement.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50); // Typing speed
  }
}

// Start typing animation slightly after load
setTimeout(typeWriter, 1000);


// --- Intersection Observer for Scroll Animations ---
// Select all elements that have the hidden-element class
const hiddenElements = document.querySelectorAll('.hidden-element');

// Options for the observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15 // Trigger when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // If element is in view
    if (entry.isIntersecting) {
      entry.target.classList.add('show-element');
      // Optionally stop observing once it's shown:
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe each hidden element
hiddenElements.forEach(el => observer.observe(el));


// --- Simple Navbar Sticky Effect ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(11, 15, 25, 0.95)';
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
  } else {
    navbar.style.background = 'rgba(11, 15, 25, 0.8)';
    navbar.style.boxShadow = 'none';
  }
});
