'use client'

import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars, Environment, useTexture, Html, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

// Project data
const projects = [
  { title: 'Global Music Rater', desc: 'Music Marketplace', color: '#6366f1' },
  { title: 'OnlineTeacher1to1', desc: 'EdTech Platform', color: '#8b5cf6' },
  { title: 'UnhousedDocs', desc: 'Document Management', color: '#a78bfa' },
  { title: 'Chatterly', desc: 'Real-time Chat', color: '#7c3aed' },
  { title: 'ShopApp', desc: 'E-Commerce', color: '#6d28d9' },
  { title: 'Recipe App', desc: 'Food & Recipes', color: '#5b21b6' },
]

// 3D Monitor/Computer
function Monitor({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [hovered, setHovered] = useState(false)
  
  // Auto-cycle projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const project = projects[currentProject]

  return (
    <group ref={groupRef} position={position}>
      {/* Monitor Stand */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 0.5, 32]} />
        <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Monitor Frame */}
      <RoundedBox args={[5, 3, 0.3]} radius={0.1} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
      </RoundedBox>
      
      {/* Screen bezel */}
      <mesh position={[0, 0.5, 0.16]}>
        <boxGeometry args={[4.7, 2.7, 0.02]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      
      {/* Screen - Interactive */}
      <mesh 
        position={[0, 0.5, 0.18]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[4.5, 2.5]} />
        <meshStandardMaterial 
          color={hovered ? '#1e1b4b' : '#0f0d1a'}
          emissive={project.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Project Display Content */}
      <Html
        position={[0, 0.5, 0.2]}
        transform
        occlude
        style={{
          width: '400px',
          height: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div className="text-center px-6">
          <div 
            className="text-2xl font-bold mb-2 transition-all duration-500"
            style={{ color: project.color }}
          >
            {project.title}
          </div>
          <div className="text-sm text-gray-400 mb-4">{project.desc}</div>
          <div className="flex gap-2 justify-center">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentProject ? 'bg-white scale-125' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </Html>
      
      {/* Power LED */}
      <mesh position={[2.1, -0.9, 0.2]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial 
          color="#22c55e" 
          emissive="#22c55e"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Monitor brand logo */}
      <mesh position={[0, -0.85, 0.2]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// Laptop showing code
function Laptop({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={[0, 0.3, 0]}>
      {/* Keyboard base */}
      <RoundedBox args={[3, 0.15, 2]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Keyboard surface */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[2.8, 0.02, 1.8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      {/* Keyboard keys pattern */}
      <mesh position={[0, 0.1, 0.2]}>
        <boxGeometry args={[2.4, 0.01, 1]} />
        <meshStandardMaterial color="#4b5563" />
      </mesh>
      
      {/* Screen hinge */}
      <mesh position={[0, 0.15, -0.9]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.8, 0.1, 0.2]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      {/* Screen - angled */}
      <group position={[0, 0.8, -0.85]} rotation={[-0.4, 0, 0]}>
        <RoundedBox args={[2.8, 1.8, 0.08]} radius={0.03}>
          <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        
        {/* Screen display */}
        <mesh 
          position={[0, 0, 0.05]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[2.6, 1.6]} />
          <meshStandardMaterial 
            color={hovered ? '#1a1a2e' : '#0d0d1a'}
            emissive="#4f46e5"
            emissiveIntensity={hovered ? 0.2 : 0.05}
          />
        </mesh>
        
        {/* Code display */}
        <Html
          position={[0, 0, 0.06]}
          transform
          occlude
          style={{
            width: '240px',
            height: '150px',
            fontSize: '8px',
            fontFamily: 'monospace',
            color: '#a5b4fc',
            padding: '10px',
            pointerEvents: 'none',
          }}
        >
          <pre className="text-left leading-tight">
{`const developer = {
  name: "Muhammad Issa",
  role: "Full-Stack Developer",
  skills: [
    "React", "Next.js",
    "TypeScript", "Node.js"
  ],
  passion: "Building amazing apps"
};

export default developer;`}
          </pre>
        </Html>
      </group>
      
      {/* Trackpad */}
      <mesh position={[0, 0.1, 0.6]}>
        <boxGeometry args={[1.2, 0.01, 0.8]} />
        <meshStandardMaterial color="#4b5563" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  )
}

// Floating project cards in 3D space
function ProjectCard({ position, project, index }: { position: [number, number, number]; project: typeof projects[0]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index * 0.5) * 0.2
      
      const targetScale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox args={[1.5, 1, 0.1]} radius={0.05}>
          <meshStandardMaterial 
            color={project.color}
            metalness={0.3}
            roughness={0.4}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.5 : 0.1}
          />
        </RoundedBox>
        <Html
          position={[0, 0, 0.06]}
          transform
          occlude
          style={{
            width: '130px',
            height: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div className="text-center">
            <div className="text-xs font-bold text-white mb-1">{project.title}</div>
            <div className="text-[10px] text-gray-300">{project.desc}</div>
          </div>
        </Html>
      </mesh>
    </Float>
  )
}

// Floating code brackets
function CodeBracket({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = rotation[2] + state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} rotation={[rotation[0], rotation[1], rotation[2]]}>
        <torusGeometry args={[0.5, 0.08, 8, 16, Math.PI]} />
        <meshStandardMaterial 
          color="#6366f1"
          metalness={0.8}
          roughness={0.2}
          emissive="#6366f1"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

// Mouse light that follows cursor
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { viewport, pointer } = useThree()
  
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = (pointer.x * viewport.width) / 2
      lightRef.current.position.y = (pointer.y * viewport.height) / 2
    }
  })

  return (
    <pointLight 
      ref={lightRef} 
      position={[0, 0, 8]} 
      intensity={3} 
      color="#8b5cf6"
      distance={20}
    />
  )
}

// Camera rig
function CameraRig() {
  const { camera, pointer } = useThree()
  const targetPos = useRef({ x: 0, y: 0 })
  
  useFrame(() => {
    targetPos.current.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.5, 0.03)
    targetPos.current.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.8, 0.03)
    camera.position.set(targetPos.current.x, targetPos.current.y, 12)
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Floating particles
function FloatingParticles({ count = 100 }) {
  const points = useRef<THREE.Points>(null)
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return [pos]
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#4b5563" transparent opacity={0.4} />
    </points>
  )
}

// Animated ring
function AnimatedRing({ position, rotation, color, size = 1 }: { position: [number, number, number]; rotation?: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + (rotation?.[0] || 0)
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15 + (rotation?.[2] || 0)
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={size}>
      <torusGeometry args={[1, 0.03, 16, 100]} />
      <meshStandardMaterial
        color={color}
        metalness={1}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

// Floating geometric shapes
function FloatingShape({ position, color, type = 'octahedron' }: { position: [number, number, number]; color: string; type?: 'octahedron' | 'dodecahedron' | 'icosahedron' }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      
      const targetScale = hovered ? 1.3 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  const geometry = type === 'octahedron' 
    ? <octahedronGeometry args={[0.6, 0]} />
    : type === 'dodecahedron'
    ? <dodecahedronGeometry args={[0.5, 0]} />
    : <icosahedronGeometry args={[0.5, 0]} />

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometry}
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
    </Float>
  )
}

// Main scene component
export function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#6366f1" />
      <pointLight position={[10, -10, 5]} intensity={0.8} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} intensity={1} color="#a78bfa" angle={0.5} penumbra={1} />
      
      {/* Mouse-following light */}
      <MouseLight />
      
      {/* Camera follows mouse */}
      <CameraRig />
      
      {/* Stars background */}
      <Stars radius={100} depth={100} count={3000} factor={4} saturation={0} fade speed={0.3} />
      
      {/* Floating particles */}
      <FloatingParticles count={150} />
      
      {/* Main Monitor with projects */}
      <Monitor position={[0, 0, -2]} />
      
      {/* Laptop with code */}
      <Laptop position={[-5, -1, 0]} />
      
      {/* Floating project cards */}
      <ProjectCard position={[4.5, 2, 1]} project={projects[0]} index={0} />
      <ProjectCard position={[5, 0, 0]} project={projects[1]} index={1} />
      <ProjectCard position={[4.5, -2, 1]} project={projects[2]} index={2} />
      
      {/* Code brackets */}
      <CodeBracket position={[-3, 3, 0]} rotation={[0, 0, 0]} />
      <CodeBracket position={[6, 1, -2]} rotation={[0, Math.PI, 0]} />
      
      {/* Animated rings */}
      <AnimatedRing position={[0, 0, -1]} rotation={[0, 0, 0]} color="#6366f1" size={5} />
      <AnimatedRing position={[0, 0, -1]} rotation={[Math.PI / 3, 0, Math.PI / 6]} color="#8b5cf6" size={6} />
      
      {/* Floating shapes */}
      <FloatingShape position={[-6, 2, 1]} color="#6366f1" type="octahedron" />
      <FloatingShape position={[-5, -3, 0]} color="#8b5cf6" type="dodecahedron" />
      <FloatingShape position={[6, 3, -1]} color="#a78bfa" type="icosahedron" />
      <FloatingShape position={[-7, 0, 2]} color="#7c3aed" type="octahedron" />
      
      {/* Environment for reflections */}
      <Environment preset="city" />
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 10, 50]} />
    </Canvas>
  )
}

export default Scene3D
