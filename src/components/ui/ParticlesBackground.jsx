"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set up Scene, Camera, WebGLRenderer
    const scene = new THREE.Scene();
    
    // Using PerspectiveCamera with: FOV = 60, Aspect Ratio, Near = 1, Far = 1500
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1500);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create dynamic star circle texture
    const createCircleTexture = () => {
      const textureCanvas = document.createElement('canvas');
      textureCanvas.width = 16;
      textureCanvas.height = 16;
      const ctx = textureCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(textureCanvas);
    };

    // Initialize Star Field Particles
    const starCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Star positions: X and Y run from -600 to 600, Z runs from -1000 to 1000
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = Math.random() * 2000 - 1000;

      // Color variation: mostly pure white, some soft cyan/blue, some warm yellow/orange
      const randColor = Math.random();
      let r = 1.0, g = 1.0, b = 1.0;
      if (randColor > 0.85) {
        // Cyan-ish star
        r = 0.8; g = 0.95; b = 1.0;
      } else if (randColor > 0.7) {
        // Soft yellow/orange star
        r = 1.0; g = 0.9; b = 0.75;
      }

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3.5,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: createCircleTexture(),
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // Track scroll velocity for "warp speed" effect
    const speedBoost = {
      current: 0,
      target: 0,
    };
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Map scroll speed to target speed boost
      speedBoost.target = Math.min(speedBoost.target + delta * 0.12, 45);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track Mouse positions for parallax
    const mouse = { x: 0, y: 0 };
    const mouseTarget = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates from -1 to 1
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Animation Loop
    let animationFrameId;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Speed boost interpolation & decay
      speedBoost.current += (speedBoost.target - speedBoost.current) * 0.08;
      speedBoost.target *= 0.93; // Gradually damp the boost when scroll stops

      // Update positions
      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < starCount; i++) {
        const zIdx = i * 3 + 2;

        // Base speed is index-dependent to create layered depth, similar to original CodePen
        const baseSpeed = 0.5 + (i % 8) * 0.15;
        const currentSpeed = baseSpeed + speedBoost.current * 1.5;

        posArray[zIdx] += currentSpeed;

        // Wrap around when star goes past camera
        if (posArray[zIdx] > 10) {
          posArray[zIdx] = -1000;
          // Give it a new random X and Y so star field looks organic
          posArray[i * 3] = (Math.random() - 0.5) * 1200;
          posArray[i * 3 + 1] = (Math.random() - 0.5) * 1200;
        }
      }
      posAttr.needsUpdate = true;

      // Mouse Parallax interpolation
      mouseTarget.x += (mouse.x - mouseTarget.x) * 0.05;
      mouseTarget.y += (mouse.y - mouseTarget.y) * 0.05;

      // Move camera slightly
      camera.position.x = mouseTarget.x * 30;
      camera.position.y = mouseTarget.y * 30;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup Resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      geometry.dispose();
      material.dispose();
      if (material.map) material.map.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ contain: 'strict' }}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
