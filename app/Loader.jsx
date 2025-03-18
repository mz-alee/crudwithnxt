import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.div
        className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
      />
    </div>
  );
};

export default Loader;
