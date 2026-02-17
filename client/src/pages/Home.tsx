import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useMessages } from '@/hooks/use-messages';
import { FallingHearts } from '@/components/FallingHearts';
import { Stopwatch } from '@/components/Stopwatch';
import { ArrowRight } from 'lucide-react';
import roseImage from '@assets/Screenshot_2026-02-17_103429_1771304716149.png';

export default function Home() {
  const { data: messages, isLoading } = useMessages();
  const [currentPage, setCurrentPage] = useState(0); // 0 = cover, 1 = inside left, 2 = inside right, 3 = back
  const [isOpen, setIsOpen] = useState(false);
  
  // For drag gesture on the cover
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const rotateOutput = [20, 0, -20]; // Slight rotation on drag
  const rotate = useTransform(x, xInput, rotateOutput);
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-pink-50">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -100) {
      // Dragged left enough to open
      setIsOpen(true);
      setCurrentPage(1);
    } else {
      // Snap back
    }
  };

  const nextPage = () => {
    if (currentPage < (messages?.length || 4)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      if (currentPage === 1) setIsOpen(false);
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-pink-50 perspective-1000">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-primary/10 text-9xl animate-float">♥</div>
        <div className="absolute bottom-20 right-10 text-primary/10 text-8xl animate-float" style={{ animationDelay: '1s' }}>♥</div>
      </div>

      <div className="relative w-full max-w-md aspect-[3/4] md:aspect-[4/5] preserve-3d">
        <AnimatePresence mode="wait">
          
          {/* === COVER PAGE (Zero State) === */}
          {!isOpen && (
            <motion.div
              key="cover"
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-50"
              style={{ x, rotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ rotateY: 0, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0, transition: { duration: 0.6 } }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="w-full h-full bg-white rounded-3xl shadow-2xl border-2 border-pink-100 overflow-hidden relative flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-white to-pink-50">
                <div className="w-full h-64 mb-8 rounded-2xl overflow-hidden shadow-inner relative">
                  <img 
                    src={roseImage} 
                    alt="Pink roses" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent mix-blend-overlay" />
                </div>
                
                <h1 className="font-handwriting text-5xl text-primary font-bold mb-4 drop-shadow-sm">
                  Get Well Soon
                </h1>
                
                <div className="flex items-center gap-2 text-primary/60 text-sm animate-pulse mt-4">
                  <ArrowRight className="w-4 h-4" />
                  <span>Swipe or Drag left to open</span>
                </div>

                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-gradient-to-l from-black/5 to-transparent rounded-l-full" />
              </div>
            </motion.div>
          )}

          {/* === INSIDE PAGES === */}
          {isOpen && (
            <motion.div
              key="inside"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full relative"
            >
              <div className="w-full h-full bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden relative flex flex-col">
                
                {/* Top Navigation / Progress */}
                <div className="h-1 bg-pink-100 w-full flex">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step} 
                      className={`h-full flex-1 transition-colors duration-300 ${step <= currentPage ? 'bg-primary' : 'bg-transparent'}`} 
                    />
                  ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
                  
                  <AnimatePresence mode="wait">
                    {/* PAGE 1: HEARTS */}
                    {currentPage === 1 && (
                      <motion.div
                        key="page1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center w-full"
                      >
                        <FallingHearts />
                        <h2 className="font-handwriting text-4xl md:text-5xl text-primary font-bold leading-tight mb-6">
                          {messages?.[0]?.text || "Get well soon my sweet baby"}
                        </h2>
                        <div className="text-8xl animate-bounce mt-8 block">
                          {messages?.[0]?.emoji || "💖"}
                        </div>
                      </motion.div>
                    )}

                    {/* PAGE 2: STOPWATCH */}
                    {currentPage === 2 && (
                      <motion.div
                        key="page2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="text-center w-full"
                      >
                        <Stopwatch />
                        <h3 className="text-2xl font-bold text-foreground mt-6 mb-4 font-handwriting">
                          {messages?.[1]?.text || "Since you've been sick"}
                        </h3>
                        <div className="text-7xl animate-pulse">
                          {messages?.[1]?.emoji || "😢"}
                        </div>
                      </motion.div>
                    )}

                    {/* PAGE 3: FIGHTING */}
                    {currentPage === 3 && (
                      <motion.div
                        key="page3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="text-center w-full"
                      >
                        <div className="space-y-8">
                          <div className="bg-pink-100/50 p-6 rounded-2xl transform rotate-2 shadow-sm">
                            <p className="text-2xl font-bold text-primary font-handwriting mb-2">
                              You can do this!
                            </p>
                            <span className="text-6xl block transform hover:scale-110 transition-transform">👊</span>
                          </div>
                          
                          <div className="bg-blue-50/50 p-6 rounded-2xl transform -rotate-1 shadow-sm">
                            <p className="text-xl font-medium text-blue-600 font-handwriting mb-2">
                              I am with you every step of the way
                            </p>
                            <span className="text-6xl block text-red-500 animate-pulse">❤️</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* PAGE 4: LOVE */}
                    {currentPage === 4 && (
                      <motion.div
                        key="page4"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center w-full flex flex-col items-center justify-center h-full"
                      >
                        {/* Unsplash image of hearts or love theme */}
                        <div className="w-48 h-48 rounded-full overflow-hidden mb-8 border-4 border-primary shadow-lg mx-auto">
                          <img 
                            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80" 
                            alt="Love hearts" 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <h2 className="font-handwriting text-5xl text-primary font-bold mb-6">
                          {messages?.[3]?.text || "I love you forever dil"}
                        </h2>
                        
                        <div className="flex gap-4 justify-center mt-4">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -20, 0] }}
                              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                              className="text-4xl"
                            >
                              💕
                            </motion.div>
                          ))}
                        </div>

                        <button 
                          onClick={() => {
                            setIsOpen(false);
                            setCurrentPage(0);
                          }}
                          className="mt-12 px-6 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium"
                        >
                          Close Card
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="p-4 border-t border-pink-100 flex justify-between items-center bg-white/80 backdrop-blur-sm z-10">
                  <button 
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
                  >
                    Back
                  </button>
                  
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                    Page {currentPage} of 4
                  </span>
                  
                  <button 
                    onClick={nextPage}
                    disabled={currentPage === 4}
                    className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:opacity-50 disabled:shadow-none disabled:active:scale-100 transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
