// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const navLinks = document.querySelector(".nav-links")
  
    if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active")
  
        // Toggle animation for the hamburger icon
        const spans = this.querySelectorAll("span")
        spans.forEach((span) => span.classList.toggle("active"))
  
        // If the menu is open, add a class to the toggle button
        this.classList.toggle("active")
  
        // If the menu is open, prevent scrolling on the body
        document.body.classList.toggle("menu-open")
      })
    }
  
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
          mobileMenuToggle.classList.remove("active")
          document.body.classList.remove("menu-open")
  
          // Reset hamburger icon
          const spans = mobileMenuToggle.querySelectorAll("span")
          spans.forEach((span) => span.classList.remove("active"))
        }
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          // Get the height of the fixed header
          const headerHeight = document.querySelector("header").offsetHeight
  
          // Calculate the position to scroll to
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          // Scroll to the target
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll(".skill-progress")
  
    // Create an Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If the element is in view, animate it
            entry.target.style.width = entry.target.getAttribute("style").split(":")[1]
            // Unobserve the element after animating it
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )
  
    // Observe each skill bar
    skillBars.forEach((bar) => {
      // Initially set width to 0
      const width = bar.style.width
      bar.style.width = "0"
      // Then observe for animation
      observer.observe(bar)
    })
  
    // Form submission handling
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Get form data
        const formData = new FormData(this)
        const formDataObj = {}
        formData.forEach((value, key) => {
          formDataObj[key] = value
        })
  
        // Here you would typically send the data to a server
        // For this example, we'll just log it and show a success message
        console.log("Form data:", formDataObj)
  
        // Show success message
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.textContent = "Votre message a été envoyé avec succès!"
        successMessage.style.backgroundColor = "var(--success-color)"
        successMessage.style.color = "white"
        successMessage.style.padding = "15px"
        successMessage.style.borderRadius = "var(--border-radius)"
        successMessage.style.marginTop = "20px"
  
        // Add the message to the form
        contactForm.appendChild(successMessage)
  
        // Reset the form
        contactForm.reset()
  
        // Remove the message after 5 seconds
        setTimeout(() => {
          successMessage.remove()
        }, 5000)
      })
    }
  
    // Add scroll event listener to change header style on scroll
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header")
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Add CSS for scrolled header
    const style = document.createElement("style")
    style.textContent = `
      header.scrolled {
        padding: 10px 0;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
      
      body.menu-open {
        overflow: hidden;
      }
    `
    document.head.appendChild(style)
  })
  
  