import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  isLoading: boolean
}

export function LoadingMessage({ isLoading }: Props) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 animate-pulse z-50 grid place-content-center">
          <motion.p
            animate={{
              scale: 1, filter: 'blur(0px)', transition: {
                stiffness: 50,
                type: "spring",
              }
            }}
            initial={{ scale: 3, filter: 'blur(10px)' }}
          >
            Let me see what ive got for you
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
