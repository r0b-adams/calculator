import React, { useState } from 'react'

import '../Calculator/Calculator.css'

export default function Calculator() {

    const [operand, setOperand] = useState('');
    const [expression, setExpression] = useState([]);
    const [result, setResult] = useState('');

    // reset all state hooks
    const handleClearAll = () => {
        setOperand('');
        setExpression([]);
        setResult('');
    }

    // reset current operand state
    const handleClearOperand = () => {
        setOperand('');
    }

    // user clicks a number button
    const handleNum = ({ target: { value } }) => {

        // if user has entered zero, they can only proceed with a decimal point
        if (operand !== '0') {

            // maximum number of digits is 15
            if (operand.length < 15) {
                let updatedOperand = operand;   // copy state
                updatedOperand += value; // append digit to operand
                setOperand(updatedOperand);     // update state
            } else {
                alert('maximum operand length (15) exceeded'); // operand too long
            }
        }
    }


    return (
        <>
            <p className='input'>{expression.join('') + operand}</p>
            <p className='output'>{result}</p>

            <button className='operator-btn' type='button'>BKSPC</button>
            <button className='clear-btn' type='button' onClick={handleClearOperand}>C</button>
            <button className='clear-btn' type='button' onClick={handleClearAll}>AC</button>


            <button className='operator-btn' type='button' onClick={handleOperator} value='/'>÷</button>

            <button className='numpad-btn' type='button' onClick={handleNum} value='7'>7</button>
            <button className='numpad-btn' type='button' onClick={handleNum} value='8'>8</button>
            <button className='numpad-btn' type='button' onClick={handleNum} value='9'>9</button>

            <button className='operator-btn' type='button' onClick={handleOperator} value='*'>×</button>

            <button className='numpad-btn' type='button' onClick={handleNum} value='4'>4</button>
            <button className='numpad-btn' type='button' onClick={handleNum} value='5'>5</button>
            <button className='numpad-btn' type='button' onClick={handleNum} value='6'>6</button>

            <button className='operator-btn' type='button' onClick={handleOperator} value='-'>-</button>

            <button className='numpad-btn' type='button' onClick={handleNum} value='1'>1</button>
            <button className='numpad-btn' type='button' onClick={handleNum} value='2'>2</button>
            <button className='numpad-btn' type='button' onClick={handleNum} value='3'>3</button>

            <button className='operator-btn' type='button' onClick={handleOperator} value='+'>+</button>

            <button className='numpad-btn' type='button' onClick={toggleNegative}>+/-</button>
            <button className='numpad-btn' type='button' onClick={handleNum} value='0'>0</button>

            <button className='numpad-btn' type='button' onClick={handleDecimal} value='.'>.</button>
            <button className='operator-btn' type='button' value='='>=</button>
        </>
    )
}
