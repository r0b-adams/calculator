import React, { useState } from 'react'

import '../Calculator/Calculator.css'

export default function Calculator() {

    const [operand, setOperand] = useState(null);
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');

    const handleClear = () => {
        setOperand(null);
        setExpression('');
        setResult('');
    }

    const handleClick = ({ target }) => {
        let updatedExpression = expression;
        updatedExpression += target.value;

        setExpression(updatedExpression);
    }

    const evalExp = () => {
        const updatedResult = eval(expression);

        setResult(expression + ' = ' + updatedResult);
        setExpression(updatedResult);
    }

    return (
        <>
            <p className='input'>{expression}</p>
            <p className='output'>{result}</p>

            <button className='clear-btn' type='button' onClick={handleClear}>Clear</button>

            <button className='operator-btn' type='button' onClick={handleClick} value='%'>%</button>
            <button className='operator-btn' type='button' onClick={handleClick} value='/'>÷</button>

            <button className='numpad-btn' type='button' onClick={handleClick} value='7'>7</button>
            <button className='numpad-btn' type='button' onClick={handleClick} value='8'>8</button>
            <button className='numpad-btn' type='button' onClick={handleClick} value='9'>9</button>
            <button className='operator-btn' type='button' onClick={handleClick} value='*'>×</button>

            <button className='numpad-btn' type='button' onClick={handleClick} value='4'>4</button>
            <button className='numpad-btn' type='button' onClick={handleClick} value='5'>5</button>
            <button className='numpad-btn' type='button' onClick={handleClick} value='6'>6</button>
            <button className='operator-btn' type='button' onClick={handleClick} value='-'>-</button>

            <button className='numpad-btn' type='button' onClick={handleClick} value='1'>1</button>
            <button className='numpad-btn' type='button' onClick={handleClick} value='2'>2</button>
            <button className='numpad-btn' type='button' onClick={handleClick} value='3'>3</button>
            <button className='operator-btn' type='button' onClick={handleClick} value='+'>+</button>

            <button className='numpad-btn' type='button'>+/-</button>
            <button className='numpad-btn' type='button' onClick={handleClick} value='0'>0</button>
            <button className='numpad-btn' type='button' onClick={handleClick} value='.'>.</button>
            <button className='operator-btn' type='button' onClick={evalExp}>=</button>
        </>
    )
}
