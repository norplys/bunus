import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function RightSlide({
  children,
  design,
}: {
  children: ReactNode;
  design: string | undefined;
}) {
  const variants = {
    hidden: { opacity: 0, x: 200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="enter"
      transition={{ ease: "easeOut", duration: 0.6 }}
      className={design || ""}
    >
      {children}
    </motion.div>
  );
}
