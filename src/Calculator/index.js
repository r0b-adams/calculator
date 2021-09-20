import React, { useState } from 'react'

import '../Calculator/Calculator.css'

export default function Calculator() {

    const [input, setInput] = useState('');   // start with a string for now
    const [output, setOutput] = useState('');

    const handleClear = () => {
        setInput('');
        setOutput('');
    }

    const handleClick = ({target}) => {
        const {value} = target;
        let newInput = input;
        newInput += value;
        setInput(newInput);
    }

    const evalExp = () => {
        // NOTE: eval() only works with valid expressions
        // will throw error if unexpected token encountered
        const result = eval(input);

        setOutput(input + ' = ' + result);
        setInput(result);
    }

    return (
        <>
            <p className='input'>{input}</p>
            <p className='output'>{output}</p>

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
            <button className='operator-btn' type='button' onClick={evalExp} value='='>=</button>
        </>
    )
}
