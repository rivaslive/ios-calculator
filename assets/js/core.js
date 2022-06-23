(function () {
  "use strict"
  
  const OPERATIONS = {
    SUM: 'SUM',
    SUBTRACT: 'SUBTRACT',
    SPLIT: 'SPLIT',
    MULTIPLY: 'MULTIPLY',
    PERCENT: 'PERCENT',
  };
  
  // result ids
  const result = document.querySelector('#result');
  
  // actions ids
  const ac = document.querySelector('#ac')
  const del = document.querySelector('#del')
  const percent = document.querySelector('#percent')
  const changeSigne = document.querySelector('#change-signe')
  const dot = document.querySelector('#dot')
  const equal = document.querySelector('#equal')
  
  // operation ids
  const split = document.querySelector('#split')
  const subtract = document.querySelector('#subtract')
  const plus = document.querySelector('#plus')
  const multiply = document.querySelector('#multiply')
  
  // numbers ids
  const one = document.querySelector('#one')
  const two = document.querySelector('#two')
  const three = document.querySelector('#three')
  const four = document.querySelector('#four')
  const five = document.querySelector('#five')
  const six = document.querySelector('#six')
  const seven = document.querySelector('#seven')
  const eight = document.querySelector('#eight')
  const nine = document.querySelector('#nine')
  const zero = document.querySelector('#zero')
  
  const operationMethods = {
    [OPERATIONS.SUM]: (first, second) => {
      return first + second;
    },
    [OPERATIONS.SUBTRACT]: (first, second) => {
      return first - second;
    },
    [OPERATIONS.MULTIPLY]: (first, second) => {
      return first * second;
    },
    [OPERATIONS.SPLIT]: (first, second) => {
      return first / second;
    },
    [OPERATIONS.PERCENT]: (num, per) => {
      return (num / 100) * per;
    }
  }
  
  // utilities
  let operations = [];
  let operation = null; // sum, subtract, split or multiply
  let firstValue = null;
  let secondValue = null;
  let waitSecondOperation = false;
  let isDecimal = false;
  let total = '';
  let current = '';
  
  const resetVars = () => {
    operation = null; // sum, subtract, split or multiply
    firstValue = null;
    secondValue = null;
    waitSecondOperation = false;
    isDecimal = false;
    current = '';
  }
  
  const renderResult = (value = current) => {
    result.innerHTML = value;
  }
  
  const changeInput = (val) => {
    return () => {
      if (val === '.') {
        if (current.includes('.') || current === '') return;
        return isDecimal = true;
      }
      if (total) {
        total = '';
      }
      if (waitSecondOperation) {
        current = `${val}`
      } else {
        current = `${current}${isDecimal ? '.' : ''}${val}`
      }
      renderResult();
      waitSecondOperation = false;
      
      return isDecimal = false;
    }
  }
  
  const removeLastNumber = () => {
    if (typeof current === 'number') {
      resetVars();
      return renderResult();
    }
    current = current.slice(0, current.length - 1);
    return renderResult();
  }
  
  const checkAction = (op) => {
    return () => {
      const indexCurrent = current.length;
      const indexOperation = operations.length;
      
      if (indexCurrent) {
        operation = op;
        firstValue = Number(current);
        waitSecondOperation = true;
      } else if (indexOperation) {
        operation = op;
        firstValue = operations[indexOperation - 1].result;
        waitSecondOperation = true;
      }
    }
  }
  
  const makeOperation = () => {
    secondValue = Number(current);
    
    if (firstValue === '' || firstValue === null) return;
    const value = operationMethods[operation](firstValue, secondValue);
    
    operations.push({
      firstValue,
      secondValue,
      result: value,
    });
    
    resetVars();
    total = String(value);
    renderResult(total);
  }
  
  const onChangeSigne = () => {
    if (!current) return;
    const currentInt = Number(current);
    current = String(currentInt * -1);
    return renderResult();
  }
  
  const restoreCal = () => {
    resetVars();
    total = '';
    operations = [];
    renderResult();
  }
  
  // add click event
  one.onclick = changeInput(1);
  two.onclick = changeInput(2);
  three.onclick = changeInput(3);
  four.onclick = changeInput(4);
  five.onclick = changeInput(5);
  six.onclick = changeInput(6);
  seven.onclick = changeInput(7);
  eight.onclick = changeInput(8);
  nine.onclick = changeInput(9);
  zero.onclick = changeInput(0);
  dot.onclick = changeInput('.');
  
  del.onclick = removeLastNumber;
  plus.onclick = checkAction(OPERATIONS.SUM);
  subtract.onclick = checkAction(OPERATIONS.SUBTRACT);
  split.onclick = checkAction(OPERATIONS.SPLIT);
  multiply.onclick = checkAction(OPERATIONS.MULTIPLY);
  percent.onclick = checkAction(OPERATIONS.PERCENT);
  
  ac.onclick = restoreCal;
  equal.onclick = makeOperation;
  changeSigne.onclick = onChangeSigne;
  
  // press events
  const KEYDOWN_EVENTS = {
    '1': changeInput(1),
    '2': changeInput(2),
    '3': changeInput(3),
    '4': changeInput(4),
    '5': changeInput(5),
    '6': changeInput(6),
    '7': changeInput(7),
    '8': changeInput(8),
    '9': changeInput(9),
    '0': changeInput(0),
    '=': makeOperation,
    'Enter': makeOperation,
    'Backspace': removeLastNumber,
    '+': checkAction(OPERATIONS.SUM),
    '-': checkAction(OPERATIONS.SUBTRACT),
    '*': checkAction(OPERATIONS.MULTIPLY),
    '/': checkAction(OPERATIONS.SPLIT),
    '%': checkAction(OPERATIONS.PERCENT)
  }
  
  document.addEventListener('keydown', (evt) => {
    const {key} = evt;
    
    const funcAction = KEYDOWN_EVENTS[key];
    if (funcAction) funcAction();
  })
})()
