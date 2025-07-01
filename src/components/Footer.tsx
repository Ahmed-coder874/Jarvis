import React from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart, 
  Zap,
  ExternalLink,
  Code,
  Book,
  MessageCircle
} from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const links = {
    project: [
      { name: 'Documentation', href: '#', icon: Book },
      { name: 'GitHub Repository', href: '#', icon: Github },
      { name: 'API Reference', href: '#', icon: Code },
      { name: 'Community', href: '#', icon: MessageCircle }
    ],
    resources: [
      { name: 'Getting Started', href: '#' },
      { name: 'Installation Guide', href: '#' },
      { name: 'Configuration', href: '#' },
      { name: 'Troubleshooting', href: '#' }
    ],
    support: [
      { name: 'Report Issues', href: '#' },
      { name: 'Feature Requests', href: '#' },
      { name: 'Contributing', href: '#' },
      { name: 'License', href: '#' }
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-400' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { name: 'Email', icon: Mail, href: '#', color: 'hover:text-red-400' }
  ]

  return (
    <footer className="relative bg-jarvis-dark-light/50 backdrop-blur-sm border-t border-jarvis-blue/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="circuit-pattern h-full w-full" />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <Zap className="w-8 h-8 text-jarvis-blue animate-pulse-glow" />
                  <div className="absolute inset-0 w-8 h-8 bg-jarvis-blue/20 rounded-full animate-ping" />
                </div>
                <span className="text-2xl font-orbitron font-bold glow-text">J.A.R.V.I.S</span>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Just A Rather Very Intelligent System - The future of AI assistance, 
                bringing advanced voice recognition and intelligent automation to everyone.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    className={`w-10 h-10 bg-jarvis-dark-medium rounded-lg flex items-center justify-center text-white/60 ${social.color} transition-all duration-300 hover:bg-jarvis-blue/20`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Project Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-orbitron font-semibold text-jarvis-blue mb-4">
                Project
              </h3>
              <ul className="space-y-3">
                {links.project.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5, color: '#00D4FF' }}
                      className="text-white/70 hover:text-jarvis-blue transition-colors flex items-center space-x-2 group"
                    >
                      <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-orbitron font-semibold text-jarvis-blue mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {links.resources.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5, color: '#00D4FF' }}
                      className="text-white/70 hover:text-jarvis-blue transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Support */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-orbitron font-semibold text-jarvis-blue mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                {links.support.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5, color: '#00D4FF' }}
                      className="text-white/70 hover:text-jarvis-blue transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-jarvis-dark-medium/50 rounded-2xl p-8 mb-12"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-orbitron font-semibold text-jarvis-blue mb-4">
              Stay Updated
            </h3>
            <p className="text-white/70 mb-6">
              Get notified about new features, updates, and AI advancements in J.A.R.V.I.S
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-jarvis-dark border border-jarvis-blue/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-jarvis-blue transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-jarvis-blue to-jarvis-blue-dark rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-jarvis-blue/25 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-jarvis-blue/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {currentYear} J.A.R.V.I.S. All rights reserved. Built with{' '}
              <Heart className="inline w-4 h-4 text-red-400 mx-1" />
              for the AI community.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <motion.a
                href="#"
                whileHover={{ color: '#00D4FF' }}
                className="text-white/60 hover:text-jarvis-blue transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#00D4FF' }}
                className="text-white/60 hover:text-jarvis-blue transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#00D4FF' }}
                className="text-white/60 hover:text-jarvis-blue transition-colors"
              >
                MIT License
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-8 right-8 w-4 h-4 bg-jarvis-blue/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-8 left-8 w-3 h-3 bg-jarvis-blue/20 rounded-full blur-sm"
        />
      </div>
    </footer>
  )
}

export default Footer