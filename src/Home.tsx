import {
  color,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import "./Home.css";
import React, { type CSSProperties, Suspense, useRef, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ControllerAnnotations } from "./ControllerAnnotations";

// Global mouse state
const mouseState = {
  x: 0,
  y: 0,
  isDragging: false,
};

export const Home = () => {
  return (
    <div className="bg-zinc-950">
      <Nav />
      <Hero />
      <GameControllerSection />
      <Footer />
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="nav">
      <h6 className="Title" style={{ color: "white" }}>
        PORTFOLIO
      </h6>
      <button
        className="time"
        style={{ color: "white", right: 0, position: "fixed" }}
      >
        INDIA |
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </button>
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="InHero">
      <CenterImage style={{ zIndex: -10 }} />
      <ParallexText />
    </div>
  );
};

const CenterImage = ({ style }: { style?: CSSProperties }) => {
  const { scrollY } = useScroll();

  const clipPath = useTransform<string>(scrollY, [0, 1550], [
    "polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  ]);
  const opacity = useTransform<number>(scrollY, [1600, 1900 + 500], [1, 0]);

  const backgroundSize = useTransform<string>(scrollY, [0, 1700], ["100%", "200%"]);

  return (
    <motion.img     
      src="https://wallpapercave.com/wp/wp6736059.jpg"
      alt="Center"
      className="CenterImg"
      style={{ ...style, opacity, backgroundSize, clipPath, color: "#000000" }}
    />
  );
};

const ParallexText = () => {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 850]);
  const y2 = useTransform(scrollY, [0, 800], [0, 885]);
  const y3 = useTransform(scrollY, [0, 1250], [0, 930]);
  const y4 = useTransform(scrollY, [0, 1300], [0, 885]);
  const y5 = useTransform(scrollY, [0, 1300], [0, 850]);

  return (
    <div className="ParallexText">
      <motion.h1 className="Welcome" style={{ y: y5, scale: 1 }}>
        WELCOME
      </motion.h1>

      <motion.h1 className="Player" style={{ y: y4, scale: 1 }}>
        PLAYER
      </motion.h1>

      <motion.p className="Name" style={{ y: y3, scale: 1 }}>
        <p>DHRUBAJYOTI</p>
        <p style={{ marginTop: -30 }}>ROY</p>
      </motion.p>

      <motion.p className="Role" style={{ y: y3, scale: 1 }}>
        <p className="role-item" style={{ marginRight: -150, marginTop: -2, fontFamily: "Mokoto", scale: 1.5 }}>
          DESIGNER /
        </p>
        <p className="role-item" style={{ marginRight: 30, fontFamily: "Mokoto", scale: 1.5 }}>
          DEVELOPER
        </p>
      </motion.p>

      <motion.h1 className="Quote" style={{ y: y1, scale: 1 }}>
        <p
          className="quote-item"
          style={{
            marginRight: -145,
            marginTop: -2,
            fontFamily: "Mokoto",
            scale: 1.1,
          }}
        >
          {" "}
          "RESPAWNING IDEAS TO MAKE THEM
        </p>
        <p className="quote-item" style={{ marginRight: 0, fontFamily: "Mokoto", scale: 1.1 }}>
          LEGENDARY"
        </p>
      </motion.h1>

      <motion.h1
        className="Connect"
        style={{ y: y2, scale: 0.5, marginTop: 150, marginLeft: -370 }}
      >
        <CgDanger style={{ color: "yellow", marginTop: 10 }} /> Connect with me

      </motion.h1>

      <motion.h1
        className="Social"
        style={{ y: y2, scale: 0.8, marginTop: -10, marginLeft: -55 }}
      >
        <a style={{ color: "white" }} href="#" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>{" "}
        <a style={{ color: "white" }} href="#" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>{" "}
        <a style={{ color: "white" }} href="#" target="_blank" rel="noreferrer">
          <RiTwitterXLine />
        </a>{" "}
        <a style={{ color: "white" }} href="#" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
      </motion.h1>
    </div>
  );
};

// Controller model with drag-to-rotate and spring-back reset
function Model(props: any) {
  const { nodes, materials } = useGLTF('/xbox_controller.glb')
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Add a subtle continuous floating animation
      const t = state.clock.getElapsedTime()
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.06

      if (mouseState.isDragging) {
        // While dragging: rotate toward the target offset
        const targetRotationX = mouseState.y * Math.PI * 0.4
        const targetRotationY = mouseState.x * Math.PI * 0.6

        groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1
        groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1
      } else {
        // Not dragging: smoothly spring back to default (0, 0, 0)
        groupRef.current.rotation.x += (0 - groupRef.current.rotation.x) * 0.08
        groupRef.current.rotation.y += (0 - groupRef.current.rotation.y) * 0.08
      }
    }
  })

  return (
    <group 
      {...props} 
      ref={groupRef}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.material}
        position={[0.025, 0.004, 0.214]}
        rotation={[0.598, -Math.PI / 2, 0]}
        scale={0.048}
      />
    </group>
  )
}

useGLTF.preload('/xbox_controller.glb')

// Canvas event handler — handles both mouse and touch for mobile support
function CanvasEventHandler({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement> }) {
  const { gl } = useThree()

  React.useEffect(() => {
    const canvas = gl.domElement

    // --- Mouse Handlers ---
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      mouseState.isDragging = true
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Only update rotation values when dragging
      if (!mouseState.isDragging || !canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseState.x = x
      mouseState.y = y
    }

    // --- Touch Handlers ---
    const handleTouchStart = (e: TouchEvent) => {
      // Only track single touches for rotation
      if (e.touches.length > 1) return;
      mouseState.isDragging = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!mouseState.isDragging || !canvasRef.current) return
      // Prevent scrolling while rotating the controller
      if (e.cancelable) {
        e.preventDefault()
      }
      const touch = e.touches[0]
      const rect = canvasRef.current.getBoundingClientRect()
      const x = (touch.clientX - rect.left) / rect.width - 0.5
      const y = (touch.clientY - rect.top) / rect.height - 0.5
      mouseState.x = x
      mouseState.y = y
    }

    // --- Shared Reset ---
    const handleReset = () => {
      mouseState.isDragging = false
      mouseState.x = 0
      mouseState.y = 0
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleReset)
    window.addEventListener('mouseup', handleReset)

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleReset)
    canvas.addEventListener('touchcancel', handleReset)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleReset)
      window.removeEventListener('mouseup', handleReset)

      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleReset)
      canvas.removeEventListener('touchcancel', handleReset)
    }
  }, [gl, canvasRef])

  return null
}



const GameControllerSection = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  return (
    <div className="controller-section">
      <motion.div
        className="controller-intro"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="controller-title">PLAYER PROFILE</h2>

      </motion.div>

      <div 
        className="canvas-container"
        ref={canvasRef}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Canvas className="canvas"
            camera={{ position: [0, 0, 2.5], fov: 40 }}
            style={{ background: "transparent" }}
            dpr={[1, 2]}
            shadows
          >
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[5, 10, 7]}
              intensity={1.7}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-5, -5, 5]} intensity={0.5} />
            
            <Model/>
            
            <CanvasEventHandler canvasRef={canvasRef} />
            
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              autoRotate={false}
            />
          </Canvas>
        </Suspense>

        {/* Annotation labels overlay */}
        <ControllerAnnotations />
      </div>

      <style>{`
        .controller-section {
          width: 100%;
          background: black;
          height: 150vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .controller-intro {
          text-align: center;
          margin-top: -40px;
          padding-bottom: 100px;
          z-index: 10;
          scale: 2;
        }

        .canvas-container {
          width: 100%;
          max-width: 950px;
          aspect-ratio: 16 / 9;
          border-radius: 30px;
          background: black;
          cursor: grab;
          position: relative;
        }

        .canvas-container:active {
          cursor: grabbing;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .controller-section {
            padding: 0px 0px 40px;
            min-height: 50vh;
            width: auto;
          }

          .controller-title {
            font-size: 18px;
            
          }

          .controller-subtitle {
            font-size: 12px;
          }

          .canvas-container {
            aspect-ratio: 1;
            border-radius: 12px;
          }
        }

        /* ── Mobile Responsive (max-width: 475px) ── */
        @media (max-width: 475px) {
          .controller-section {
            height: auto;
            min-height: 60vh;
            padding: 40px 8px 20px;
          }

          .controller-intro {
            scale: 1 !important;
            margin-top: 0;
            padding-bottom: 24px;
          }

          .controller-title {
            font-size: 16px;
            letter-spacing: 0.15em;
          }

          .canvas-container {
            max-width: 100%;
            aspect-ratio: 4 / 3;
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
};

const LoadingFallback = () => {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "16px",
      fontFamily: "monospace",
    }}>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading Controller...
      </motion.div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© {new Date().getFullYear()} DHRUBAJYOTI ROY. ALL RIGHTS RESERVED.</p>
        <div className="footer-links">
          <a href="#">SYSTEM.LOG</a>
          <a href="#">TRANSMISSION</a>
        </div>
      </div>
    </footer>
  );
};
