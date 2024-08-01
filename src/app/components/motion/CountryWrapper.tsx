import { Variants, motion } from "framer-motion";
import React, { PropsWithChildren } from "react";

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

interface Props extends PropsWithChildren {
  onClick: () => void;
}

export const CountryWrapper = React.forwardRef<HTMLLIElement, Props>(
  ({ onClick, children }, ref) => (
    <motion.li
      className="relative flex items-center gap-2 p-2 hover:bg-white/20 rounded-lg group"
      variants={itemVariants}
      onClick={onClick}
      animate="visible"
      initial="hidden"
      exit="hidden"
      ref={ref}
      layout
    >
      {children}
    </motion.li>
  )
);
