import React from 'react';
import './AlphabetSidebar.css';

const AlphabetSidebar = ({ onLetterClick }) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="alphabet-sidebar">
      {letters.map((letter) => (
        <div
          key={letter}
          className="letter"
          onClick={() => onLetterClick(letter)}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default AlphabetSidebar;
