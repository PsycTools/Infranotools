import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const particles: { x: number; y: number; radius: number; color: string; velocity: { x: number; y: number } }[] = [];
    
    const colors = ['rgba(255, 0, 0, 0.5)', 'rgba(179, 0, 0, 0.5)', 'rgba(100, 0, 0, 0.3)'];

    const createParticle = () => {
      return {
        x: Math.random() * w,
        y: h + Math.random() * 100,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 1,
          y: Math.random() * -1 - 0.5,
        },
      };
    };

    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      
      particles.forEach((p, index) => {
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.radius -= 0.01; // shrink slowly

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Reset particle if it goes off screen or shrinks too much
        if (p.y < -10 || p.radius <= 0) {
          particles[index] = createParticle();
        }
      });
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40" />;
};

export default ParticleBackground;