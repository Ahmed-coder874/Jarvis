import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Download as DownloadIcon, 
  Github, 
  Star, 
  Users, 
  GitFork,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

const Download: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedPlatform, setSelectedPlatform] = useState('windows')

  const platforms = [
    {
      id: 'windows',
      name: 'Windows',
      version: 'v2.1.0',
      size: '45.2 MB',
      requirements: 'Windows 10/11, Python 3.8+',
      downloadUrl: '#'
    },
    {
      id: 'macos',
      name: 'macOS',
      version: 'v2.1.0',
      size: '42.8 MB',
      requirements: 'macOS 10.15+, Python 3.8+',
      downloadUrl: '#'
    },
    {
      id: 'linux',
      name: 'Linux',
      version: 'v2.1.0',
      size: '38.5 MB',
      requirements: 'Ubuntu 20.04+, Python 3.8+',
      downloadUrl: '#'
    }
  ]

  const stats = [
    { icon: Star, value: '2.5K', label: 'GitHub Stars' },
    { icon: DownloadIcon, value: '10K+', label: 'Downloads' },
    { icon: Users, value: '500+', label: 'Active Users' },
    { icon: GitFork, value: '150', label: 'Forks' }
  ]

  const features = [
    { icon: CheckCircle, text: 'Complete source code included' },
    { icon: CheckCircle, text: 'Comprehensive documentation' },
    { icon: CheckCircle, text: 'Regular updates and support' },
    { icon: CheckCircle, text: 'Community-driven development' },
    { icon: CheckCircle, text: 'MIT License - Free to use' },
    { icon: CheckCircle, text: 'Cross-platform compatibility' }
  ]

  return (
    <section id="download" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 glow-text">
            Get J.A.R.V.I.S
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Download the complete J.A.R.V.I.S system and start building your own AI assistant today
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Platform Selection */}
            <div className="bg-jarvis-dark-light/30 backdrop-blur-sm border border-jarvis-blue/20 rounded-2xl p-6">
              <h3 className="text-2xl font-orbitron font-semibold mb-6 text-jarvis-blue">
                Choose Your Platform
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {platforms.map((platform) => (
                  <motion.button
                    key={platform.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`p-4 rounded-xl text-left transition-all duration-300 ${
                      selectedPlatform === platform.id
                        ? 'bg-jarvis-blue/20 border-2 border-jarvis-blue'
                        : 'bg-jarvis-dark/50 border border-jarvis-blue/20 hover:border-jarvis-blue/40'
                    }`}
                  >
                    <div className="font-semibold text-white mb-1">{platform.name}</div>
                    <div className="text-sm text-white/60">{platform.version}</div>
                    <div className="text-xs text-jarvis-blue mt-2">{platform.size}</div>
                  </motion.button>
                ))}
              </div>

              {/* Selected Platform Details */}
              <motion.div
                key={selectedPlatform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-jarvis-dark/50 rounded-xl p-4 mb-6"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="w-4 h-4 text-jarvis-blue" />
                  <span className="text-white font-medium">System Requirements</span>
                </div>
                <p className="text-white/70 text-sm">
                  {platforms.find(p => p.id === selectedPlatform)?.requirements}
                </p>
              </motion.div>

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00D4FF40" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-jarvis-blue to-jarvis-blue-dark px-8 py-4 rounded-xl font-semibold text-white flex items-center justify-center space-x-2 shadow-lg hover:shadow-jarvis-blue/25 transition-all"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>Download for {platforms.find(p => p.id === selectedPlatform)?.name}</span>
              </motion.button>
            </div>

            {/* GitHub Section */}
            <div className="bg-jarvis-dark-light/30 backdrop-blur-sm border border-jarvis-blue/20 rounded-2xl p-6">
              <h3 className="text-xl font-orbitron font-semibold mb-4 text-jarvis-blue">
                Open Source
              </h3>
              
              <p className="text-white/70 mb-6">
                J.A.R.V.I.S is completely open source. View the code, contribute, or fork the project on GitHub.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-jarvis-blue" />
                    </div>
                    <div className="text-xl font-orbitron font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full border-2 border-jarvis-blue text-jarvis-blue px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-jarvis-blue hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Features & Installation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* What's Included */}
            <div className="bg-jarvis-dark-light/30 backdrop-blur-sm border border-jarvis-blue/20 rounded-2xl p-6">
              <h3 className="text-2xl font-orbitron font-semibold mb-6 text-jarvis-blue">
                What's Included
              </h3>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <feature.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Start */}
            <div className="bg-jarvis-dark-light/30 backdrop-blur-sm border border-jarvis-blue/20 rounded-2xl p-6">
              <h3 className="text-xl font-orbitron font-semibold mb-4 text-jarvis-blue">
                Quick Start
              </h3>
              
              <div className="space-y-4">
                <div className="bg-jarvis-dark rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-2">1. Clone the repository</div>
                  <code className="text-jarvis-blue text-sm">
                    git clone https://github.com/username/jarvis.git
                  </code>
                </div>
                
                <div className="bg-jarvis-dark rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-2">2. Install dependencies</div>
                  <code className="text-jarvis-blue text-sm">
                    pip install -r requirements.txt
                  </code>
                </div>
                
                <div className="bg-jarvis-dark rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-2">3. Configure environment</div>
                  <code className="text-jarvis-blue text-sm">
                    cp .env.example .env
                  </code>
                </div>
                
                <div className="bg-jarvis-dark rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-2">4. Run J.A.R.V.I.S</div>
                  <code className="text-jarvis-blue text-sm">
                    python main.py
                  </code>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-yellow-400 font-medium mb-1">API Keys Required</div>
                  <div className="text-yellow-200/80 text-sm">
                    You'll need to obtain API keys for Groq, Cohere, and HuggingFace to use all features.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Download