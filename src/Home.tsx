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

// Global mouse state
const mouseState = {
  x: 0,
  y: 0,
  isMoving: false,
};

export const Home = () => {
  return (
    <div className="bg-zinc-950">
      <Nav />
      <Hero />
      <GameControllerSection />
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
        <p style={{ marginRight: -150, marginTop: -2, fontFamily: "Mokoto", scale: 1.5 }}>
          DESIGNER /
        </p>
        <p style={{ marginRight: 30, fontFamily: "Mokoto", scale: 1.5 }}>
          DEVELOPER
        </p>
      </motion.p>

      <motion.h1 className="Quote" style={{ y: y1, scale: 1 }}>
        <p
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
        <p style={{ marginRight: 0, fontFamily: "Mokoto", scale: 1.1 }}>
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

// Controller model with rotation handler
function Model(props: any) {
  const { nodes, materials } = useGLTF('/xbox_controller.glb')
  const groupRef = useRef<THREE.Group>(null)
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation based on mouse position
      const targetRotationX = mouseState.y * Math.PI * 0.4
      const targetRotationY = mouseState.x * Math.PI * 0.6

      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1
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

// Canvas event handler component
function CanvasEventHandler({ canvasRef }: { canvasRef: React.RefObject<HTMLDivElement> }) {
  const { gl } = useThree()
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    const canvas = gl.domElement
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return
      
      const rect = canvasRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      mouseState.x = x
      mouseState.y = y
      mouseState.isMoving = true

      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }

      resetTimeoutRef.current = setTimeout(() => {
        mouseState.x = 0
        mouseState.y = 0
        mouseState.isMoving = false
      }, 2000)
    }

    const handleMouseLeave = () => {
      mouseState.x = 0
      mouseState.y = 0
      mouseState.isMoving = false
      
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [gl, canvasRef])

  return null
}

// 2D Annotation labels — 3 left, 3 right
// Each label has: text, label position (%), point on controller (%), and side
const annotations: {
  id: string;
  text: string;
  labelX: number;
  labelY: number;
  pointX: number;
  pointY: number;
  side: 'left' | 'right';
}[] = [
  // LEFT SIDE (3 labels)
  { id: 'lt', text: 'LT', labelX: 6, labelY: 25, pointX: 33, pointY: 25, side: 'left' },
  { id: 'lb', text: 'LB', labelX: 6, labelY: 35, pointX: 33, pointY: 35, side: 'left' },
  { id: 'left-stick', text: 'L STICK', labelX: 6, labelY: 55, pointX: 35, pointY: 55, side: 'left' },
  // RIGHT SIDE (3 labels)
  { id: 'rt', text: 'RT', labelX: 94, labelY: 25, pointX: 67, pointY: 25, side: 'right' },
  { id: 'rb', text: 'RB', labelX: 94, labelY: 35, pointX: 67, pointY: 35, side: 'right' },
  { id: 'buttons', text: 'A B X Y', labelX: 94, labelY: 50, pointX: 64, pointY: 50, side: 'right' },
];

// Individual 2D annotation — pure HTML/CSS, no SVG
const Annotation2D = ({
  label,
  index,
}: {
  label: typeof annotations[0];
  index: number;
}) => {
  const isLeft = label.side === 'left';

  // Horizontal line from label to point
  const lineLeft = isLeft ? label.labelX : label.pointX;
  const lineWidth = isLeft
    ? label.pointX - label.labelX
    : label.labelX - label.pointX;

  return (
    <motion.div
      className="annotation-2d"
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* The text label */}
      <div
        className="annotation-2d-text"
        style={{
          left: `${label.labelX}%`,
          top: `${label.labelY}%`,
          transform: isLeft ? 'translate(-100%, -50%)' : 'translate(0%, -50%)',
          textAlign: isLeft ? 'right' : 'left',
          paddingRight: isLeft ? 8 : 0,
          paddingLeft: isLeft ? 0 : 8,
        }}
      >
        {label.text}
      </div>

      {/* Horizontal connector line */}
      <div
        className="annotation-2d-line"
        style={{
          left: `${lineLeft}%`,
          top: `${label.labelY}%`,
          width: `${lineWidth}%`,
        }}
      />

      {/* Small dot at the controller end */}
      <div
        className="annotation-2d-dot"
        style={{
          left: `${label.pointX}%`,
          top: `${label.labelY}%`,
        }}
      />
    </motion.div>
  );
};

const ControllerAnnotations = () => {
  return (
    <div className="annotations-overlay">
      {annotations.map((label, i) => (
        <Annotation2D key={label.id} label={label} index={i} />
      ))}
    </div>
  );
};

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
          padding-bottom: 50px;
          z-index: 10;
          scale: 2;
        }

        .canvas-container {
          width: 100%;
          max-width: 1200px;
          aspect-ratio: 16 / 9;
          border-radius: 30px;
          background: black;
          cursor: grab;
          position: relative;
        }

        .canvas-container:active {
          cursor: grabbing;
        }

        /* ===== 2D Annotation Styles ===== */
        .annotations-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
        }

        .annotation-2d {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .annotation-2d-text {
          position: absolute;
          font-family: 'Courier New', 'Consolas', monospace;
          font-size: clamp(10px, 1.1vw, 15px);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 2px;
          white-space: nowrap;
          text-transform: uppercase;
          user-select: none;
        }

        .annotation-2d-line {
          position: absolute;
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-0.5px);
        }

        .annotation-2d-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.3);
        }

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

          .annotation-2d-text {
            font-size: 7px;
            letter-spacing: 0.5px;
          }

          .annotations-overlay {
            display: none;
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
      color: "#888",
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
