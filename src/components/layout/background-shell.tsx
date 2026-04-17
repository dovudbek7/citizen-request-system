import { motion } from "framer-motion";

export function BackgroundShell() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-background bg-mesh transition-colors dark:bg-slate-950 dark:bg-none" />
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
        className="fixed -left-20 top-16 -z-10 h-80 w-80 rounded-full bg-primary/20 blur-[100px] dark:bg-sky-500/20"
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ x: [0, -12, 0], y: [0, 16, 0] }}
        className="fixed bottom-10 right-0 -z-10 h-[22rem] w-[22rem] rounded-full bg-cyan-300/20 blur-[120px] dark:bg-cyan-400/10"
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        className="fixed left-1/2 top-1/3 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-100/60 blur-[100px] dark:bg-slate-700/45"
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
