import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Download, Github, Mic, Brain, Zap } from 'lucide-react'

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('')
  const fullText = "Just A Rather Very Intelligent System"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-jarvis-blue/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-jarvis-blue/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-jarvis-blue/10 rounded-full animate-pulse" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center relative z-10"
      >
        {/* Main Logo/Icon */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-2 border-jarvis-blue/30 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border border-jarvis-blue/50 rounded-full flex items-center justify-center"
              >
                <Brain className="w-12 h-12 text-jarvis-blue animate-pulse-glow" />
              </motion.div>
            </motion.div>
            <div className="absolute inset-0 w-32 h-32 bg-jarvis-blue/20 rounded-full animate-ping" />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-orbitron font-black mb-6 glow-text"
        >
          J.A.R.V.I.S
        </motion.h1>

        {/* Subtitle with Typing Effect */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-jarvis-blue font-medium mb-2">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Experience the future of AI assistance with advanced voice recognition, 
            intelligent automation, and seamless human-computer interaction.
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: Mic, text: "Voice Recognition" },
            { icon: Brain, text: "AI Intelligence" },
            { icon: Zap, text: "Real-time Processing" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center space-x-2 bg-jarvis-dark-light/50 backdrop-blur-sm border border-jarvis-blue/20 rounded-full px-4 py-2"
            >
              <feature.icon className="w-5 h-5 text-jarvis-blue" />
              <span className="text-white/80">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00D4FF40" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-jarvis-blue to-jarvis-blue-dark px-8 py-4 rounded-full font-semibold text-white flex items-center space-x-2 shadow-lg hover:shadow-jarvis-blue/25 transition-all"
          >
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-jarvis-blue text-jarvis-blue px-8 py-4 rounded-full font-semibold flex items-center space-x-2 hover:bg-jarvis-blue hover:text-white transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Download Now</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white/70 hover:text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 transition-all"
          >
            <Github className="w-5 h-5" />
            <span>View Source</span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-jarvis-blue/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-jarvis-blue rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero