import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const TechStack: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const technologies = [
    {
      category: "AI & Machine Learning",
      items: [
        { name: "Groq API", description: "Ultra-fast LLM inference" },
        { name: "Cohere", description: "Advanced language understanding" },
        { name: "HuggingFace", description: "AI model hub and inference" },
        { name: "Edge TTS", description: "Neural text-to-speech" }
      ]
    },
    {
      category: "Backend & Processing",
      items: [
        { name: "Python", description: "Core backend language" },
        { name: "Asyncio", description: "Asynchronous processing" },
        { name: "Selenium", description: "Web automation" },
        { name: "BeautifulSoup", description: "Web scraping" }
      ]
    },
    {
      category: "Frontend & UI",
      items: [
        { name: "PyQt5", description: "Cross-platform GUI framework" },
        { name: "React", description: "Modern web interface" },
        { name: "Framer Motion", description: "Smooth animations" },
        { name: "Tailwind CSS", description: "Utility-first styling" }
      ]
    },
    {
      category: "Integration & APIs",
      items: [
        { name: "Google Search", description: "Real-time web search" },
        { name: "YouTube API", description: "Media control" },
        { name: "System APIs", description: "OS-level integration" },
        { name: "Voice Recognition", description: "Speech processing" }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="tech" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 glow-text">
            Technology Stack
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Built with cutting-edge technologies for maximum performance and reliability
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-jarvis-dark-light/30 backdrop-blur-sm border border-jarvis-blue/20 rounded-2xl p-6"
            >
              <h3 className="text-2xl font-orbitron font-semibold mb-6 text-jarvis-blue">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.items.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-jarvis-dark/50 hover:bg-jarvis-dark-light/50 transition-all duration-300 border border-transparent hover:border-jarvis-blue/30"
                  >
                    <div className="w-3 h-3 bg-jarvis-blue rounded-full mt-2 animate-pulse" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">{tech.name}</h4>
                      <p className="text-white/60 text-sm">{tech.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-orbitron font-semibold mb-8 text-jarvis-blue">
            System Architecture
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Input Layer", items: ["Voice Recognition", "Text Input", "GUI Interface"] },
                { title: "Processing Layer", items: ["AI Models", "Decision Making", "Task Execution"] },
                { title: "Output Layer", items: ["Text-to-Speech", "System Actions", "Visual Feedback"] }
              ].map((layer, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-jarvis-blue/10 to-jarvis-blue/5 border border-jarvis-blue/30 rounded-2xl p-6"
                >
                  <h4 className="font-orbitron font-semibold text-lg mb-4 text-jarvis-blue">
                    {layer.title}
                  </h4>
                  <ul className="space-y-2">
                    {layer.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-white/70 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-jarvis-blue to-transparent transform -translate-y-1/2" />
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-l from-jarvis-blue to-transparent transform -translate-y-1/2" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack