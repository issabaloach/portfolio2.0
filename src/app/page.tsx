'use client'

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Code2, 
  Database, 
  Server, 
  Globe, 
  Layers,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Terminal,
  MapPin,
  Phone,
  Calendar,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Menu,
  X,
  Rocket
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { ContactModal } from '@/components/contact-modal'

// Smooth scroll to section
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Dynamic Island Navigation
function DynamicIslandNav() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const islandRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { name: 'About', icon: Code2 },
    { name: 'Skills', icon: Layers },
    { name: 'Projects', icon: Rocket },
    { name: 'Experience', icon: Briefcase },
    { name: 'Education', icon: GraduationCap },
    { name: 'Contact', icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
      
      const sections = navItems.map(item => item.name.toLowerCase())
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.div
      ref={islandRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.5 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-shadow duration-500 ${
        isScrolled ? 'shadow-xl shadow-black/10' : ''
      }`}
    >
      <motion.div
        layout
        onClick={() => !isExpanded && setIsExpanded(true)}
        onMouseEnter={() => setIsExpanded(true)}
        className="relative cursor-pointer"
      >
        <motion.div
          layout
          className="relative bg-black/95 backdrop-blur-xl overflow-hidden"
          animate={{
            borderRadius: isExpanded ? 24 : 40,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="relative flex items-center">
            {/* Logo and Name - Always visible */}
            <motion.div
              layout
              className="flex items-center gap-2.5 px-4 py-2.5"
            >
              <motion.div
                layout
                className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0"
              >
                <span className="text-xs font-bold text-white">MI</span>
              </motion.div>
              
              {/* Name - visible when collapsed */}
              <AnimatePresence mode="wait">
                {!isExpanded && (
                  <motion.span
                    key="name"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-white text-sm font-medium whitespace-nowrap"
                  >
                    Muhammad Issa
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Nav Items - visible when expanded */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="flex items-center overflow-hidden"
                >
                  <div className="flex items-center gap-0.5 px-2 py-1.5">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={`#${item.name.toLowerCase()}`}
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ delay: index * 0.03, type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={() => setIsExpanded(false)}
                        className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          activeSection === item.name.toLowerCase()
                            ? 'text-white'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        {activeSection === item.name.toLowerCase() && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-white/10 rounded-full"
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          />
                        )}
                        <span className="relative z-10">{item.name}</span>
                      </motion.a>
                    ))}
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: navItems.length * 0.03 }}
                      className="ml-1 pl-2 border-l border-white/10"
                    >
                      <ThemeToggle />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(false)
              }}
              className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white/70 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              <X className="w-3 h-3" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// Mobile Navigation
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact']

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.5 }}
      className="fixed top-4 left-4 right-4 z-50 md:hidden"
    >
      <div className="bg-black/90 backdrop-blur-xl rounded-full px-4 py-2.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-neutral-700 flex items-center justify-center">
            <span className="text-xs font-bold text-white">MI</span>
          </div>
          <span className="text-white text-sm font-medium">Menu</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 text-white/70 hover:text-white transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mt-2 bg-black/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="p-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all text-sm"
                >
                  {item}
                </motion.a>
              ))}
              <div className="border-t border-white/10 mt-2 pt-2 px-4 flex items-center justify-between">
                <span className="text-white/50 text-xs">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Navigation wrapper
function Navigation() {
  return (
    <>
      <div className="hidden md:block">
        <DynamicIslandNav />
      </div>
      <MobileNav />
    </>
  )
}

// Hero Section - Minimalist Design
function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a]"
    >
      {/* Subtle grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6"
      >
        {/* Main Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.3
          }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display tracking-tight text-neutral-800 dark:text-neutral-200">
            Muhammad Issa
            <span className="text-neutral-400 dark:text-neutral-600">.</span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.5
          }}
          className="mt-4 text-xl sm:text-2xl md:text-3xl font-light text-neutral-500 dark:text-neutral-500 tracking-wide"
        >
          Full-Stack Developer
        </motion.p>

        {/* Location indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 flex items-center justify-center gap-2 text-neutral-400 dark:text-neutral-600"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm tracking-wide">Karachi, Pakistan</span>
        </motion.div>

        {/* Social Links - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          {[
            { icon: Github, href: 'https://github.com/issabaloach', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/muhammadissa', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:muhammadissa848@gmail.com', label: 'Email' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + index * 0.1 }}
              className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="cursor-pointer text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Minimal corner accent */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 right-6 text-xs text-neutral-300 dark:text-neutral-800 tracking-widest uppercase hidden sm:block"
      >
        Portfolio 2025
      </motion.div>
    </section>
  )
}

// Section Title
function SectionTitle({ badge, title, description, isInView }: { badge: string; title: string; description?: string; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="text-center mb-12"
    >
      <Badge variant="secondary" className="mb-4">{badge}</Badge>
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      {description && (
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">{description}</p>
      )}
    </motion.div>
  )
}

// About Section
function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { label: 'Years Learning', value: '3+' },
    { label: 'Projects', value: '10+' },
    { label: 'Technologies', value: '15+' },
    { label: 'Happy Clients', value: '5+' },
  ]

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          >
            <Badge variant="secondary" className="mb-4">About</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Passionate about building exceptional digital experiences
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a Full-Stack Developer with strong frontend capabilities, specializing in 
                building responsive, high-performance web applications using React, Next.js, 
                JavaScript, and modern UI frameworks.
              </p>
              <p>
                Experienced in integrating RESTful APIs, handling authentication, and collaborating 
                across teams to deliver scalable, secure solutions. Passionate about delivering 
                clean, maintainable code.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                <MapPin className="w-4 h-4" />
                <span>Karachi, Pakistan</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <Mail className="w-4 h-4" />
                <span>muhammadissa848@gmail.com</span>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  type: 'spring', 
                  stiffness: 100, 
                  damping: 15,
                  delay: 0.2 + i * 0.1 
                }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="cursor-default"
              >
                <Card className="text-center p-6 hover:border-neutral-400/50 transition-all duration-300">
                  <motion.div 
                    className="text-3xl font-bold mb-1"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Skills Section
function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skills = [
    { category: 'Frontend', icon: Globe, items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'TailwindCSS', 'ShadcnUI'] },
    { category: 'Backend', icon: Server, items: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'Socket.io'] },
    { category: 'Database', icon: Database, items: ['MongoDB', 'Firebase', 'MySQL', 'Prisma'] },
    { category: 'Tools', icon: Terminal, items: ['Git & GitHub', 'Postman', 'Vercel', 'Figma'] },
  ]

  return (
    <section id="skills" className="py-24 bg-muted/30 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle badge="Skills" title="Technologies I Work With" isInView={isInView} />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                type: 'spring',
                stiffness: 50,
                damping: 15,
                delay: i * 0.1 
              }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full hover:border-neutral-400/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                  >
                    <skill.icon className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                  <CardTitle className="text-lg">{skill.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, j) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.1 + j * 0.03 }}
                      >
                        <Badge variant="secondary" className="text-xs hover:bg-muted transition-colors">
                          {item}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Section
function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    { 
      title: 'Global Music Rater', 
      desc: 'Full-stack music marketplace with audio clipping and revenue management', 
      tags: ['Next.js', 'Full-Stack'], 
      link: 'https://www.globalmusicrater.com', 
      featured: true,
      image: '/projects/global-music-rater.png'
    },
    { 
      title: 'OnlineTeacher1to1', 
      desc: 'EdTech platform for live online tutoring with dashboards and payments', 
      tags: ['Next.js', 'ShadcnUI'], 
      link: 'https://onlineteachers1to1.com', 
      featured: true,
      image: '/projects/onlineteacher.png'
    },
    { 
      title: 'UnhousedDocs', 
      desc: 'Document management web app for secure uploads and management', 
      tags: ['Next.js', 'Firebase'], 
      link: 'https://unhouseddocs.com', 
      featured: true,
      image: '/projects/unhouseddocs.png'
    },
    { 
      title: 'Chatterly', 
      desc: 'Real-time chat app with user authentication and live messaging', 
      tags: ['React', 'Socket.io'], 
      link: 'https://github.com/issabaloach/Chatterly',
      image: '/projects/chatterly.png'
    },
    { 
      title: 'ShopApp', 
      desc: 'E-commerce app with product browsing, cart, and checkout', 
      tags: ['React', 'Firebase'], 
      link: 'https://dynamic-e-commerce.vercel.app/',
      image: '/projects/shopapp.png'
    },
    { 
      title: 'Recipe App', 
      desc: 'Recipe app with search, filters, and real-time data updates', 
      tags: ['React', 'Firebase'], 
      link: 'https://perfect-recipe-orcin.vercel.app/',
      image: '/projects/recipe-app.png'
    },
  ]

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle badge="Projects" title="Featured Work" isInView={isInView} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                type: 'spring',
                stiffness: 50,
                damping: 15,
                delay: i * 0.1 
              }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className={`h-full overflow-hidden hover:border-neutral-400/50 transition-all duration-300 cursor-pointer ${project.featured ? 'border-neutral-300 dark:border-neutral-700' : ''}`}>
                {/* Project Image */}
                <div className="relative h-48 bg-muted/50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                    {/* Placeholder pattern */}
                    <div className="w-full h-full bg-[linear-gradient(45deg,transparent_45%,currentColor_45%,currentColor_55%,transparent_55%)] bg-[length:10px_10px] opacity-10" />
                  </div>
                  {/* Project image - replace src when you add actual images */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Hide broken image and show placeholder
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* External link button on hover */}
                  <motion.a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-black"
                  >
                    <ExternalLink className="w-4 h-4 text-neutral-700 dark:text-neutral-200" />
                  </motion.a>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg group-hover:text-foreground transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{project.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + i * 0.1 + j * 0.05 }}
                      >
                        <Badge variant="secondary" className="text-xs">{tag}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Experience Section
function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const experiences = [
    {
      role: 'Backend Developer',
      company: 'Bright Solutions',
      period: 'Oct 2025 - Present',
      highlights: ['Employee Attendance System with NestJS', 'Ngrok secure tunneling for biometric devices', 'MongoDB schema design with validation layers'],
    },
    {
      role: 'Frontend Developer',
      company: 'Mas Tech',
      period: 'May 2025 - Sep 2025',
      highlights: ['Built OnlineTeacher1to1.com frontend', 'REST API integration for payments', 'Improved mobile responsiveness'],
    },
    {
      role: 'Frontend Developer Intern',
      company: 'Mas Tech',
      period: 'Internship',
      highlights: ['React.js and Next.js projects', 'Agile development sprints', 'API and Git workflows'],
    },
  ]

  return (
    <section id="experience" className="py-24 bg-muted/30 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle badge="Experience" title="Work History" isInView={isInView} />

        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ transformOrigin: 'top' }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  type: 'spring',
                  stiffness: 50,
                  damping: 15,
                  delay: i * 0.2 
                }}
                className={`relative pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'}`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-background border-2 border-neutral-500 rounded-full -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.2 + 0.2, type: 'spring' }}
                />

                <Card className={`hover:border-neutral-400/50 transition-all duration-300 ${i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{exp.role}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Briefcase className="w-4 h-4" />
                          {exp.company}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        <Calendar className="w-3 h-3 mr-1" />
                        {exp.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {exp.highlights.map((h, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.2 + 0.3 + j * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-neutral-500 mt-1">•</span>
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Education Section
function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const education = [
    { degree: 'BS Computer Science', school: 'Sindh Madressatul Islam University', period: '2022 - Present' },
    { degree: 'Web & Mobile App Development', school: 'Saylani Mass I.T', period: '2023 - 2025' },
    { degree: 'Pre-Engineering', school: 'Hira Public Higher Secondary School', period: '2019 - 2021' },
  ]

  return (
    <section id="education" className="py-24 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle badge="Education" title="Academic Background" isInView={isInView} />

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                type: 'spring',
                stiffness: 50,
                damping: 15,
                delay: i * 0.15 
              }}
              whileHover={{ y: -5 }}
            >
              <Card className="text-center hover:border-neutral-400/50 transition-all duration-300 h-full">
                <CardHeader>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: i * 0.15 + 0.2, type: 'spring' }}
                  >
                    <GraduationCap className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                  </motion.div>
                  <CardTitle className="text-base">{edu.degree}</CardTitle>
                  <CardDescription>{edu.school}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{edu.period}</Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section id="contact" className="py-24 bg-muted/30 relative" ref={ref}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          >
            <Badge variant="secondary" className="mb-4">Contact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              I&apos;m open to full-time opportunities and interesting projects. Feel free to reach out!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="group"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Mail className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Email Me
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+923421461997">
                    <Phone className="mr-2 w-4 h-4" />
                    +92 342 1461997
                  </a>
                </Button>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-4">
              {[
                { icon: Linkedin, href: 'https://linkedin.com/in/muhammadissa' },
                { icon: Github, href: 'https://github.com/issabaloach' },
              ].map((social, i) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-background hover:bg-muted border border-border transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            © {new Date().getFullYear()} Muhammad Issa. Built with Next.js & shadcn/ui
          </motion.div>
          <div className="flex items-center gap-6">
            <motion.a 
              href="https://github.com/issabaloach" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, color: 'var(--foreground)' }}
              className="transition-colors"
            >
              GitHub
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/muhammadissa" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, color: 'var(--foreground)' }}
              className="transition-colors"
            >
              LinkedIn
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
