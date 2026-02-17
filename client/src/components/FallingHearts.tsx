import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export function FallingHearts() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const heart = confetti.shapeFromPath({
      path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,42 -18,58 -151,191 -133,-133 -151,-149 -151,-191 0,-42 33,-75 76,-75 38,0 57,18 75,56z',
    });

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: (Math.random() * skew) - 0.2
        },
        colors: ['#ff6b6b', '#ff8787', '#ffa8a8', '#fcc2d7'],
        shapes: [heart],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.8, 1.4),
        drift: randomInRange(-0.4, 0.4)
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    return () => {
      confetti.reset();
    };
  }, []);

  return null; // Canvas is handled by the library globally or we could scope it, but global is fine for this effect
}
