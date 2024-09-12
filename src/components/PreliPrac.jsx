import React, { useState } from 'react';

const sequence = [
    '#2ecc71', '#2980b9', '#8e44ad', 
    '#2c3e50', '#16a085', '#f1c40f', 
    '#d35400', '#c0392b', '#7ed6df'
]; // sakto nga sunod sa color

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}; // shuffle

const PreliPrac = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorCounts, setColorCounts] = useState(Array(10).fill(0));
  const [isRolling, setIsRolling] = useState(false);
  const [currentRollIndex, setCurrentRollIndex] = useState(null);
  const [rollInterval, setRollInterval] = useState(null);

  const handleRollClick = () => {
    if (isRolling) {
      stopRoll();
    } else {
      roll();
    }
  }; // click

  const roll = () => {
    setIsRolling(true);
    setSelectedColor(null);
    
    const newSequence = shuffle([...Array(9).keys()]);
    let sequenceIndex = 0;

    const intervalId = setInterval(() => {
      if (sequenceIndex >= newSequence.length) sequenceIndex = 0;
      setCurrentRollIndex(newSequence[sequenceIndex]);
      sequenceIndex++;
    }, 100);
    
    setRollInterval(intervalId);
  };

  const stopRoll = () => {
    clearInterval(rollInterval);
    const finalIndex = currentRollIndex;
    setSelectedColor(finalIndex);
    setCurrentRollIndex(null);
    setColorCounts(prevCounts => {
      const newCounts = [...prevCounts];
      newCounts[finalIndex] += 1;
      return newCounts;
    });
    setIsRolling(false);
  };

  return (
    <div style={{textAlign: 'center', 
                fontFamily: 'Arial, sans-serif',
                minHeight: '50vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between' }}>
      <div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          margin: '20px 0', 
          flexWrap: 'wrap'
        }}>
          {sequence.map((color, index) => (
            <div key={color} style={{ 
              backgroundColor: color, 
              width: '50px', 
              height: '50px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px', 
              borderRadius: '5px'
            }}>{colorCounts[index]}</div> // upper grid
          ))}
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '10px', 
          margin: '20px auto', 
          width: '450px'
          
        }}>
          {sequence.slice(0, 9).map((color, index) => (
            <div key={index} style={{ 
              backgroundColor: color, 
              height: '130px', 
              borderRadius: '7px',
              border: (currentRollIndex === index || selectedColor === index) ? '7px solid white' : '7px solid grey' // border color
            }}></div> // main grid
          ))}
        </div>
        <button 
          onClick={handleRollClick} 
          style={{ 
            padding: '15px 30px', 
            fontSize: '20px', 
            backgroundColor: isRolling ? 'red' : 'green', 
            color: 'white', 
            borderRadius: '5px',
            fontWeight: 'bold',
            margin: '1px'
          }} 
        >
          {isRolling ? 'Stop Roll' : 'Start Roll'}
        </button>
      </div>
    </div>
  );
};

export default PreliPrac;