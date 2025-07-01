import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Mic, 
  Brain, 
  Zap, 
  MessageSquare, 
  Search, 
  Settings, 
  Image, 
  Globe,
  Smartphone
} from 'lucide-react'

const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const features = [
    {
      icon: Mic,
      title: "Advanced Voice Recognition",
      description: "State-of-the-art speech-to-text with multi-language support and real-time processing.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Powered by advanced language models for natural conversation and intelligent responses.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Real-time Automation",
      description: "Execute system commands, open applications, and control your computer with voice commands.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MessageSquare,
      title: "Intelligent Chat",
      description: "Engage in natural conversations with context awareness and memory retention.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Search,
      title: "Real-time Search",
      description: "Get up-to-date information from the web with intelligent search capabilities.",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Image,
      title: "AI Image Generation",
      description: "Create stunning images from text descriptions using advanced AI models.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Communicate in multiple languages with automatic translation capabilities.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Settings,
      title: "System Integration",
      description: "Deep integration with your operating system for seamless automation.",
      color: "from-gray-500 to-slate-500"
    },
    {
      icon: Smartphone,
      title: "Cross-platform GUI",
      description: "Beautiful, responsive interface built with modern technologies.",
      color: "from-pink-500 to-rose-500"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 glow-text">
            Powerful Features
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover the cutting-edge capabilities that make J.A.R.V.I.S the most advanced AI assistant
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-jarvis-dark-light/50 backdrop-blur-sm border border-jarvis-blue/20 rounded-2xl p-6 h-full hover:border-jarvis-blue/40 transition-all duration-300">
                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-jarvis-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-jarvis-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "99.9%", label: "Accuracy" },
            { number: "50ms", label: "Response Time" },
            { number: "24/7", label: "Availability" },
            { number: "∞", label: "Possibilities" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-orbitron font-bold text-jarvis-blue mb-2">
                {stat.number}
              </div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features