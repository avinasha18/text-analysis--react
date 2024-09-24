import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextArea from './components/TextArea';
import Statistics from './components/Statistics';
import ReplaceForm from './components/ReplaceForm';
import Modal from './components/Modal';
import TypingEffect from './components/TypingEffect';
import { highlightText } from './utils/HighlightText';

const App = () => {
  const [text, setText] = useState('');
  const [uniqueWords, setUniqueWords] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    const words = text.toLowerCase().match(/\b[\w']+\b/g) || [];
    setUniqueWords(new Set(words).size);
    setCharCount(text.replace(/[^a-zA-Z0-9]/g, '').length);
    highlightMatches();
  }, [text, searchString, currentMatchIndex, caseSensitive, wholeWord]);

  const highlightMatches = () => {
    if (searchString) {
      const flags = caseSensitive ? "g" : "gi"; 
      const regex = wholeWord
        ? new RegExp(`\\b${searchString}\\b`, flags)
        : new RegExp(searchString, flags); 
      
      const matches = [...text.matchAll(regex)];
      const highlightedText = text.replace(regex, (match) => `<mark>${match}</mark>`);
      setHighlightedText(highlightedText);
      setMatchCount(matches.length);
      setCurrentMatchIndex(matches.length > 0 ? 1 : 0);
    } else {
      setHighlightedText(text);
      setMatchCount(0);
      setCurrentMatchIndex(0);
    }
  };
  

  const handleReplace = (replaceAll = false) => {
    const flags = caseSensitive ? "g" : "gi"; 
    const regex = wholeWord
      ? new RegExp(`\\b${searchString}\\b`, flags)
      : new RegExp(searchString, flags);
  
    if (replaceAll) {
      setText((prevText) => prevText.replace(regex, replaceString));
    } else {
      let matchCount = 0;
      let newText = text.replace(regex, (match, offset) => {
        matchCount++;
        if (matchCount === currentMatchIndex) {
          return replaceString;
        }
        return match;
      });
      setText(newText);
    }
  };
  
  
  const handleNext = () => {
    if (currentMatchIndex < matchCount) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentMatchIndex > 1) {
      setCurrentMatchIndex(currentMatchIndex - 1);
    }
  }

  const handleClear = () => {
    setIsModalOpen(true);
  };

  const confirmClear = () => {
    setText('');
    setSearchString('');
    setReplaceString('');
    setIsModalOpen(false);
    toast.info('Text cleared');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-8"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
            <TypingEffect text="Text Analyzer" />
          </h1>
          <TextArea
            text={text}
            setText={setText}
            highlightedText={highlightedText}
            textAreaRef={textAreaRef}
          />
          <Statistics uniqueWords={uniqueWords} charCount={charCount} />
          <ReplaceForm
            searchString={searchString}
            setSearchString={setSearchString}
            replaceString={replaceString}
            setReplaceString={setReplaceString}
            handleReplace={handleReplace}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            matchCount={matchCount}
            currentMatchIndex={currentMatchIndex}
            caseSensitive={caseSensitive}
            setCaseSensitive={setCaseSensitive}
            wholeWord={wholeWord}
            setWholeWord={setWholeWord}
          />
          <div className="mt-4 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
              onClick={handleClear}
            >
              Clear All
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmClear} />
        )}
      </AnimatePresence>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </motion.div>
  );
};

export default App;
