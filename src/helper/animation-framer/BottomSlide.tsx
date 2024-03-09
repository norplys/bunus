import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function BottomSlide({
  children,
  delay,
  design,
}: {
  children: ReactNode;
  delay: number | undefined;
  design: string | undefined;
}) {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 100 },
    enter: { opacity: 1, x: 0, y: 0 },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="enter"
      transition={{ delay: delay || 0, duration: 0.5 }}
      className={design || ""}
    >
      {children}
    </motion.div>
  );
}
