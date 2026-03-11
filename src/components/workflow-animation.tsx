"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const C = {
  bg: "#F5F3F0",
  cardFill: "#FFFFFF",
  cardBorder: "rgba(0,0,0,0.08)",
  text: "#1A1714",
  textMuted: "#6B6560",
  caramel: "var(--accent, #6B4226)",
  caramelLight: "color-mix(in srgb, var(--accent, #6B4226) 35%, transparent)",
  success: "#4a8a4a",
  grid: "rgba(0,0,0,0.04)",
};

const NODES = [
  { id: "webhook",  label: "WEBHOOK",  sub: "HTTP Trigger",  x: 100,  y: 320, icon: "⚡" },
  { id: "filter",   label: "FILTER",   sub: "Conditions",    x: 360,  y: 320, icon: "⚙" },
  { id: "database", label: "DATABASE", sub: "Postgres",      x: 360,  y: 540, icon: "⬡" },
  { id: "openai",   label: "OPENAI",   sub: "GPT-4o",        x: 620,  y: 140, icon: "✦" },
  { id: "sheets",   label: "SHEETS",   sub: "Log Data",      x: 620,  y: 380, icon: "▦" },
  { id: "email",    label: "EMAIL",    sub: "Send Report",   x: 880,  y: 20,  icon: "✉" },
  { id: "tiktok",   label: "TIKTOK",   sub: "Post Clip",     x: 880,  y: 180, icon: "♪" },
  { id: "youtube",  label: "YOUTUBE",  sub: "Upload Video",  x: 880,  y: 320, icon: "▶" },
  { id: "excel",    label: "EXCEL",    sub: "Export Sheet",   x: 880,  y: 460, icon: "⊞" },
  { id: "slack",    label: "SLACK",    sub: "Notify Team",    x: 620,  y: 540, icon: "◈" },
];

const EDGES = [
  { from: "webhook",  to: "filter",   phase: 1 },
  { from: "filter",   to: "openai",   phase: 2 },
  { from: "filter",   to: "database", phase: 3 },
  { from: "openai",   to: "email",    phase: 4 },
  { from: "openai",   to: "tiktok",   phase: 4 },
  { from: "openai",   to: "youtube",  phase: 4 },
  { from: "filter",   to: "sheets",   phase: 4 },
  { from: "sheets",   to: "excel",    phase: 4 },
  { from: "sheets",   to: "slack",    phase: 4 },
];

const CW = 860, CH = 540;
const CARD_W = 152, CARD_H = 74;

const easeInOut = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
const easeOut   = (t: number) => 1 - Math.pow(1-t, 3);

function useCamera() {
  const [cam, setCam] = useState({ x: NODES[0].x, y: NODES[0].y, scale: 1.55 });
  const current = useRef({ x: NODES[0].x, y: NODES[0].y, scale: 1.55 });
  const rafRef  = useRef<number>(0);

  const moveTo = useCallback((x: number, y: number, scale: number, duration = 950) => {
    const start = { ...current.current };
    const end   = { x, y, scale };
    const t0    = performance.now();
    cancelAnimationFrame(rafRef.current);
    const tick  = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = easeInOut(p);
      const next = {
        x:     start.x     + (end.x     - start.x)     * e,
        y:     start.y     + (end.y     - start.y)     * e,
        scale: start.scale + (end.scale - start.scale) * e,
      };
      current.current = next;
      setCam({ ...next });
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const val = { x: NODES[0].x, y: NODES[0].y, scale: 1.55 };
    current.current = val;
    setCam(val);
  }, []);

  return { cam, moveTo, reset };
}

function Arrow({ from, to, progress }: { from: string; to: string; progress: number }) {
  const fn = NODES.find(n => n.id === from);
  const tn = NODES.find(n => n.id === to);
  if (!fn || !tn || progress <= 0) return null;

  const x1 = fn.x + CARD_W/2, y1 = fn.y + CARD_H/2;
  const x2 = tn.x + CARD_W/2, y2 = tn.y + CARD_H/2;
  const dx = x2-x1, dy = y2-y1;
  const len = Math.sqrt(dx*dx+dy*dy);
  const bend = len * 0.18;
  const nx = -dy/len*bend, ny = dx/len*bend;
  const qx = (x1+x2)/2+nx, qy = (y1+y2)/2+ny;
  const d = `M${x1} ${y1} Q${qx} ${qy} ${x2} ${y2}`;
  const pathLen = len * 1.06;
  const drawn = pathLen * progress;

  const arrowT = 1;
  const mt = 1-arrowT;
  const ax = mt*mt*x1 + 2*mt*arrowT*qx + arrowT*arrowT*x2;
  const ay = mt*mt*y1 + 2*mt*arrowT*qy + arrowT*arrowT*y2;
  const mt2 = 1-0.96;
  const bx = mt2*mt2*x1 + 2*mt2*0.96*qx + 0.96*0.96*x2;
  const by = mt2*mt2*y1 + 2*mt2*0.96*qy + 0.96*0.96*y2;
  const ang = Math.atan2(ay-by, ax-bx);
  const sz = 6;
  const hx = ax - Math.cos(ang)*sz;
  const hy = ay - Math.sin(ang)*sz;

  return (
    <g>
      <path d={d} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={1.5} />
      <path d={d} fill="none" stroke={C.caramel} strokeWidth={2} strokeLinecap="round"
        strokeDasharray={`${drawn} ${pathLen}`}
        opacity={0.7}
      />
      {progress > 0.88 && (
        <polygon
          points={`${ax},${ay} ${hx+Math.sin(ang)*4},${hy-Math.cos(ang)*4} ${hx-Math.sin(ang)*4},${hy+Math.cos(ang)*4}`}
          fill={C.caramel} opacity={0.7}
        />
      )}
    </g>
  );
}

function Particle({ from, to, t }: { from: string; to: string; t: number }) {
  const fn = NODES.find(n => n.id === from);
  const tn = NODES.find(n => n.id === to);
  if (!fn || !tn) return null;
  const x1 = fn.x+CARD_W/2, y1 = fn.y+CARD_H/2;
  const x2 = tn.x+CARD_W/2, y2 = tn.y+CARD_H/2;
  const dx = x2-x1, dy = y2-y1, len = Math.sqrt(dx*dx+dy*dy);
  const nx = -dy/len*len*0.18, ny = dx/len*len*0.18;
  const qx = (x1+x2)/2+nx, qy = (y1+y2)/2+ny;
  const mt = 1-t;
  const px = mt*mt*x1 + 2*mt*t*qx + t*t*x2;
  const py = mt*mt*y1 + 2*mt*t*qy + t*t*y2;
  return (
    <g>
      <circle cx={px} cy={py} r={3} fill={C.caramel} opacity={0.8} />
      <circle cx={px} cy={py} r={6} fill={C.caramel} opacity={0.12} />
    </g>
  );
}

function SuccessBadge({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!show) { setVisible(false); setFading(false); return; }
    setVisible(true); setFading(false);
    const t1 = setTimeout(() => setFading(true), 1400);
    const t2 = setTimeout(() => setVisible(false), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [show]);

  if (!visible) return null;
  return (
    <div style={{
      position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)",
      background: "rgba(74,138,74,0.1)", border: "1px solid rgba(74,138,74,0.3)",
      borderRadius: 20, padding: "3px 10px",
      display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
      opacity: fading ? 0 : 1,
      transition: fading ? "opacity 0.5s ease" : "opacity 0.2s ease",
      animation: fading ? "none" : "badgePop 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      zIndex: 10,
    }}>
      <span style={{ color: C.success, fontSize: 9 }}>✓</span>
      <span style={{ color: C.success, fontSize: 8, letterSpacing: 2, fontFamily: "'Courier New', monospace" }}>SUCCESS</span>
    </div>
  );
}

interface NodeDef { id: string; label: string; sub: string; x: number; y: number; icon: string }

function Card({ node, visible, active, showBadge }: { node: NodeDef; visible: boolean; active: boolean; showBadge: boolean }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (visible) { const t = setTimeout(() => setShown(true), 60); return () => clearTimeout(t); }
    else setShown(false);
  }, [visible]);

  return (
    <div style={{
      position: "absolute", left: node.x, top: node.y, width: CARD_W, height: CARD_H,
      opacity: shown ? 1 : 0,
      transform: shown ? "scale(1) translateY(0)" : "scale(0.78) translateY(14px)",
      borderRadius: 10,
      background: C.cardFill,
      border: `1px solid ${active ? "color-mix(in srgb, var(--accent, #6B4226) 40%, transparent)" : C.cardBorder}`,
      boxShadow: active
        ? `0 0 0 1px color-mix(in srgb, var(--accent, #6B4226) 20%, transparent), 0 4px 24px rgba(0,0,0,0.08), 0 0 40px color-mix(in srgb, var(--accent, #6B4226) 8%, transparent)`
        : `0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)`,
      transition: "opacity 0.7s ease, transform 0.65s cubic-bezier(0.34,1.48,0.64,1), box-shadow 0.4s ease, border-color 0.4s ease",
      display: "flex", flexDirection: "column" as const,
      alignItems: "center", justifyContent: "center",
      gap: 2, zIndex: 2, overflow: "visible", cursor: "default",
    }}>
      <SuccessBadge show={showBadge} />
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: active
          ? `linear-gradient(90deg, transparent, var(--accent, #6B4226), transparent)`
          : `linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)`,
        transition: "all 0.4s",
      }} />
      <div style={{ fontSize: 17, lineHeight: 1, opacity: active ? 0.85 : 0.45, transition: "opacity 0.3s" }}>{node.icon}</div>
      <div style={{
        fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: 3,
        color: active ? C.caramel : C.text, fontWeight: 700,
        transition: "all 0.35s",
      }}>{node.label}</div>
      <div style={{
        fontFamily: "'Courier New', monospace", fontSize: 8.5, letterSpacing: 1,
        color: C.textMuted,
      }}>{node.sub}</div>
      {active && (
        <div style={{
          position: "absolute", inset: -5, borderRadius: 14,
          border: "1px solid color-mix(in srgb, var(--accent, #6B4226) 30%, transparent)",
          animation: "ringPulse 1.9s ease-out infinite", pointerEvents: "none",
        }} />
      )}
    </div>
  );
}

export function WorkflowAnimation() {
  const { cam, moveTo, reset } = useCamera();

  const [edgeProgress, setEdgeProgress] = useState<Record<string, number>>({});
  const [activeNode,   setActiveNode]   = useState<string | null>("webhook");
  const [visibleNodes, setVisibleNodes] = useState(new Set(["webhook"]));
  const [particles,    setParticles]    = useState<{ from: string; to: string; t: number; id: string }[]>([]);
  const [badges,       setBadges]       = useState(new Set<string>());

  const timers       = useRef<ReturnType<typeof setTimeout>[]>([]);
  const particleRaf  = useRef<number>(0);
  const particleState= useRef<Record<string, number>>({});
  const activeEdges  = useRef<string[]>([]);
  const loopTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    cancelAnimationFrame(particleRaf.current);
    if (loopTimer.current) clearTimeout(loopTimer.current);
  }, []);

  const after = (ms: number, fn: () => void) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  const flashBadge = useCallback((nodeId: string) => {
    setBadges(prev => new Set([...prev, nodeId]));
    after(2100, () => setBadges(prev => { const n = new Set(prev); n.delete(nodeId); return n; }));
  }, []);

  const drawEdge = (edgeId: string, duration = 700) => new Promise<void>(res => {
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setEdgeProgress(prev => ({ ...prev, [edgeId]: easeOut(p) }));
      if (p < 1) requestAnimationFrame(tick); else res();
    };
    requestAnimationFrame(tick);
  });

  const startParticles = useCallback((edgeIds: string[]) => {
    activeEdges.current = edgeIds;
    edgeIds.forEach(id => { if (!particleState.current[id]) particleState.current[id] = Math.random(); });
    cancelAnimationFrame(particleRaf.current);
    const loop = () => {
      activeEdges.current.forEach(id => {
        particleState.current[id] = ((particleState.current[id] || 0) + 0.007) % 1;
      });
      setParticles(activeEdges.current.map(id => {
        const edge = EDGES.find(e => `${e.from}-${e.to}` === id);
        return edge ? { ...edge, t: particleState.current[id], id } : null;
      }).filter((p): p is { from: string; to: string; t: number; id: string; phase: number } => p !== null));
      particleRaf.current = requestAnimationFrame(loop);
    };
    particleRaf.current = requestAnimationFrame(loop);
  }, []);

  const graphCenter = () => {
    const xs = NODES.map(n => n.x + CARD_W/2);
    const ys = NODES.map(n => n.y + CARD_H/2);
    return {
      x: (Math.min(...xs) + Math.max(...xs))/2 - CARD_W/2,
      y: (Math.min(...ys) + Math.max(...ys))/2 - CARD_H/2,
    };
  };

  const play = useCallback(() => {
    clearAll();
    setEdgeProgress({});
    setActiveNode("webhook");
    setVisibleNodes(new Set(["webhook"]));
    setParticles([]);
    setBadges(new Set());
    particleState.current = {};
    activeEdges.current = [];
    reset();

    after(150, () => flashBadge("webhook"));

    after(1700, async () => {
      moveTo(NODES[1].x, NODES[1].y, 1.6, 900);
      await drawEdge("webhook-filter", 900);
      setVisibleNodes(prev => new Set([...prev, "filter"]));
      setActiveNode("filter");
      after(100, () => flashBadge("filter"));
      startParticles(["webhook-filter"]);
    });

    after(3500, async () => {
      moveTo(NODES[2].x, NODES[2].y, 1.6, 900);
      await drawEdge("filter-database", 900);
      setVisibleNodes(prev => new Set([...prev, "database"]));
      setActiveNode("database");
      after(100, () => flashBadge("database"));
      startParticles(["webhook-filter", "filter-database"]);
    });

    after(5400, async () => {
      moveTo(NODES[3].x, NODES[3].y, 1.6, 950);
      await drawEdge("filter-openai", 950);
      setVisibleNodes(prev => new Set([...prev, "openai"]));
      setActiveNode("openai");
      after(100, () => flashBadge("openai"));
      startParticles(["webhook-filter", "filter-database", "filter-openai"]);

      after(600, () => {
        setActiveNode(null);

        // Reveal OpenAI branch nodes immediately
        setVisibleNodes(prev => new Set([...prev, "email", "tiktok", "youtube"]));

        const { x, y } = graphCenter();
        moveTo(x, y, 0.68, 1500);

        // OpenAI fan-out — draws immediately
        const openAiFanEdges: [string, number][] = [
          ["openai-email",   0],
          ["openai-tiktok",  120],
          ["openai-youtube", 240],
        ];
        openAiFanEdges.forEach(([id, delay]) => after(delay, () => drawEdge(id, 680)));

        // OpenAI fan badges
        const openAiFanBadges: [string, number][] = [
          ["email",   780],
          ["tiktok",  900],
          ["youtube", 1020],
        ];
        openAiFanBadges.forEach(([id, delay]) => after(delay, () => flashBadge(id)));

        // Sheets branch — delayed, builds as we're zooming out
        after(900, () => {
          setVisibleNodes(prev => new Set([...prev, "sheets"]));
          drawEdge("filter-sheets", 750);
          after(800, () => flashBadge("sheets"));
        });

        after(1800, () => {
          setVisibleNodes(prev => new Set([...prev, "excel"]));
          drawEdge("sheets-excel", 650);
          after(700, () => flashBadge("excel"));
        });

        after(2200, () => {
          setVisibleNodes(prev => new Set([...prev, "slack"]));
          drawEdge("sheets-slack", 650);
          after(700, () => flashBadge("slack"));
        });

        // Start all particles once everything is built
        after(3000, () => {
          startParticles(EDGES.map(e => `${e.from}-${e.to}`));
        });

        // Hold for ~4s visible after everything completes, then restart
        loopTimer.current = setTimeout(() => play(), 8000);
      });
    });
  }, [clearAll, reset, moveTo, flashBadge, startParticles]);

  // Auto-start on mount
  useEffect(() => {
    const t = setTimeout(() => play(), 500);
    return () => { clearTimeout(t); clearAll(); };
  }, [play, clearAll]);

  const tx = CW/2 - (cam.x + CARD_W/2) * cam.scale;
  const ty = CH/2 - (cam.y + CARD_H/2) * cam.scale;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerScale, setContainerScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      const sx = width / CW;
      const sy = height / CH;
      setContainerScale(Math.min(sx, sy));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%", height: "100%",
        background: C.bg,
        overflow: "hidden", position: "relative",
        fontFamily: "'Courier New', monospace",
        borderRadius: "inherit",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${C.grid} 1px,transparent 1px),linear-gradient(90deg,${C.grid} 1px,transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(245,243,240,0.9) 100%)",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: CW, height: CH, overflow: "hidden", position: "relative",
          transform: `scale(${containerScale})`,
          transformOrigin: "center center",
        }}>
          <div style={{
            position: "absolute",
            transform: `translate(${tx}px,${ty}px) scale(${cam.scale})`,
            transformOrigin: "0 0",
            width: 1200, height: 740,
          }}>
            <svg style={{ position: "absolute", inset: 0, width: 1200, height: 740, overflow: "visible" }}>
              {EDGES.map(e => {
                const key = `${e.from}-${e.to}`;
                return <Arrow key={key} from={e.from} to={e.to} progress={edgeProgress[key] || 0} />;
              })}
              {particles.map(p => <Particle key={p.id} from={p.from} to={p.to} t={p.t} />)}
            </svg>

            {NODES.map(node => (
              <Card
                key={node.id}
                node={node}
                visible={visibleNodes.has(node.id)}
                active={activeNode === node.id}
                showBadge={badges.has(node.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ringPulse {
          0%   { opacity: 0.75; transform: scale(1); }
          100% { opacity: 0;    transform: scale(1.45); }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: translateX(-50%) scale(0.6) translateY(6px); }
          100% { opacity: 1; transform: translateX(-50%) scale(1)   translateY(0px); }
        }
      `}</style>
    </div>
  );
}
