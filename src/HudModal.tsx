import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "./HudModal.css";
import { FaGithub } from "react-icons/fa";
import { IoLogoReact } from "react-icons/io5";
import { TbBrandFramerMotion } from "react-icons/tb";
import { FaFigma } from "react-icons/fa";
import { DiPhotoshop } from "react-icons/di";
import { SiBlender } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { RiSupabaseFill } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";
import { FaNodeJs } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { FaSpotify } from "react-icons/fa";

// ─── Content Data for Each Annotation ────────────────────────────
export type ModalContent = {
  title: React.ReactNode;
  body: React.ReactNode;
  code: string;
};

export const annotationContent: Record<string, ModalContent> = {
  lt: {
    title: <div style={{paddingLeft:"8px",display:"flex",gap:"5px"}}>
      <span style={{fontFamily:"mokoto"}}>PLAYER INFO</span>
      </div>,
    body: `An Undergrad operating at the intersection of logic and digital artistry.
    Dhrubajyoti roy doesn’t just write code—he manifests realities. Armed with a passion for building intuitive, immersive digital landscapes, he transforms raw, complex data into elegant, interactive interfaces. For this operator, every pixel is an intentional strike, and every animation is a purposeful calculation designed to push the absolute boundaries of tech.`,
    code: "USR/001",
  },
  lb: {
    title: <div style={{paddingLeft:"8px",display:"flex",gap:"5px"}}>
      <span style={{fontFamily:"mokoto"}}>PROJECTS</span>
      </div>,
    body: `· Figma & UI Prototyping 
    · Motion Designing
    · Photoshop Graphics 
    · Blender 
    · Social Interaction Platform`,
    code: "PRJ/042",
  },
  "left-stick": {
    title: "TECH STACK",
    body: <div style={{paddingLeft:"5px",display:"flex",gap:"7px"}}>
      <div ><IoLogoReact size={37}/></div>
      <div><TbBrandFramerMotion size={37}/></div>
      <div><FaFigma size={37}/></div>
      <div><FaNodeJs size={37}/></div>
      <div><DiPhotoshop size={37}/></div>
      <div><SiBlender size={37}/></div>
      <div><FaGithub size={37}/></div>
      <div><FaHtml5 size={37}/></div>
      <div><FaCss3Alt size={37}/></div>
      <div><IoLogoJavascript size={37}/></div>
      <div><RiSupabaseFill size={37}/></div>
      <div><GrMysql size={37}/></div>
      </div>,
    code: "STK/128",
  },
  rt: {
    title: <div style={{paddingLeft:"8px",display:"flex",gap:"5px"}}>
      <span style={{fontFamily:"mokoto"}}>MISSION LOG</span>
      </div>,
    body: `·THE OVERRIDE PROTOCOL
    Learning offensive security tactics to identify system vulnerabilities, execute controlled network breaches, and ethically exploit security flaws to understand how malicious actors think. [IN PROGRESS]
    ·THE DESIGN MATRIX
    Mastering Blender to create 3D models, smooth keyframe animations, and interactive motion graphics for applications. [IN PROGRESS]`,
    code: "EXP/307",
  },
  rb: {
    title: <div style={{paddingLeft:"8px",display:"flex",gap:"5px"}}>
      <span style={{fontFamily:"mokoto"}}>INVENTORY</span>
      </div>,
    body: <div className="fui-image-gallery">
      <div className="fui-image-card">
        <img src="https://i.pinimg.com/736x/d8/a7/2c/d8a72c1e56de77ced46f3729b1371922.jpg" alt="Project 1" />
        <span className="fui-image-label">IMG 01</span>
      </div>
      <div className="fui-image-card">
        <img src="https://i.pinimg.com/736x/27/35/5d/27355d52872e62403492e05c454443b5.jpg" alt="Project 2" />
        <span className="fui-image-label">IMG 02</span>
      </div>
      <div className="fui-image-card">
        <img src="https://i.pinimg.com/736x/13/d1/6f/13d16fad3721a15cc514bf92226afb88.jpg" alt="Project 3" />
        <span className="fui-image-label">IMG 03</span>
      </div>
      <div className="fui-image-card">
        <img src="https://i.pinimg.com/236x/e5/52/40/e5524043ae45661bc6a419392ea8f25a.jpg" />
        <span className="fui-image-label">IMG 04</span>
      </div>
    </div>,
    code: "EDU/215",
  },
  buttons: {
    title:  <div style={{paddingLeft:"8px",display:"flex",gap:"5px"}}>
      <span style={{fontFamily:"mokoto"}}>SOCIALS</span>
      </div>,
    body: <div style={{paddingLeft:"15px",display:"flex",gap:"22px"}}>
      <a href="https://github.com/FUS10N9" style={{color:"#9ca3af"}}><FaGithub size={45}/></a>
      <a href="https://www.instagram.com/dhruv_s_inventory/" style={{color:"#9ca3af"}}><FaInstagram size={45}/></a>
      <a href="https://www.linkedin.com/in/dhrubajyoti-roy-293755320/" style={{color:"#9ca3af"}}><IoLogoLinkedin size={45}/></a>
      <a href="https://x.com/Dhrubaj26486032" style={{color:"#9ca3af"}}> <BsTwitterX size={45}/></a>
      <a href="https://discord.com/users/1056459569238392904" style={{color:"#9ca3af"}}><FaDiscord size={45} style={{marginTop:"0"}}/></a>
      <a href="#" style={{color:"#9ca3af"}}><BiLogoGmail size={45} style={{marginTop:"0"}}/></a>
      <a href="https://open.spotify.com/user/31r6jryeedlfcu6dpjfipw6qbcre?si=db99555294ed46fe" style={{color:"#9ca3af"}}><FaSpotify size={45} style={{marginTop:"0"}}></FaSpotify></a>
      </div>,
    code: "CNT/099",
  },
};

// ─── Animated Timestamps ─────────────────────────────────────
function useDateTime() {
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const date = `${months[now.getMonth()]} ${String(now.getDate()).padStart(2, '0')}, ${now.getFullYear()}`;
      setDateStr(date);

      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const time = `${hours}:${minutes} ${ampm}`;
      setTimeStr(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return { dateStr, timeStr };
}

// ─── HUD Modal Component ─────────────────────────────────────────
export const HudModal = ({
  annotationId,
  isOpen,
  onClose,
}: {
  annotationId: string | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { dateStr, timeStr } = useDateTime();
  const content = annotationId ? annotationContent[annotationId] : null;

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const navItems = ["HOME", `PLAYER INFO`, `PROJECTS`, `TECH STACK`, `MISSIONS`,`SOCIALS`];

  return (
    <AnimatePresence>
      {isOpen && content && (
        <motion.div
          className="fui-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={onClose}
        >
          {/* Background Elements */}
          <div className="fui-bg-grid" />
          <div className="fui-bg-scanlines" />
          <div className="fui-bg-noise" />

          {/* Large Context Title (Background) */}
          <motion.div
            className="fui-context-title"
            key={`title-${content.title}`}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
            animate={{ opacity: 0.05, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(5px)", scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {content.title}
          </motion.div>

          {/* HUD Framework container */}
          <div className="fui-framework">
            
            {/* Top Left Metadata */}
            <div className="fui-top-left">
              <div className="fui-metadata">{dateStr}</div>
              <div className="fui-metadata">{timeStr}</div>
            </div>

            {/* Left Vertical Sidebar */}
            <div className="fui-left-sidebar">
              <div className="fui-sys-info">BATTERY 95%</div>
              <div className="fui-nav">
                {navItems.map((item, index) => (
                  <div key={item} className={`fui-nav-item ${index === 0 ? "active" : ""}`}>
                    {item}
                  </div>
                ))}
              </div>
              <div className="fui-sys-monitor">
                <span style={{}}>SYS MONITOR</span>
                <span className="fui-divider" />
                <span>NOMINAL</span>
              </div>
            </div>

            {/* Top Right Readout */}
            <div className="fui-top-right">
              <div className="fui-metadata">USR/001</div>
              
              <div className="fui-signal-bars">
                <div className="fui-signal-bar" style={{height: "4px"}} />
                <div className="fui-signal-bar" style={{height: "6px"}} />
                <div className="fui-signal-bar" style={{height: "8px"}} />
                <div className="fui-signal-bar" style={{height: "10px"}} />
                
              </div>
              <div className="fui-metadata">ping 78</div>
            </div>

            {/* Right Side Vertical Markers */}
            <div className="fui-right-sidebar">
              <div className="fui-marker active" />
              <div className="fui-marker" />
              <div className="fui-marker" />
              <div className="fui-marker" />
              <div className="fui-marker" />
            </div>

            {/* Main Content Floating Window */}
            <motion.div
              className="fui-panel"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, x: 20, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.99 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            >
              {/* Window Header */}
              <div className="fui-panel-header">
                <div className="fui-header-labels">
                  <span className="fui-header-label active">IDENTITY</span>
                  <span className="fui-header-label">CLEARANCE</span>
                  <span className="fui-header-label">STATUS</span>
                </div>
                <button className="fui-close-btn" onClick={onClose}>✕</button>
              </div>

              {/* Window Content */}
              <div className="fui-panel-content">
                <motion.div 
                  className="fui-content-title"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                >
                  {content.title}
                </motion.div>
                
                <motion.div 
                  className="fui-content-meta"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
                >
                  ID: {content.code} — STATUS ACTIVE
                </motion.div>
                
                {annotationId !== "rb" && (
                <motion.div 
                  className="fui-tech-rows"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  style={{fontFamily: "mokoto"}}
                >
                  <div className="fui-tech-row">
                    <span className="fui-row-label">DESIGNATION</span>
                    <span className="fui-row-value">CYBER WAVER</span>
                  </div>
                  <div className="fui-tech-row">
                    <span className="fui-row-label">SPECIALIZATION</span>
                    <span className="fui-row-value">React·Motion Design·Three.js</span>
                  </div>
                  <div className="fui-tech-row">
                    <span className="fui-row-label">ROLE</span>
                    <span className="fui-row-value">GAMER·DESIGNER·DEVELOPER</span>
                  </div>
                  <div className="fui-tech-row">
                    <span className="fui-row-label">SECTOR</span>
                    <span className="fui-row-value">TECH</span>
                  </div>
                </motion.div>
                )}

                <motion.div 
                  className="fui-content-body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                >
                  {content.body}
                </motion.div>

                {/* Decorative Bottom Bar */}
                <div className="fui-panel-bottom-bar">
                  <div className="fui-panel-bottom-hash" />
                  <div className="fui-panel-bottom-hash" />
                  <div className="fui-panel-bottom-hash" />
                  <div className="fui-panel-bottom-hash" />
                  <div className="fui-panel-bottom-hash" />
                  <div className="fui-panel-bottom-hash" />
                  <div className="fui-panel-bottom-hash" />
                  <div className="fui-panel-bottom-hash" />
                </div>
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
