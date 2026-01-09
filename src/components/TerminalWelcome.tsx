"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalWelcomeProps {
  onComplete: () => void;
}

export default function TerminalWelcome({ onComplete }: TerminalWelcomeProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const commands = [
    { text: "npm install dubem-portfolio", delay: 200 },
    { text: "", delay: 50 },
    { text: "⠋ Installing dependencies...", delay: 300 },
    { text: "⠙ Fetching packages...", delay: 200 },
    { text: "⠹ Building modules...", delay: 200 },
    { text: "⠸ Optimizing assets...", delay: 200 },
    { text: "✓ Installation complete!", delay: 300 },
    { text: "", delay: 50 },
    { text: "added 127 packages in 3.4s", delay: 200 },
    { text: "", delay: 50 },
    { text: "npm start", delay: 20 },
    { text: "", delay: 100 },
    { text: "> Starting portfolio...", delay: 300 },
    { text: "✓ Ready on http://localhost:3000", delay: 300 },
  ];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const addLine = () => {
      if (currentIndex < commands.length) {
        const command = commands[currentIndex];
        setLines((prev) => [...prev, command.text]);
        currentIndex++;
        timeoutId = setTimeout(addLine, command.delay);
      } else {
        setShowCursor(false);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onComplete, 800);
        }, 100);
      }
    };

    timeoutId = setTimeout(addLine, 500);

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e1e1e]"
        >
          <div className="w-full max-w-4xl mx-4">
            {/* VSCode Window */}
            <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-[#3e3e3e]">
              {/* Title Bar */}
              <div className="bg-[#323233] px-4 py-2 flex items-center justify-between border-b border-[#3e3e3e]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <span className="text-[#cccccc] text-sm ml-4 font-mono">
                    terminal - dubem-portfolio
                  </span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="bg-[#1e1e1e] p-6 min-h-[400px] font-mono text-sm">
                {lines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className={`mb-1 ${
                      line.includes("✓")
                        ? "text-[#4ec9b0]"
                        : line.includes("⠋") ||
                          line.includes("⠙") ||
                          line.includes("⠹") ||
                          line.includes("⠸")
                        ? "text-[#4fc1ff]"
                        : line.includes("npm") || line.includes(">")
                        ? "text-[#dcdcaa]"
                        : line.includes("added")
                        ? "text-[#6a9955]"
                        : "text-[#cccccc]"
                    }`}
                  >
                    {line.startsWith("npm") || line.startsWith(">") ? (
                      <span>
                        <span className="text-[#4ec9b0]">→ </span>
                        {line}
                      </span>
                    ) : (
                      line || "\u00A0"
                    )}
                  </motion.div>
                ))}
                {showCursor && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-[#cccccc] ml-1"
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
