"use client";

import { motion } from "framer-motion";
import { Brain, Network, Workflow, Cloud, Cpu } from "lucide-react";
import NeuralNetwork from "./NeuralNetwork";

const BADGES = [
  { label: "AI Agents", icon: Brain, className: "left-[2%] top-[18%] md:left-[6%]" },
  { label: "Knowledge Graphs", icon: Network, className: "right-[2%] top-[14%] md:right-[4%]" },
  { label: "Workflows", icon: Workflow, className: "left-[0%] top-[55%] md:left-[2%]" },
  { label: "AI Operating Systems", icon: Cloud, className: "right-[0%] top-[58%] md:right-[2%]" },
  { label: "Runtime", icon: Cpu, className: "left-[38%] top-[2%]" },
];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-[320px] w-full max-w-md md:h-[420px] md:max-w-lg">
      <NeuralNetwork className="absolute inset-0 h-full w-full opacity-70" />

      {/* Glowing triangle mark */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <svg width="200" height="180" viewBox="0 0 200 180" className="animate-float drop-shadow-[0_0_60px_rgba(109,94,243,0.5)]">
          <defs>
            <linearGradient id="hero-tri" x1="0" y1="0" x2="200" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#5EC8F3" />
              <stop offset="0.5" stopColor="#6D5EF3" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          <polygon points="100,10 190,170 10,170" fill="url(#hero-tri)" fillOpacity="0.9" />
          <polygon points="100,10 100,170 10,170" fill="white" fillOpacity="0.12" />
          {/* concentric rings beneath */}
          <ellipse cx="100" cy="172" rx="85" ry="10" fill="none" stroke="#6D5EF3" strokeOpacity="0.3" />
          <ellipse cx="100" cy="172" rx="60" ry="7" fill="none" stroke="#6D5EF3" strokeOpacity="0.4" />
        </svg>
      </motion.div>

      {/* Floating capability badges */}
      {BADGES.map((badge, i) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            className={`absolute hidden items-center gap-1.5 rounded-lg border border-border bg-bg-secondary/80 px-3 py-1.5 text-xs font-medium text-muted shadow-lg backdrop-blur-sm sm:flex ${badge.className}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
          >
            <Icon className="h-3.5 w-3.5 text-primary" />
            {badge.label}
          </motion.div>
        );
      })}
    </div>
  );
}
