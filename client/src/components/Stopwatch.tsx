import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Stopwatch() {
  const [hours, setHours] = useState(0);
  
  // Animation duration in ms
  const ANIMATION_DURATION = 3000;
  const TARGET_HOURS = 21;

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < ANIMATION_DURATION) {
        // Ease out quartic for smooth landing
        const easeOut = 1 - Math.pow(1 - progress / ANIMATION_DURATION, 4);
        setHours(Math.floor(easeOut * TARGET_HOURS));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setHours(TARGET_HOURS);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      <div className="relative w-48 h-48 rounded-full border-8 border-primary/20 bg-white flex items-center justify-center shadow-xl">
        {/* Clock ticks */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-3 bg-primary/40 rounded-full origin-bottom"
            style={{ 
              transform: `rotate(${i * 30}deg) translateY(-88px)` 
            }}
          />
        ))}
        
        {/* Animated Hand */}
        <motion.div 
          className="absolute w-1 h-20 bg-primary rounded-full origin-bottom bottom-1/2 left-1/2 -translate-x-1/2"
          animate={{ rotate: 360 * 3 }} // Spin 3 times
          transition={{ duration: 3, ease: "circOut" }}
        />
        
        {/* Center dot */}
        <div className="absolute w-4 h-4 bg-primary rounded-full z-10" />
        
        {/* Digital display */}
        <div className="mt-24 text-4xl font-bold font-mono text-primary animate-pulse">
          {String(hours).padStart(2, '0')}:00
        </div>
      </div>
      <p className="mt-4 text-primary font-bold text-lg">Hours Passed</p>
    </div>
  );
}
