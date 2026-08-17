import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import DecryptedText from './ui/DecryptedText'
import {
  SiJavascript, SiPython, SiPostgresql, SiCplusplus,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTailwindcss,
  SiMongodb, SiSupabase, SiNumpy, SiPandas, SiScikitlearn, SiPytorch,
  SiPostman, SiHuggingface, SiGithub, SiLangchain, SiDocker, SiFastapi
} from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa6'

/* ── categories as "planets" on separate orbits ── */
const categories = [
  {
    id: 'languages',
    label: 'Languages',
    color: '#5DCAA5',
    orbitR: 5.5,
    speed: 0.12,
    skills: [
      { name: 'JavaScript', icon: SiJavascript, repo: 'https://github.com/tc39/ecma262' },
      { name: 'Python', icon: SiPython, repo: 'https://github.com/python/cpython' },
      { name: 'SQL', icon: SiPostgresql },
      { name: 'C++', icon: SiCplusplus },
    ],
  },
  {
    id: 'frontend',
    label: 'Development',
    color: '#AFA9EC',
    orbitR: 8.5,
    speed: 0.09,
    skills: [
      { name: 'React', icon: SiReact, repo: 'https://github.com/facebook/react' },
      { name: 'Next.js', icon: SiNextdotjs, repo: 'https://github.com/vercel/next.js' },
      { name: 'Node.js', icon: SiNodedotjs, repo: 'https://github.com/nodejs/node' },
      { name: 'Express', icon: SiExpress, repo: 'https://github.com/expressjs/express' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, repo: 'https://github.com/tailwindlabs/tailwindcss' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    color: '#F0997B',
    orbitR: 11.5,
    speed: 0.07,
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, repo: 'https://github.com/postgres/postgres' },
      { name: 'MongoDB', icon: SiMongodb, repo: 'https://github.com/mongodb/mongo' },
      { name: 'Supabase', icon: SiSupabase, repo: 'https://github.com/supabase/supabase' },
    ],
  },
  {
    id: 'datascience',
    label: 'Data Science',
    color: '#85B7EB',
    orbitR: 14.5,
    speed: 0.05,
    skills: [
      { name: 'NumPy', icon: SiNumpy, repo: 'https://github.com/numpy/numpy' },
      { name: 'Pandas', icon: SiPandas, repo: 'https://github.com/pandas-dev/pandas' },
      { name: 'scikit-learn', icon: SiScikitlearn, repo: 'https://github.com/scikit-learn/scikit-learn' },
      { name: 'PyTorch', icon: SiPytorch, repo: 'https://github.com/pytorch/pytorch' },
      { name: 'LangChain', icon: SiLangchain, repo: 'https://github.com/langchain-ai/langchain' },
      { name: 'ChromaDB', icon: FaDatabase, repo: 'https://github.com/chroma-core/chroma' },
      { name: 'FastAPI', icon: SiFastapi, repo: 'https://github.com/fastapi/fastapi' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    color: '#FAC775',
    orbitR: 17.5,
    speed: 0.03,
    skills: [
      { name: 'Postman', icon: SiPostman },
      { name: 'HuggingFace', icon: SiHuggingface, repo: 'https://github.com/huggingface/transformers' },
      { name: 'Git & GitHub', icon: SiGithub, repo: 'https://github.com/git/git' },
      { name: 'Docker', icon: SiDocker, repo: 'https://github.com/docker' },
    ],
  },
]

export default function Skills() {
  const [active, setActive] = useState(null)
  const canvasRef = useRef(null)
  
  const activeRef = useRef(active)
  const updateSatellitesRef = useRef(null)

  useEffect(() => {
    activeRef.current = active
    if (updateSatellitesRef.current) {
      updateSatellitesRef.current(active)
    }
  }, [active])

  const activeCat = categories.find(c => c.id === active)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    
    // Initial camera placement
    camera.position.set(0, 15, 24)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
    scene.add(ambientLight)

    const sunLight = new THREE.PointLight(0xffffff, 3.2, 50, 0.6)
    scene.add(sunLight)

    // Raycaster for click/hover detection
    const raycaster = new THREE.Raycaster()
    const mouseNDC = new THREE.Vector2(-999, -999)

    // Create system group to allow drag rotation
    const systemGroup = new THREE.Group()
    scene.add(systemGroup)

    // Central Sun
    const sunGeom = new THREE.SphereGeometry(1.4, 32, 32)
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    const sunMesh = new THREE.Mesh(sunGeom, sunMat)
    systemGroup.add(sunMesh)

    // Soft glowing ring surrounding the sun
    const sunGlowGeom = new THREE.RingGeometry(1.5, 1.8, 32)
    const sunGlowMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15
    })
    const sunGlow = new THREE.Mesh(sunGlowGeom, sunGlowMat)
    sunGlow.rotation.x = Math.PI / 2
    systemGroup.add(sunGlow)

    // Helper to draw rounded rectangle on 2D texture canvases
    const drawRoundedRect = (ctx, x, y, width, height, radius) => {
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
      ctx.fill()
    }

    // Text helper with double resolution and dark background capsule for contrast
    const createTextSprite = (text, color, isPlanet = false) => {
      const textureCanvas = document.createElement('canvas')
      textureCanvas.width = 512
      textureCanvas.height = 128
      const ctx = textureCanvas.getContext('2d')
      if (ctx) {
        // Draw capsule background
        ctx.fillStyle = 'rgba(10, 14, 23, 0.88)'
        
        const w = isPlanet ? 360 : 280
        const h = isPlanet ? 72 : 54
        const x = (512 - w) / 2
        const y = (128 - h) / 2
        const r = h / 2
        
        drawRoundedRect(ctx, x, y, w, h, r)
        
        // Stroke
        ctx.strokeStyle = `${color}66`
        ctx.lineWidth = isPlanet ? 3 : 2
        ctx.stroke()

        // Write Text
        ctx.font = isPlanet ? 'bold 32px Inter, sans-serif' : 'bold 24px Inter, sans-serif'
        ctx.fillStyle = '#f8fafc' // crisp slate-50
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 1

        ctx.fillText(text.toUpperCase(), 256, 64)
      }
      const texture = new THREE.CanvasTexture(textureCanvas)
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
      const sprite = new THREE.Sprite(material)
      return sprite
    }

    // Procedural texture generator to make planets look realistic (gas bands, lava cracks, rocky craters, ocean tides)
    const generateProceduralTexture = (colorHex, type) => {
      const textureCanvas = document.createElement('canvas')
      textureCanvas.width = 512
      textureCanvas.height = 256
      const ctx = textureCanvas.getContext('2d')
      if (!ctx) return null

      // Fill background
      ctx.fillStyle = colorHex
      ctx.fillRect(0, 0, 512, 256)

      if (type === 'gas') {
        // Gaseous bands like Jupiter
        for (let y = 0; y < 256; y += 4) {
          const darkFactor = Math.sin(y * 0.1) * 0.2 + 0.2
          ctx.fillStyle = `rgba(0, 0, 0, ${darkFactor})`
          ctx.fillRect(0, y, 512, 4)

          const lightFactor = Math.cos(y * 0.07) * 0.12 + 0.12
          ctx.fillStyle = `rgba(255, 255, 255, ${lightFactor})`
          ctx.fillRect(0, y + 2, 512, 2)
        }
        // Great Red Spot-style detail
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
        ctx.beginPath()
        ctx.ellipse(320, 160, 45, 22, 0, 0, Math.PI * 2)
        ctx.fill()
      } else if (type === 'rock') {
        // Rocky crater layout
        for (let i = 0; i < 45; i++) {
          const x = Math.random() * 512
          const y = Math.random() * 256
          const r = Math.random() * 15 + 4
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.24)'
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.stroke()
        }
      } else if (type === 'molten') {
        // Lava vein cracks
        ctx.strokeStyle = 'rgba(255, 69, 0, 0.5)'
        ctx.lineWidth = 3
        for (let i = 0; i < 15; i++) {
          ctx.beginPath()
          ctx.moveTo(Math.random() * 512, Math.random() * 256)
          ctx.lineTo(Math.random() * 512, Math.random() * 256)
          ctx.lineTo(Math.random() * 512, Math.random() * 256)
          ctx.stroke()
        }
        // Glowing magma pockets
        for (let i = 0; i < 10; i++) {
          const grad = ctx.createRadialGradient(
            Math.random() * 512, Math.random() * 256, 0,
            Math.random() * 512, Math.random() * 256, Math.random() * 35 + 10
          )
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)')
          grad.addColorStop(0.5, 'rgba(255, 120, 0, 0.18)')
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
          ctx.fillStyle = grad
          ctx.fillRect(0, 0, 512, 256)
        }
      } else if (type === 'ocean') {
        // Ocean ripples & swirl clouds
        for (let i = 0; i < 12; i++) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.22)'
          ctx.beginPath()
          ctx.arc(Math.random() * 512, Math.random() * 256, Math.random() * 55 + 25, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = 'rgba(0, 0, 100, 0.15)'
        ctx.fillRect(0, 80, 512, 40)
        ctx.fillRect(0, 180, 512, 30)
      } else if (type === 'saturn') {
        // Smooth gas banding
        for (let y = 0; y < 256; y += 3) {
          const factor = Math.sin(y * 0.05) * 0.1 + 0.1
          ctx.fillStyle = `rgba(0, 0, 0, ${factor})`
          ctx.fillRect(0, y, 512, 3)
          
          const lightFactor = Math.cos(y * 0.03) * 0.08 + 0.08
          ctx.fillStyle = `rgba(255, 255, 255, ${lightFactor})`
          ctx.fillRect(0, y + 1, 512, 1)
        }
      }

      return new THREE.CanvasTexture(textureCanvas)
    }

    // Helper for orbit lines
    const createOrbitRing = (radius, color) => {
      const points = []
      const segments = 64
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2
        points.push(new THREE.Vector3(radius * Math.sin(theta), 0, radius * Math.cos(theta)))
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(points)
      const ringMat = new THREE.LineDashedMaterial({
        color: color,
        dashSize: 0.3,
        gapSize: 0.2,
        transparent: true,
        opacity: 0.22,
      })
      const line = new THREE.Line(ringGeom, ringMat)
      line.computeLineDistances()
      return line
    }

    // Populate Planets
    const planetMeshes = {}
    const planetsList = []
    const orbitalAngles = {}

    categories.forEach(cat => {
      // Create dashed orbit ring
      const ring = createOrbitRing(cat.orbitR, cat.color)
      systemGroup.add(ring)

      // Create Planet mesh
      const planetGeom = new THREE.SphereGeometry(0.65, 32, 32)
      
      const textureType = 
        cat.id === 'languages' ? 'rock' :
        cat.id === 'frontend' ? 'gas' :
        cat.id === 'databases' ? 'molten' :
        cat.id === 'datascience' ? 'ocean' : 'saturn'
        
      const texture = generateProceduralTexture(cat.color, textureType)

      const planetMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.45,
        metalness: 0.05,
        emissive: new THREE.Color(cat.color),
        emissiveIntensity: 0.12,
      })
      const planetMesh = new THREE.Mesh(planetGeom, planetMat)
      
      // Store custom variables
      planetMesh.userData = { catId: cat.id }
      orbitalAngles[cat.id] = Math.random() * Math.PI * 2 // random initial start angle

      // Add Saturn-like rings to the Tools & Platforms planet
      if (cat.id === 'tools') {
        const innerR = 0.9
        const outerR = 1.6
        const ringGeom = new THREE.RingGeometry(innerR, outerR, 32)
        
        // Ring canvas with radial gradient concentric banding
        const ringCanvas = document.createElement('canvas')
        ringCanvas.width = 128
        ringCanvas.height = 16
        const ringCtx = ringCanvas.getContext('2d')
        if (ringCtx) {
          const grad = ringCtx.createLinearGradient(0, 0, 128, 0)
          grad.addColorStop(0, 'rgba(250, 199, 117, 0)')
          grad.addColorStop(0.3, 'rgba(250, 199, 117, 0.65)')
          grad.addColorStop(0.5, 'rgba(250, 199, 117, 0.15)')
          grad.addColorStop(0.7, 'rgba(250, 199, 117, 0.7)')
          grad.addColorStop(1, 'rgba(250, 199, 117, 0)')
          ringCtx.fillStyle = grad
          ringCtx.fillRect(0, 0, 128, 16)
        }
        
        const ringTexture = new THREE.CanvasTexture(ringCanvas)
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTexture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8,
        })
        
        const saturnRing = new THREE.Mesh(ringGeom, ringMat)
        saturnRing.rotation.x = Math.PI / 2.3
        saturnRing.rotation.y = Math.PI / 8
        planetMesh.add(saturnRing)
      }

      // Add high-resolution text label
      const label = createTextSprite(cat.label, cat.color, true)
      label.position.y = 1.35
      label.scale.set(3.2, 0.8, 1)
      planetMesh.add(label)

      systemGroup.add(planetMesh)
      planetMeshes[cat.id] = planetMesh
      planetsList.push(planetMesh)
    })

    // Satellite group for orbiting skills
    const satelliteGroup = new THREE.Group()

    const updateSatellites = (activeCatId) => {
      // Clear old satellites
      while (satelliteGroup.children.length > 0) {
        const child = satelliteGroup.children[0]
        if (child.geometry) child.geometry.dispose()
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose())
          } else {
            child.material.dispose()
          }
        }
        satelliteGroup.remove(child)
      }

      if (satelliteGroup.parent) {
        satelliteGroup.parent.remove(satelliteGroup)
      }

      if (activeCatId) {
        const cat = categories.find(c => c.id === activeCatId)
        const planet = planetMeshes[activeCatId]
        if (cat && planet) {
          const skills = cat.skills
          const radius = 2.4
          const angleStep = (Math.PI * 2) / skills.length

          skills.forEach((skill, i) => {
            const angle = i * angleStep

            // Satellite node
            const satGeom = new THREE.SphereGeometry(0.24, 16, 16)
            const satMat = new THREE.MeshStandardMaterial({
              color: new THREE.Color(cat.color),
              roughness: 0.3,
              metalness: 0.1,
              emissive: new THREE.Color(cat.color),
              emissiveIntensity: 0.25,
            })
            const satMesh = new THREE.Mesh(satGeom, satMat)
            satMesh.position.set(radius * Math.sin(angle), 0, radius * Math.cos(angle))
            satelliteGroup.add(satMesh)

            // Connection line
            const linePoints = [new THREE.Vector3(0, 0, 0), satMesh.position]
            const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints)
            const lineMat = new THREE.LineBasicMaterial({
              color: cat.color,
              transparent: true,
              opacity: 0.35,
            })
            const line = new THREE.Line(lineGeom, lineMat)
            satelliteGroup.add(line)

            // High-resolution skill label
            const label = createTextSprite(skill.name, '#e2e8f0', false)
            label.position.y = 0.55
            label.scale.set(1.6, 0.4, 1)
            satMesh.add(label)
          })

          planet.add(satelliteGroup)
        }
      }
    }

    // Set callback ref to let React effect call this
    updateSatellitesRef.current = updateSatellites
    // Initial call
    updateSatellites(activeRef.current)

    // Interactive Drag controls
    let isDragging = false
    let startCoords = { x: 0, y: 0 }
    let previousMousePosition = { x: 0, y: 0 }
    const rotation = { x: 0.25, y: 0 } // initial tilts

    const onMouseDown = (e) => {
      isDragging = true
      startCoords = { x: e.clientX, y: e.clientY }
      previousMousePosition = { x: e.clientX, y: e.clientY }
    }

    const hoveredPlanetRef = { current: null }

    const onCanvasMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      
      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        }
        rotation.y += deltaMove.x * 0.005
        rotation.x += deltaMove.y * 0.003
        // Limit vertical tilt
        rotation.x = Math.max(-0.15, Math.min(Math.PI / 3.5, rotation.x))
        previousMousePosition = { x: e.clientX, y: e.clientY }
        return
      }

      // Raycasting during normal hover
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouseNDC, camera)
      const intersects = raycaster.intersectObjects(planetsList)

      if (intersects.length > 0) {
        const hit = intersects[0].object
        if (hoveredPlanetRef.current !== hit) {
          if (hoveredPlanetRef.current) {
            hoveredPlanetRef.current.material.emissiveIntensity = 0.12
          }
          hoveredPlanetRef.current = hit
          canvas.style.cursor = 'pointer'
        }
        hit.material.emissiveIntensity = 0.55
      } else {
        if (hoveredPlanetRef.current) {
          hoveredPlanetRef.current.material.emissiveIntensity = 0.12
          hoveredPlanetRef.current = null
        }
        canvas.style.cursor = 'default'
      }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onCanvasClick = (e) => {
      // Determine if drag or click (if moved less than 5px, it's a click)
      const moveDistance = Math.hypot(e.clientX - startCoords.x, e.clientY - startCoords.y)
      if (moveDistance > 6) return

      const rect = canvas.getBoundingClientRect()
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouseNDC, camera)
      const intersects = raycaster.intersectObjects(planetsList)

      if (intersects.length > 0) {
        const clickedId = intersects[0].object.userData.catId
        setActive(prev => (prev === clickedId ? null : clickedId))
      } else {
        // Clicked outside, clear
        setActive(null)
      }
    }

    canvas.addEventListener('mousedown', onMouseDown, { passive: true })
    canvas.addEventListener('mousemove', onCanvasMouseMove, { passive: true })
    canvas.addEventListener('mouseup', onMouseUp, { passive: true })
    canvas.addEventListener('mouseleave', onMouseUp, { passive: true })
    canvas.addEventListener('click', onCanvasClick, { passive: true })

    // Resize
    const handleResize = () => {
      if (!canvas.clientWidth || !canvas.clientHeight) return
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Smooth movement parameters
    const lookAtTarget = new THREE.Vector3(0, 0, 0)
    const currentLookAt = new THREE.Vector3(0, 0, 0)
    const cameraTarget = new THREE.Vector3(0, 15, 24)

    // Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const dt = Math.min(clock.getDelta(), 0.1)
      const activeCatId = activeRef.current

      // Apply drag rotations
      systemGroup.rotation.y = rotation.y
      systemGroup.rotation.x = rotation.x

      // Rotate central sun glow
      sunGlow.rotation.z += 0.005

      // Orbit Planet Meshes
      categories.forEach(cat => {
        const planet = planetMeshes[cat.id]
        if (planet) {
          const isSelected = activeCatId === cat.id
          
          // Slow down orbit when selected so it's easier to view
          const speed = isSelected ? cat.speed * 0.15 : cat.speed
          orbitalAngles[cat.id] += speed * dt

          // Update position relative to system container
          planet.position.x = cat.orbitR * Math.sin(orbitalAngles[cat.id])
          planet.position.z = cat.orbitR * Math.cos(orbitalAngles[cat.id])

          // Animate Scale
          const isHovered = hoveredPlanetRef.current === planet
          const scaleVal = isSelected ? 1.35 : (isHovered ? 1.18 : 1.0)
          planet.scale.lerp(new THREE.Vector3(scaleVal, scaleVal, scaleVal), 0.1)
        }
      })

      // Orbit Satellites
      if (activeCatId && satelliteGroup.parent) {
        satelliteGroup.rotation.y += 0.7 * dt
      }

      // Camera swoop logic
      if (activeCatId) {
        const activePlanet = planetMeshes[activeCatId]
        if (activePlanet) {
          const planetWorldPos = new THREE.Vector3()
          activePlanet.getWorldPosition(planetWorldPos)

          lookAtTarget.copy(planetWorldPos)
          
          // Position camera slightly offset from the planet in world space
          cameraTarget.copy(planetWorldPos).add(new THREE.Vector3(0, 3.2, 5.2))
        }
      } else {
        lookAtTarget.set(0, 0, 0)
        cameraTarget.set(0, 14, 22)
      }

      camera.position.lerp(cameraTarget, 0.06)
      currentLookAt.lerp(lookAtTarget, 0.06)
      camera.lookAt(currentLookAt)

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mousemove', onCanvasMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseUp)
      canvas.removeEventListener('click', onCanvasClick)

      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [])

  return (
    <section id="about" className="relative ui-section overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header with scroll reveal fade-up */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 sm:mb-12"
        >
          <p className="ui-kicker mb-2">Technical Stack</p>
          <h2 className="ui-title mb-3">
            <DecryptedText text="The Toolkit" animateOn="inViewHover" revealDirection="center" speed={55} maxIterations={12} />
          </h2>
          <div className="ui-divider"></div>
        </motion.div>

        {/* 3D Solar System Canvas - Seamless without bordering box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-8 relative w-full h-[520px] overflow-hidden"
          style={{ maxWidth: 780 }}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />
          
          {/* Controls overlay description */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none text-[10px] sm:text-xs text-slate-400/80 font-mono tracking-wider text-center select-none w-full">
            Drag to Rotate • Click Planets to Select & Focus
          </div>
        </motion.div>

        {/* Active Tech Details Card with Selection Spring */}
        <div className="max-w-2xl mx-auto mt-8">
          <AnimatePresence mode="wait">
            {activeCat && (
              <motion.article
                key={activeCat.id}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="ui-card p-6 border flex flex-col justify-between"
                style={{ borderColor: `${activeCat.color}33` }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="rounded-lg p-2 border flex items-center justify-center font-bold text-xs"
                      style={{ 
                        backgroundColor: `${activeCat.color}15`, 
                        borderColor: `${activeCat.color}30`,
                        color: activeCat.color,
                        width: '38px',
                        height: '38px'
                      }}
                    >
                      {activeCat.label.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-100">{activeCat.label}</h3>
                      <p className="text-xs text-slate-400">Selected Technology Stack</p>
                    </div>
                  </div>
                  
                  {/* Skill List with interactive repo links */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activeCat.skills.map((skill) => {
                      const Icon = skill.icon
                      return (
                        <a
                          key={skill.name}
                          href={skill.repo || '#'}
                          target={skill.repo ? "_blank" : undefined}
                          rel={skill.repo ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/40 border border-white/5 text-xs text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95 no-underline"
                          style={{ borderColor: `${activeCat.color}15` }}
                        >
                          <Icon style={{ color: activeCat.color }} className="w-4.5 h-4.5" />
                          <span>{skill.name}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-6 pt-3 border-t border-white/5">
                  Click on planets in 3D or background to control selection.
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
