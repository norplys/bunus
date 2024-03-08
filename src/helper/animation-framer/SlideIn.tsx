import { motion } from "framer-motion";
import { ReactNode } from "react";
export default function SlideIn({ children }: { children: ReactNode }) {
  const variants = {
    hidden: { opacity: 0, x: 0, y: -200 },
    enter: { opacity: 1, x: 0, y: 0 },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="enter"
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
