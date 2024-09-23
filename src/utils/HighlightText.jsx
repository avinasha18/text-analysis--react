export const highlightText = (text, searchString, currentMatchIndex) => {
    if (!searchString) return { highlightedText: text, count: 0 };
  
    const regex = new RegExp(`(${searchString})`, 'gi');
    const parts = text.split(regex);
    let count = 0;
    const highlightedText = parts
      .map((part, i) => {
        if (regex.test(part)) {
          count++;
          return count === currentMatchIndex
            ? `<span class="highlight-current" style="background-color: #fbbf24;">${part}</span>`
            : `<span class="highlight" style="background-color: #fde68a;">${part}</span>`;
        }
        return part;
      })
      .join('');
  
    return { highlightedText, count };
  };