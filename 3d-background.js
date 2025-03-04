// Création de l'arrière-plan 3D interactif
;(() => {
    let scene, camera, renderer, particles, raycaster, mouse, clock
    let particleCount = 5000
    let particleSystem
    let colorTransitionSpeed = 0.005
    const targetColor = new THREE.Color()
    const currentColor = new THREE.Color()
  
    // Import THREE.js library.  This needs to be done before using THREE.  There are several ways to do this, depending on how you are including THREE.js in your project.  For example, you could use a `<script>` tag in your HTML file.
    // Assuming THREE is available globally after including the library.
  
    function init() {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 50
  
      renderer = new THREE.WebGLRenderer({ alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      document.body.insertBefore(renderer.domElement, document.body.firstChild)
  
      raycaster = new THREE.Raycaster()
      mouse = new THREE.Vector2()
      clock = new THREE.Clock()
  
      createParticles()
      addEventListeners()
  
      animate()
    }
  
    function createParticles() {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)
  
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100
        positions[i + 1] = (Math.random() - 0.5) * 100
        positions[i + 2] = (Math.random() - 0.5) * 100
  
        colors[i] = Math.random()
        colors[i + 1] = Math.random()
        colors[i + 2] = Math.random()
  
        sizes[i / 3] = Math.random() * 2
      }
  
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))
  
      const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: true,
      })
  
      particleSystem = new THREE.Points(geometry, material)
      scene.add(particleSystem)
    }
  
    function addEventListeners() {
      window.addEventListener("resize", onWindowResize, false)
      document.addEventListener("mousemove", onMouseMove, false)
      window.addEventListener("scroll", onScroll, false)
    }
  
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  
    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
  
    function onScroll() {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollFraction = scrollY / maxScroll
  
      camera.position.y = -scrollFraction * 20
  
      // Transition de couleur basée sur le défilement
      const hue = scrollFraction * 0.5 // Change la teinte de 0 à 0.5 (rouge à bleu)
      targetColor.setHSL(hue, 1, 0.5)
    }
  
    function animate() {
      requestAnimationFrame(animate)
  
      const time = clock.getElapsedTime() * 0.5
  
      // Animation des particules
      const positions = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + positions[i]) * 0.01
        positions[i + 1] += Math.cos(time + positions[i + 1]) * 0.01
        positions[i + 2] += Math.sin(time + positions[i + 2]) * 0.01
      }
      particleSystem.geometry.attributes.position.needsUpdate = true
  
      // Interaction avec la souris
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(particleSystem)
      if (intersects.length > 0) {
        const intersection = intersects[0]
        const particleIndex = intersection.index
        positions[particleIndex * 3] += (mouse.x - positions[particleIndex * 3]) * 0.1
        positions[particleIndex * 3 + 1] += (mouse.y - positions[particleIndex * 3 + 1]) * 0.1
      }
  
      // Transition de couleur
      currentColor.lerp(targetColor, colorTransitionSpeed)
      const colors = particleSystem.geometry.attributes.color.array
      for (let i = 0; i < colors.length; i += 3) {
        colors[i] = currentColor.r
        colors[i + 1] = currentColor.g
        colors[i + 2] = currentColor.b
      }
      particleSystem.geometry.attributes.color.needsUpdate = true
  
      renderer.render(scene, camera)
    }
  
    // Optimisations pour mobile
    function mobileOptimize() {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      if (isMobile) {
        particleCount = 2000 // Réduire le nombre de particules
        colorTransitionSpeed = 0.01 // Ralentir la transition de couleur
      }
    }
  
    mobileOptimize()
    init()
  })()
  
  