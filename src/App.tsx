import React from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import TechStack from './components/TechStack'
import Demo from './components/Demo'
import Architecture from './components/Architecture'
import Download from './components/Download'
import Footer from './components/Footer'
import MatrixBackground from './components/MatrixBackground'

function App() {
  return (
    <div className="relative min-h-screen bg-jarvis-dark">
      <MatrixBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <TechStack />
        <Demo />
        <Architecture />
        <Download />
        <Footer />
      </div>
    </div>
  )
}

export default App