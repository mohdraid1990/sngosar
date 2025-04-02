// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  mobileMenuBtn.innerHTML = mainNav.classList.contains("active") ? "✕" : "☰";
});

// Close mobile menu when clicking on a link
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      mainNav.classList.remove("active");
      mobileMenuBtn.innerHTML = "☰";
    }
  });
});

// ======================================================= ///
// backToTop
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  
  if (window.pageYOffset > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }

  
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  
  const maxBorderWidth = 13; 
  const borderWidth = (scrollPercent / 100) * maxBorderWidth;

  
  backToTop.style.borderWidth = `${borderWidth}px`;
});


backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


// ======================================================= ///
// counter
const counters = document.querySelectorAll(".counter-number");
const speed = 100; 
const delayBetweenCounters = 10; 

function animateCounters(startFrom = 0, direction = "up") {
  let delay = 0;
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

  counters.forEach((counter, index) => {
    setTimeout(() => {
      const target = +counter.getAttribute("data-count");
      let count = direction === "up" ? startFrom : target;
      const increment = target / speed;

      const updateCount = () => {
        if (direction === "up" && count < target) {
          count += increment;
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else if (direction === "down" && count > startFrom) {
          count -= increment;
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = direction === "up" ? target : startFrom;
          counter.style.animation = "countUp 0.5s ease-out";
        }
      };

      updateCount();
    }, delay);

    delay += delayBetweenCounters;
  });
}

const counterSection = document.querySelector(".counter-section");
let hasAnimated = false;

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      animateCounters(0, "up"); 
      hasAnimated = true;
    } else if (!entries[0].isIntersecting && hasAnimated) {
      animateCounters(0, "down"); 
      hasAnimated = false;
    }
  },
  { threshold: 0.1 }
);

observer.observe(counterSection);


const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes countUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);
// ======================================================= ///


// Licenses slider
const licensesSlider = document.getElementById("licensesSlider");
const licensesNav = document.getElementById("licensesNav");
const licenseButtons = licensesNav.querySelectorAll("button");
let currentLicense = 0;

function showLicense(index) {
  licensesSlider.scrollTo({
    left: licensesSlider.offsetWidth * index,
    behavior: "smooth",
  });

  licenseButtons.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  currentLicense = index;
}

licenseButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    showLicense(index);
  });
});
// ======================================================= ///

// Auto-rotate licenses
setInterval(() => {
  currentLicense = (currentLicense + 1) % licenseButtons.length;
  showLicense(currentLicense);
}, 5000);
// ======================================================= ///

// Lightbox functionality
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementById("closeBtn");
const licenseImages = document.querySelectorAll(".license-img");

licenseImages.forEach(img => {
  img.addEventListener("click", function() {
    lightbox.style.display = "block";
    lightboxImg.src = this.src;
    captionText.innerHTML = this.alt;
  });
});

closeBtn.addEventListener("click", function() {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", function(e) {
  if (e.target !== lightboxImg && e.target !== captionText) {
    lightbox.style.display = "none";
  }
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    lightbox.style.display = "none";
  }
});

// ======================================================= ///



document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".feature-card, .team-member, .news-card");

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 } 
  );

  cards.forEach((card) => {
    card.classList.add("fade-in-card");
    cardObserver.observe(card);
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.pageYOffset > 50) {
    header.style.backgroundColor = "#8F597FFF"; 
  } else {
    header.style.backgroundColor = "#537797"; 
  }
});

// ======================================================= ///



