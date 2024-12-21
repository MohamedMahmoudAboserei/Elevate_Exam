import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-screen"
        >
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </motion.div>
    );
}