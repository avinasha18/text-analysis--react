import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const TextArea = ({ text, setText, highlightedText }) => {
  const textAreaRef = useRef(null);
  const highlightedDivRef = useRef(null);

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
      <textarea
        ref={textAreaRef}
        className="w-full h-64 p-4 border-2 border-indigo-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300 ease-in-out resize-none bg-transparent relative z-10 caret-black"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        style={{
          color: 'transparent', 
          caretColor: 'black', 
          zIndex: 10, 
        }}
        onScroll={handleScroll} 
      />
      <div
        ref={highlightedDivRef}
        className="absolute inset-0 pointer-events-none p-4 whitespace-pre-wrap overflow-hidden"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
        style={{
          color: 'rgba(0, 0, 0, 0.8)',
          backgroundColor: 'transparent',
          zIndex: 1,
          overflowY: 'auto', 
          height: '100%', 
        }}
      />
    </motion.div>
  );
};

export default TextArea;
