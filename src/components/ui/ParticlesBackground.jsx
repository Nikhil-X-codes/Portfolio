"use client";
import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationFrameId;
    let particles = [];
    const particleCount = 40;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse interactive coordinates
    const mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1.2;
        
        // Highly saturated themed colors for outer glow
        const rand = Math.random();
        if (rand > 0.85) {
          this.colorGlow = 'rgba(6, 182, 212, 0.8)'; // Cyan spark glow
        } else if (rand > 0.7) {
          this.colorGlow = 'rgba(249, 115, 22, 0.8)'; // Orange spark glow
        } else {
          this.colorGlow = 'rgba(168, 85, 247, 0.6)'; // Purple/White glow
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries smoothly
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;

        // Mouse push/repel effect
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.8;
            this.y += Math.sin(angle) * force * 1.8;
          }
        }
      }

      draw() {
        // Draw a glowing radial gradient spark with a bright white hot core
        const glowRadius = this.radius * 2.5;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, glowRadius
        );
        gradient.addColorStop(0, '#ffffff'); // bright core
        gradient.addColorStop(0.2, '#ffffff'); // core extend
        gradient.addColorStop(0.5, this.colorGlow); // colorful outer spark glow
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // fade out

        ctx.beginPath();
        ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Connect particles with fading line links
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.hypot(dx, dy);
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.12;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enable WebGL-style additive blending for extra shine and sparks
      ctx.globalCompositeOperation = 'lighter';
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
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
