import { motion } from "framer-motion";
import { useState } from "react";
import "./ControllerAnnotations.css";
import { HudModal } from "./HudModal";

// ─── Radial Annotation Configuration ─────────────────────────────
//
// 6 lines radiate from the controller center, each 60° apart.
// Lines start at `innerRadius` and end at `outerRadius` (% of container).
// Labels sit at the outer end of each line.
//
// The center of the controller is at (50%, 35%) of the canvas container.
// Angles start at -90° (top) and go clockwise.
// ─────────────────────────────────────────────────────────────────

type Annotation = {
  id: string;
  num: string;
  text:  React.ReactNode;
  sub?: React.ReactNode;
  angle: number;      // degrees, 0 = right, -90 = top
  side: 'left' | 'right';
};

// Center of the controller model in the canvas (percentage)
const CENTER_X = 51;
const CENTER_Y = 35;

// Radii for the lines (percentage of container)
const INNER_RADIUS = 20;    // gap from center
const OUTER_RADIUS = 45;   // how far lines extend

// 6 annotations, 60° apart, starting from top (-90°)
const annotations: Annotation[] = [
  {
    id: 'lt',
    num: '01',
    text: 'PLAYER INFO',
    sub: 'L-TRIG // SEC.A',
    angle: -90,      // top
    side: 'left',
  },
  {
    id: 'lb',
    num: '02',
    text: 'PROJECTS',
    sub: 'L-BUMP // SEC.B',
    angle: -150,    // upper-left
    side: 'left',
  },
  {
    id: 'left-stick',
    num: '03',
    text: 'TECH STACK',
    sub: 'L-STCK // SEC.C',
    angle: -210,      // lower-left (= 150°)
    side: 'left',
  },
  {
    id: 'rt',
    num: '04',
    text: `MISSION·LOG`,
    sub: `R-TRIG // SEC.D`,
    angle: -30,       // upper-right
    side: 'right',
  },
  {
    id: 'rb',
    num: '05',
    text: `INVENTORY`,
    sub: `R-BUMP / SEC.E`,
    angle: 30,        // lower-right (= -330°)
    side: 'right',
  },
  {
    id: 'buttons',
    num: '06',
    text: 'socials',
    sub: 'F-BTNS // SEC.F',
    angle: -270,      // bottom (= 90°)
    side: 'right',
  },
];

// ─── Helper: degrees → radians ──────────────────────────────────
const toRad = (deg: number) => (deg * Math.PI) / 180;

// ─── Compute endpoint coordinates ───────────────────────────────
const getEndpoint = (angleDeg: number, radius: number) => ({
  x: CENTER_X + radius * Math.cos(toRad(angleDeg)),
  y: CENTER_Y + radius * Math.sin(toRad(angleDeg)),
});

// ─── SVG Radial Line ────────────────────────────────────────────
const RadialLine = ({
  angle,
  delay,
}: {
  angle: number;
  delay: number;
}) => {
  const inner = getEndpoint(angle, INNER_RADIUS);
  const outer = getEndpoint(angle, OUTER_RADIUS);

  return (
    <motion.line
      x1={inner.x}
      y1={inner.y}
      x2={outer.x}
      y2={outer.y}
      stroke="rgba(255, 255, 255, 0.7)"
      strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    />
  );
};

// ─── Individual Radial Annotation ───────────────────────────────
const Annotation2D = ({
  label,
  index,
  onLabelClick,
}: {
  label: Annotation;
  index: number;
  onLabelClick: (id: string) => void;
}) => {
  const delay = 0.2 + index * 0.12;

  // Label position: at the outer end of the line
  const outerPt = getEndpoint(label.angle, OUTER_RADIUS);
  // Dot position: at the inner end (near controller)
  const innerPt = getEndpoint(label.angle, INNER_RADIUS);

  // Compute transform so the box is pushed outward from the line endpoint.
  // cos/sin map the angle to how much to offset the box:
  //   - translateX: cos=-1 → -100% (box fully left), cos=0 → -50% (centered), cos=1 → 0%
  //   - translateY: sin=-1 → -100% (box fully above), sin=0 → -50% (centered), sin=1 → 0%
  const cosA = Math.cos(toRad(label.angle));
  const sinA = Math.sin(toRad(label.angle));
  const txPercent = (cosA - 1) * 50;    // ranges from -100% to 0%
  const tyPercent = (sinA - 1) * 50;    // ranges from -100% to 0%

  // Determine text alignment from angle
  const isLeft = Math.cos(toRad(label.angle)) < -0.3;
  const isRight = Math.cos(toRad(label.angle)) > 0.3;
  const alignClass = isLeft ? 'callout-align-left' : isRight ? 'callout-align-right' : '';

  return (
    <motion.div
      className="annotation-2d"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* SVG radial line */}
      <svg className="annotation-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <RadialLine angle={label.angle} delay={delay} />
      </svg>

      {/* Label card — positioned at outer end of radial line */}
      <motion.div
        className={`callout-label callout-clickable ${alignClass}`}
        style={{
          left: `${outerPt.x}%`,
          top: `${outerPt.y}%`,
          transform: `translate(${txPercent}%, ${tyPercent}%)`,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.1, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
        onClick={() => onLabelClick(label.id)}
      >
        <div className="callout-num">{label.num}</div>
        <div className="callout-text-container">
          {label.sub && <span className="callout-sub">{label.sub}</span>}
          <span className="callout-id">{label.text}</span>
        </div>
      </motion.div>

      {/* Target dot at inner end (near controller center) */}
      
    </motion.div>
  );
};

// ─── Exported Overlay Component ─────────────────────────────────
export const ControllerAnnotations = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLabelClick = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Delay clearing ID so exit animation uses correct content
    setTimeout(() => setSelectedId(null), 400);
  };

  return (
    <>
      <div className="annotations-overlay">
        {annotations.map((label, i) => (
          <Annotation2D
            key={label.id}
            label={label}
            index={i}
            onLabelClick={handleLabelClick}
          />
        ))}
      </div>

      <HudModal
        annotationId={selectedId}
        isOpen={isModalOpen}
        onClose={handleClose}
      />
    </>
  );
};
