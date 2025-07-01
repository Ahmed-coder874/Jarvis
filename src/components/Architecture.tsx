import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Database, 
  Cpu, 
  Network, 
  Shield, 
  Zap, 
  Brain,
  Mic,
  Speaker,
  Monitor,
  Cloud
} from 'lucide-react'

const Architecture: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const components = [
    {
      id: 'input',
      title: 'Input Layer',
      icon: Mic,
      position: { x: 10, y: 20 },
      connections: ['processing'],
      description: 'Voice & Text Input'
    },
    {
      id: 'processing',
      title: 'AI Processing',
      icon: Brain,
      position: { x: 50, y: 20 },
      connections: ['decision', 'memory'],
      description: 'Language Models & Decision Making'
    },
    {
      id: 'decision',
      title: 'Decision Engine',
      icon: Cpu,
      position: { x: 90, y: 20 },
      connections: ['automation', 'search'],
      description: 'Task Classification & Routing'
    },
    {
      id: 'memory',
      title: 'Memory Store',
      icon: Database,
      position: { x: 30, y: 50 },
      connections: ['processing'],
      description: 'Context & Chat History'
    },
    {
      id: 'automation',
      title: 'System Control',
      icon: Zap,
      position: { x: 70, y: 50 },
      connections: ['output'],
      description: 'Application & OS Integration'
    },
    {
      id: 'search',
      title: 'Web Search',
      icon: Network,
      position: { x: 90, y: 50 },
      connections: ['output'],
      description: 'Real-time Information'
    },
    {
      id: 'security',
      title: 'Security Layer',
      icon: Shield,
      position: { x: 10, y: 80 },
      connections: [],
      description: 'Data Protection & Privacy'
    },
    {
      id: 'output',
      title: 'Output Layer',
      icon: Speaker,
      position: { x: 50, y: 80 },
      connections: [],
      description: 'Speech & Visual Feedback'
    },
    {
      id: 'gui',
      title: 'User Interface',
      icon: Monitor,
      position: { x: 90, y: 80 },
      connections: [],
      description: 'PyQt5 & Web Interface'
    }
  ]

  return (
    <section id="architecture" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 glow-text">
            System Architecture
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            A sophisticated, modular architecture designed for scalability and performance
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-6xl mx-auto mb-16"
        >
          <div className="relative h-96 bg-jarvis-dark-light/30 backdrop-blur-sm border border-jarvis-blue/20 rounded-2xl p-8 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border border-jarvis-blue/20" />
                ))}
              </div>
            </div>

            {/* Components */}
            {components.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${component.position.x}%`,
                  top: `${component.position.y}%`
                }}
              >
                <div className="relative">
                  {/* Component Node */}
                  <div className="w-16 h-16 bg-gradient-to-br from-jarvis-blue to-jarvis-blue-dark rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-jarvis-blue/50 transition-all duration-300">
                    <component.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Pulse Effect */}
                  <div className="absolute inset-0 w-16 h-16 bg-jarvis-blue/30 rounded-2xl animate-ping" />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-jarvis-dark border border-jarvis-blue/30 rounded-lg p-3 text-center whitespace-nowrap">
                      <div className="font-semibold text-white text-sm">{component.title}</div>
                      <div className="text-jarvis-blue text-xs">{component.description}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {components.map((component) =>
                component.connections.map((targetId) => {
                  const target = components.find(c => c.id === targetId)
                  if (!target) return null
                  
                  return (
                    <motion.line
                      key={`${component.id}-${targetId}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                      transition={{ duration: 1, delay: 1 }}
                      x1={`${component.position.x}%`}
                      y1={`${component.position.y}%`}
                      x2={`${target.position.x}%`}
                      y2={`${target.position.y}%`}
                      stroke="#00D4FF"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  )
                })
              )}
            </svg>

            {/* Data Flow Animation */}
            <motion.div
              animate={{
                x: ['10%', '50%', '90%', '50%', '10%'],
                y: ['20%', '20%', '50%', '80%', '20%']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-3 h-3 bg-jarvis-blue rounded-full shadow-lg"
              style={{ filter: 'drop-shadow(0 0 10px #00D4FF)' }}
            />
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Modular Design",
              description: "Each component is independently scalable and maintainable",
              icon: Database
            },
            {
              title: "Async Processing",
              description: "Non-blocking operations for optimal performance",
              icon: Zap
            },
            {
              title: "Secure by Design",
              description: "Built-in security measures and data protection",
              icon: Shield
            },
            {
              title: "Real-time Communication",
              description: "Instant data flow between all system components",
              icon: Network
            },
            {
              title: "Cloud Integration",
              description: "Seamless integration with cloud AI services",
              icon: Cloud
            },
            {
              title: "Cross-platform",
              description: "Runs on Windows, macOS, and Linux systems",
              icon: Monitor
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-jarvis-dark-light/30 backdrop-blur-sm border border-jarvis-blue/20 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-jarvis-blue to-jarvis-blue-dark rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Architecture