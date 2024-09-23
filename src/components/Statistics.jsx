import React from 'react';
import { motion } from 'framer-motion';

const Statistics = ({ uniqueWords, charCount }) => {
  return (
    <motion.div
      className="mt-4 p-4 bg-indigo-100 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-2 text-indigo-700">Statistics</h2>
      <div className="flex justify-between">
        <motion.p
          className="text-indigo-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Unique Words: {uniqueWords}
        </motion.p>
        <motion.p
          className="text-indigo-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Character Count: {charCount}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Statistics;