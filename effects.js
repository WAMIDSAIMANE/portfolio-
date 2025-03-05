// Advanced visual effects for portfolio website
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all effects
    initParticleBackground()
    initTypingEffect()
    initScrollReveal()
    initParallaxEffect()
    initProjectsLightbox()
    initCounterAnimation()
    initCursorEffect()
  })
  
  // 1. PARTICLE BACKGROUND EFFECT
  function initParticleBackground() {
    // Create canvas element for particles
    const canvas = document.createElement("canvas")
    canvas.id = "particle-canvas"
    canvas.style.position = "absolute"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "1"
  
    // Add canvas to hero section
    const heroSection = document.querySelector(".hero")
    if (heroSection) {
      heroSection.style.position = "relative"
      heroSection.style.overflow = "hidden"
      heroSection.insertBefore(canvas, heroSection.firstChild)
  
      // Set canvas dimensions
      canvas.width = heroSection.offsetWidth
      canvas.height = heroSection.offsetHeight
  
      // Get canvas context
      const ctx = canvas.getContext("2d")
  
      // Particle properties
      const particles = []
      const particleCount = 50
      const colors = ["#4a6cf7", "#6c757d", "#f8f9fa"]
  
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
  
      // Animation function
      function animateParticles() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
  
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
  
          // Move particles
          p.x += p.speedX
          p.y += p.speedY
  
          // Bounce off edges
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
  
          // Draw particle
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.globalAlpha = p.opacity
          ctx.fill()
  
          // Draw connections between particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2))
  
            if (distance < 100) {
              ctx.beginPath()
              ctx.strokeStyle = p.color
              ctx.globalAlpha = 0.2 * (1 - distance / 100)
              ctx.lineWidth = 1
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
            }
          }
        }
  
        // Request next frame
        requestAnimationFrame(animateParticles)
      }
  
      // Start animation
      animateParticles()
  
      // Resize canvas on window resize
      window.addEventListener("resize", () => {
        canvas.width = heroSection.offsetWidth
        canvas.height = heroSection.offsetHeight
      })
    }
  }
  
  // 2. TYPING EFFECT
  function initTypingEffect() {
    const heroTitle = document.querySelector(".hero h2")
    if (heroTitle) {
      const originalText = heroTitle.innerHTML
      const highlightSpan = heroTitle.querySelector(".highlight")
      const highlightText = highlightSpan ? highlightSpan.textContent : ""
  
      // Create new elements for typing effect
      const staticPart = document.createElement("span")
      staticPart.textContent = "Bonjour, je suis "
  
      const typingSpan = document.createElement("span")
      typingSpan.className = "typing highlight"
  
      // Replace original content
      heroTitle.innerHTML = ""
      heroTitle.appendChild(staticPart)
      heroTitle.appendChild(typingSpan)
  
      // Typing effect function
      const roles = [highlightText || "Votre Nom", "Développeur Web", "Designer", "Freelance"]
      let roleIndex = 0
      let charIndex = 0
      let isDeleting = false
      let typingSpeed = 150
  
      function typeText() {
        const currentRole = roles[roleIndex]
  
        if (isDeleting) {
          // Deleting text
          typingSpan.textContent = currentRole.substring(0, charIndex - 1)
          charIndex--
          typingSpeed = 50
        } else {
          // Typing text
          typingSpan.textContent = currentRole.substring(0, charIndex + 1)
          charIndex++
          typingSpeed = 150
        }
  
        // Handle typing state
        if (!isDeleting && charIndex === currentRole.length) {
          // Finished typing, pause before deleting
          isDeleting = true
          typingSpeed = 1500
        } else if (isDeleting && charIndex === 0) {
          // Finished deleting, move to next role
          isDeleting = false
          roleIndex = (roleIndex + 1) % roles.length
        }
  
        // Continue typing
        setTimeout(typeText, typingSpeed)
      }
  
      // Start typing effect
      setTimeout(typeText, 1000)
  
      // Add cursor style
      const style = document.createElement("style")
      style.textContent = `
        .typing::after {
          content: '|';
          animation: blink 0.7s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }
  }
  
  // 3. SCROLL REVEAL ANIMATION
  function initScrollReveal() {
    // Elements to animate
    const elements = [
      ...document.querySelectorAll(".project-card"),
      ...document.querySelectorAll(".skills-category"),
      ...document.querySelectorAll(".contact-info, .contact-form"),
    ]
  
    // Create observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )
  
    // Observe elements
    elements.forEach((element, index) => {
      // Add initial style
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"
      element.style.transition = `opacity 0.6s ease, transform 0.6s ease`
      element.style.transitionDelay = `${index * 0.1}s`
  
      // Observe element
      observer.observe(element)
    })
  
    // Add CSS for revealed elements
    const style = document.createElement("style")
    style.textContent = `
      .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `
    document.head.appendChild(style)
  }
  
  // 4. PARALLAX EFFECT
  function initParallaxEffect() {
    const parallaxElements = [
      { element: document.querySelector(".hero"), speed: 0.5 },
      { element: document.querySelector(".projects"), speed: 0.3 },
      { element: document.querySelector(".skills"), speed: 0.2 },
    ]
  
    // Filter out null elements
    const validElements = parallaxElements.filter((item) => item.element !== null)
  
    if (validElements.length > 0) {
      // Handle scroll event
      window.addEventListener("scroll", () => {
        const scrollPosition = window.pageYOffset
  
        validElements.forEach((item) => {
          const offset = scrollPosition * item.speed
          item.element.style.backgroundPosition = `50% ${offset}px`
        })
      })
  
      // Add background styles
      validElements.forEach((item) => {
        item.element.style.backgroundSize = "cover"
        item.element.style.backgroundAttachment = "fixed"
      })
    }
  }
  
  // 5. PROJECTS LIGHTBOX
  function initProjectsLightbox() {
    const projectImages = document.querySelectorAll(".project-image img")
  
    if (projectImages.length > 0) {
      // Create lightbox elements
      const lightbox = document.createElement("div")
      lightbox.className = "lightbox"
      lightbox.style.display = "none"
      lightbox.style.position = "fixed"
      lightbox.style.top = "0"
      lightbox.style.left = "0"
      lightbox.style.width = "100%"
      lightbox.style.height = "100%"
      lightbox.style.backgroundColor = "rgba(0, 0, 0, 0.9)"
      lightbox.style.zIndex = "9999"
      lightbox.style.display = "flex"
      lightbox.style.alignItems = "center"
      lightbox.style.justifyContent = "center"
      lightbox.style.opacity = "0"
      lightbox.style.pointerEvents = "none"
      lightbox.style.transition = "opacity 0.3s ease"
  
      const lightboxImg = document.createElement("img")
      lightboxImg.style.maxWidth = "90%"
      lightboxImg.style.maxHeight = "90%"
      lightboxImg.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.5)"
      lightboxImg.style.transform = "scale(0.9)"
      lightboxImg.style.transition = "transform 0.3s ease"
  
      const closeBtn = document.createElement("button")
      closeBtn.textContent = "×"
      closeBtn.style.position = "absolute"
      closeBtn.style.top = "20px"
      closeBtn.style.right = "20px"
      closeBtn.style.fontSize = "30px"
      closeBtn.style.color = "white"
      closeBtn.style.background = "none"
      closeBtn.style.border = "none"
      closeBtn.style.cursor = "pointer"
  
      // Add elements to DOM
      lightbox.appendChild(lightboxImg)
      lightbox.appendChild(closeBtn)
      document.body.appendChild(lightbox)
  
      // Add click event to project images
      projectImages.forEach((img) => {
        img.style.cursor = "pointer"
  
        img.addEventListener("click", function () {
          lightboxImg.src = this.src
          lightbox.style.opacity = "1"
          lightbox.style.pointerEvents = "auto"
          lightboxImg.style.transform = "scale(1)"
        })
      })
  
      // Close lightbox on button click
      closeBtn.addEventListener("click", () => {
        lightbox.style.opacity = "0"
        lightbox.style.pointerEvents = "none"
        lightboxImg.style.transform = "scale(0.9)"
      })
  
      // Close lightbox on background click
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          lightbox.style.opacity = "0"
          lightbox.style.pointerEvents = "none"
          lightboxImg.style.transform = "scale(0.9)"
        }
      })
    }
  }
  

  
      // Insert stats section before skills section
      skillsSection.parentNode.insertBefore(statsSection, skillsSection)
  
      // Add styles for stats section
      const style = document.createElement("style")
      style.textContent = `
        .stats-section {
          background-color: var(--primary-color);
          color: white;
          padding: 60px 0;
        }
        
        .stats-container {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          text-align: center;
        }
        
        .stat-item {
          padding: 20px;
        }
        
        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        
        .stat-title {
          font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
          .stat-item {
            width: 50%;
          }
        }
        
        @media (max-width: 576px) {
          .stat-item {
            width: 100%;
          }
        }
      `
      document.head.appendChild(style)
  
      // Animate counter
      const statNumbers = document.querySelectorAll(".stat-number")
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target
              const count = Number.parseInt(target.getAttribute("data-count"))
              let current = 0
              const duration = 2000 // ms
              const increment = count / (duration / 16)
  
              const timer = setInterval(() => {
                current += increment
                if (current >= count) {
                  target.textContent = count
                  clearInterval(timer)
                } else {
                  target.textContent = Math.floor(current)
                }
              }, 16)
  
              observer.unobserve(target)
            }
          })
        },
        { threshold: 0.5 },
      )
  
      statNumbers.forEach((number) => {
        observer.observe(number)
      })
    
  
  
  // 7. CUSTOM CURSOR EFFECT
  function initCursorEffect() {
    // Create custom cursor elements
    const cursor = document.createElement("div")
    cursor.className = "custom-cursor"
  
    const cursorDot = document.createElement("div")
    cursorDot.className = "cursor-dot"
  
    const cursorCircle = document.createElement("div")
    cursorCircle.className = "cursor-circle"
  
    // Add to DOM
    cursor.appendChild(cursorDot)
    cursor.appendChild(cursorCircle)
    document.body.appendChild(cursor)
  
    // Add styles
    const style = document.createElement("style")
    style.textContent = `
      .custom-cursor {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
      }
      
      .cursor-dot {
        position: absolute;
        top: -4px;
        left: -4px;
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
      
      .cursor-circle {
        position: absolute;
        top: -20px;
        left: -20px;
        width: 40px;
        height: 40px;
        border: 2px solid white;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.5;
        transition: transform 0.2s ease, opacity 0.2s ease;
      }
      
      a:hover ~ .custom-cursor .cursor-circle,
      button:hover ~ .custom-cursor .cursor-circle,
      .project-card:hover ~ .custom-cursor .cursor-circle {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0.8;
      }
      
      body:has(a:hover) .cursor-circle,
      body:has(button:hover) .cursor-circle,
      body:has(.project-card:hover) .cursor-circle {
        transform: translate(-50%, -50%) scale(1.5);
        opacity: 0.8;
      }
      
      @media (max-width: 768px) {
        .custom-cursor {
          display: none;
        }
      }
    `
    document.head.appendChild(style)
  
    // Update cursor position
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    })
  
    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0"
    })
  
    // Show cursor when entering window
    document.addEventListener("mouseenter", () => {
      cursor.style.opacity = "1"
    })
  }
  
  