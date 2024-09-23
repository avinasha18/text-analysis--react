import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const TextArea = ({ text, setText, highlightedText }) => {
  const textAreaRef = useRef(null);
  const highlightedDivRef = useRef(null);

  // Function to sync scroll between textarea and the highlighted div
  const handleScroll = () => {
    if (highlightedDivRef.current && textAreaRef.current) {
      highlightedDivRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Hidden textarea overlay for user input */}
      <textarea
        ref={textAreaRef}
        className="w-full h-64 p-4 border-2 border-indigo-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out resize-none bg-transparent relative z-10 caret-black"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        style={{
          color: 'transparent', // Hide actual text
          caretColor: 'black', // Ensure the caret is still visible
          zIndex: 10, // Ensure textarea is on top for input
        }}
        onScroll={handleScroll} // Sync scroll position
      />
      {/* Render highlighted text below textarea */}
      <div
        ref={highlightedDivRef}
        className="absolute inset-0 pointer-events-none p-4 whitespace-pre-wrap overflow-hidden"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
        style={{
          color: 'rgba(0, 0, 0, 0.8)', // Set text color
          backgroundColor: 'transparent',
          zIndex: 1,
          overflowY: 'auto', // Enable scrolling
          height: '100%', // Match height of textarea
        }}
      />
    </motion.div>
  );
};

export default TextArea;
