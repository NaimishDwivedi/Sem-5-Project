import React, { useState, useEffect } from 'react';
import './bs.css';

const BinarySearch = () => {
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [animations, setAnimations] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const binarySearchAll = (arr, value) => {
    let left = 0;
    let right = arr.length - 1;
    let indexes = [];
    let anims = [];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      anims.push({ left, mid, right, arr: [...arr] });

      if (arr[mid] === value) {
        indexes.push(mid);
        let i = mid - 1;
        while (i >= left && arr[i] === value) {
          indexes.push(i);
          i--;
        }
        i = mid + 1;
        while (i <= right && arr[i] === value) {
          indexes.push(i);
          i++;
        }
        anims.push({
          left,
          mid,
          right,
          arr: [...arr],
          found: true,
          indexes,
        });
        setAnimations(anims);
        return indexes;
      } else if (arr[mid] < value) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    anims.push({ left, mid: null, right, arr: [...arr], found: false });
    setAnimations(anims);
    return indexes;
  };

  const visualizeArray = (anim) => {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    anim.arr.forEach((value, i) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${value * 10}px`; // Height based on value
      bar.style.lineHeight = `${value * 10}px`; // Center text vertically
      bar.innerText = value; // Display value
      if (i === anim.mid) {
        bar.style.backgroundColor = anim.found ? 'green' : 'red'; // Highlight mid element
      } else {
        bar.style.backgroundColor = '#007bff'; // Default color
      }
      container.appendChild(bar);
    });
  };

  const logVariables = (left, mid, right, arr, searchValue, found, indexes) => {
    const logContainer = document.getElementById('log-container');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `
      <strong>Left:</strong> ${left}, <strong>Mid:</strong> ${
        mid !== null ? mid : 'N/A'
      }, <strong>Right:</strong> ${right}<br>
      <strong>Array:</strong> [${arr.join(', ')}] <br>
      ${
        mid !== null
          ? `Comparing value <strong>${arr[mid]}</strong> with search value <strong>${searchValue}</strong>`
          : ''
      }
      ${
        found !== undefined
          ? found
            ? ` - Value found at index(es): ${indexes.join(', ')}`
            : ' - Value not found'
          : ''
      }
    `;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
  };

  const startSearch = () => {
    const userInput = document.getElementById('userInput').value;
    const search = parseInt(document.getElementById('searchValue').value, 10);

    if (userInput.trim()) {
      let arr = userInput.split(',').map(Number);
      if (arr.some(isNaN)) {
        alert('Please enter valid numbers separated by commas.');
        return;
      }

      const sortedArray = [...arr].sort((a, b) => a - b);
      if (!arraysAreEqual(arr, sortedArray)) {
        arr = sortedArray;
        setArray(arr);
        alert('Array has been sorted in ascending order for binary search.');
      } else {
        setArray(arr);
      }

      if (isNaN(search)) {
        alert('Please enter a valid search value.');
        return;
      }

      setAnimations([]);
      setCurrentStep(0);
      binarySearchAll([...arr], search);
      document.getElementById('log-container').innerHTML = ''; // Clear previous logs
    } else {
      alert('Please enter numbers to search.');
    }
  };

  const updateStep = () => {
    if (animations.length > 0 && animations[currentStep]) {
      const { left, mid, right, arr, found, indexes } = animations[currentStep];
      visualizeArray(animations[currentStep]);
      logVariables(left, mid, right, arr, searchValue, found, indexes);
    }
  };

  const nextStep = () => {
    if (currentStep < animations.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  useEffect(() => {
    if (animations.length > 0) {
      updateStep();
    }
  }, [currentStep, animations]);

  return (
    <div className="container">
      <div className="input-section">
        <input
          type="text"
          id="userInput"
          placeholder="Enter numbers separated by commas"
        />
        <input
          type="text"
          id="searchValue"
          placeholder="Enter value to search"
        />
        <button onClick={startSearch}>Start Sorting and Searching</button>
      </div>
      <div className="visualization-section">
        <div id="array-container"></div>
        <div id="log-container"></div>
      </div>
      <div className="control-section">
        <button onClick={prevStep} disabled={currentStep === 0}>Prev</button>
        <button onClick={nextStep} disabled={currentStep >= animations.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default BinarySearch;
