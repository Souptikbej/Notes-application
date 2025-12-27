import { motion } from "framer-motion";

const AnimatedLogo = () => {
  return (
    <motion.h1
      initial={{ y: -12, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        y: { duration: 0.45, ease: "easeOut" },
        opacity: { duration: 0.45, ease: "easeOut" },
        backgroundPosition: {
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        },
      }}
      className="
        relative
        text-3xl sm:text-4xl font-bold tracking-wide
        bg-gradient-to-r from-sky-400 via-pink-500 to-purple-500
        bg-[length:200%_200%]
        bg-clip-text text-transparent
        select-none
      "
    >
      MyNotes
    </motion.h1>
  );
};

export default AnimatedLogo;
