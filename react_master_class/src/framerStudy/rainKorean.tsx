import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const hangulChars = "가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허".split("");
const brightColors = ["#ffffff", "#aee1f9", "#b3e5fc", "#e1f5fe"];
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const RainText = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<{
        x: number;
        y: number;
        dx: number;
        dy: number;
        size: number;
        alpha: number;
        life: number;
    }[]>([]);

    const spawnParticles = (x: number, y: number) => {
        for (let i = 0; i < 4; i++) {
            const angle = Math.random() * 2 * Math.PI;
            const distance = getRandom(10, 25);
            particlesRef.current.push({
                x,
                y,
                dx: Math.cos(angle) * distance,
                dy: Math.sin(angle) * distance,
                size: getRandom(1.5, 3.5),
                alpha: 1,
                life: 0,
            });
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        let animationFrame: number;

        const updateCanvas = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                p.life += 0.02;
                p.x += p.dx * 0.1 + getRandom(-0.3, 0.3);
                p.y += p.dy * 0.1 + getRandom(-0.2, 0.2);
                p.alpha = 1 - Math.pow(p.life, 1.8);
            });

            particlesRef.current = particlesRef.current.filter((p) => p.life < 1);

            particlesRef.current.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(174, 225, 249, ${p.alpha})`;
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(updateCanvas);
        };

        animationFrame = requestAnimationFrame(updateCanvas);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    useEffect(() => {
        const loop = () => {
            if (containerRef.current) {
                const spans = containerRef.current.querySelectorAll(".rain-char");
                spans.forEach((span) => {
                    const rect = span.getBoundingClientRect();
                    if (rect.top > window.innerHeight - 40 && Math.random() < 0.02) {
                        const x = rect.left + rect.width / 2;
                        const y = rect.top + rect.height / 2;
                        spawnParticles(x, y);
                    }
                });
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }, []);

    const items = Array.from({ length: 60 }).map((_, i) => {
        const char = hangulChars[Math.floor(Math.random() * hangulChars.length)];
        const leftPercent = Math.random() * 100;
        const left = `${leftPercent}%`;
        const duration = getRandom(1.8, 2.6);
        const delay = getRandom(0, 1.5);
        const color = brightColors[Math.floor(Math.random() * brightColors.length)];
        const fontSize = `${getRandom(1.1, 1.5)}rem`;
        const rotate = getRandom(-45, 45);

        return (
            <motion.span
                key={i}
                className="rain-char"
                initial={{ y: -80, opacity: 0 }}
                animate={{
                    y: "100vh",
                    x: [0, -2, 2, 0],
                    rotate: [0, rotate],
                    opacity: [0.2, 0.7, 1, 0.6, 0],
                    scale: [1, 1.05, 0.9, 1.2, 0],
                    filter: [
                        "blur(2px)",
                        "blur(1px)",
                        "blur(0.3px)",
                        "blur(2px)",
                        "blur(4px)",
                    ],
                }}
                transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 0.9, 1],
                }}
                style={{
                    position: "absolute",
                    left,
                    color,
                    fontSize,
                    fontWeight: 600,
                    pointerEvents: "none",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    textShadow: "0 0 8px rgba(255,255,255,0.3)",
                }}
            >
                {char}
            </motion.span>
        );
    });

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backdropFilter: "blur(10px)",
            }}
        >
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            />
            {items}
        </div>
    );
};

export default RainText;