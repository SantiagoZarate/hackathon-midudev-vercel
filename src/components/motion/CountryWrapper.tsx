import { Variants, motion } from "framer-motion";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {}

const itemVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

export function CountryWrapper(args: Props) {
  return (
    <motion.button
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout
      onClick={args.onClick}
      className="relative flex items-center gap-2 p-2 hover:bg-white/20 rounded-lg group"
    >
      {args.children}
    </motion.button>
  );
}
