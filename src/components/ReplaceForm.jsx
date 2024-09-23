import React from 'react';
import { motion } from 'framer-motion';

const ReplaceForm = ({
  searchString,
  setSearchString,
  replaceString,
  setReplaceString,
  handleReplace,
  handleNext,
  handlePrevious,
  matchCount,
  currentMatchIndex,
  caseSensitive,
  setCaseSensitive,
  wholeWord,
  setWholeWord,
}) => {
  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-2 text-indigo-700">Replace Text</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search for..."
          className="p-2 border-2 border-indigo-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
        />
        <input
          type="text"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          placeholder="Replace with..."
          className="p-2 border-2 border-indigo-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
        />
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out"
              onClick={() => handleReplace(false)}
            >
              Replace
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out"
              onClick={() => handleReplace(true)}
            >
              Replace All
            </motion.button>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
              onClick={handlePrevious}
              disabled={currentMatchIndex <= 1}
            >
              Previous
            </motion.button>
            <span className="text-sm text-gray-600">
              {matchCount > 0 ? `${currentMatchIndex} of ${matchCount}` : 'No matches'}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
              onClick={handleNext}
              disabled={currentMatchIndex >= matchCount}
            >
              Next
            </motion.button>
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="text-gray-700">Case Sensitive</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={wholeWord}
              onChange={(e) => setWholeWord(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="text-gray-700">Whole Word</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default ReplaceForm;
