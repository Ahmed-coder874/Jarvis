import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Pause, Volume2, Mic, MessageSquare, Image, Settings } from 'lucide-react'

const Demo: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeDemo, setActiveDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demos = [
    {
      id: 0,
      title: "Voice Commands",
      icon: Mic,
      description: "Control your system with natural voice commands",
      features: ["Open applications", "System control", "Web search", "Media playback"],
      preview: "Hey JARVIS, open Chrome and search for AI news"
    },
    {
      id: 1,
      title: "Intelligent Chat",
      icon: MessageSquare,
      description: "Have natural conversations with AI",
      features: ["Context awareness", "Memory retention", "Real-time responses", "Multi-language"],
      preview: "What's the weather like today in New York?"
    },
    {
      id: 2,
      title: "Image Generation",
      icon: Image,
      description: "Create images from text descriptions",
      features: ["AI-powered creation", "High quality output", "Multiple styles", "Instant generation"],
      preview: "Generate an image of a futuristic city at sunset"
    },
    {
      id: 3,
      title: "System Integration",
      icon: Settings,
      description: "Deep OS integration and automation",
      features: ["File management", "Application control", "System monitoring", "Task automation"],
      preview: "Close all browsers and open my presentation"
    }
  ]

  return (
    <section id="demo" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 glow-text">
            See It In Action
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience the power of J.A.R.V.I.S through interactive demonstrations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveDemo(index)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeDemo === index
                    ? 'bg-jarvis-blue/20 border-2 border-jarvis-blue'
                    : 'bg-jarvis-dark-light/30 border border-jarvis-blue/20 hover:border-jarvis-blue/40'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${
                    activeDemo === index ? 'bg-jarvis-blue' : 'bg-jarvis-blue/20'
                  }`}>
                    <demo.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {demo.title}
                    </h3>
                    <p className="text-white/70 mb-3">
                      {demo.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {demo.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="text-xs px-2 py-1 bg-jarvis-blue/20 text-jarvis-blue rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-jarvis-dark-light/50 backdrop-blur-sm border border-jarvis-blue/20 rounded-2xl p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Demo Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-orbitron font-semibold text-jarvis-blue">
                      {demos[activeDemo].title}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-3 bg-jarvis-blue rounded-full text-white hover:bg-jarvis-blue-dark transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </motion.button>
                  </div>

                  {/* Demo Interface */}
                  <div className="bg-jarvis-dark rounded-xl p-6 mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-white/50 text-sm ml-4">J.A.R.V.I.S Terminal</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-jarvis-blue">User:</span>
                        <span className="text-white">{demos[activeDemo].preview}</span>
                      </div>
                      
                      {isPlaying && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center space-x-2"
                        >
                          <span className="text-green-400">JARVIS:</span>
                          <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: "auto" }}
                            className="text-white overflow-hidden whitespace-nowrap"
                          >
                            Processing your request...
                          </motion.span>
                          <motion.div
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-4 bg-jarvis-blue"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Demo Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-orbitron font-bold text-jarvis-blue">
                        <motion.span
                          key={`accuracy-${activeDemo}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          99.{Math.floor(Math.random() * 10)}%
                        </motion.span>
                      </div>
                      <div className="text-white/70 text-sm">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-orbitron font-bold text-jarvis-blue">
                        <motion.span
                          key={`speed-${activeDemo}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          {Math.floor(Math.random() * 50 + 10)}ms
                        </motion.span>
                      </div>
                      <div className="text-white/70 text-sm">Response</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-orbitron font-bold text-jarvis-blue">
                        <motion.span
                          key={`success-${activeDemo}`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          100%
                        </motion.span>
                      </div>
                      <div className="text-white/70 text-sm">Success</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-jarvis-blue/30 rounded-full blur-sm"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-jarvis-blue/20 rounded-full blur-sm"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Demo