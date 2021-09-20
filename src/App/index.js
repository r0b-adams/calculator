import React, { useState } from 'react'

import './Calculator.css'

export default function App() {

  const [input, setInput] = useState('');  // start with a string for now

  return (
    <div>

        <p className='input'>{input}</p>
        <p className='output'></p>

        <button className='clear-btn' type='button'>C</button>

        <button className='operator-btn' type='button' value='%'>%</button>
        <button className='operator-btn' type='button' value='÷'>÷</button>

        <button className='numpad-btn' type='button' value='7'>7</button>
        <button className='numpad-btn' type='button' value='8'>8</button>
        <button className='numpad-btn' type='button' value='9'>9</button>
        <button className='operator-btn' type='button' value='×'>×</button>

        <button className='numpad-btn' type='button' value='4'>4</button>
        <button className='numpad-btn' type='button' value='5'>5</button>
        <button className='numpad-btn' type='button' value='6'>6</button>
        <button className='operator-btn' type='button' value='-'>-</button>

        <button className='numpad-btn' type='button' value='1'>1</button>
        <button className='numpad-btn' type='button' value='2'>2</button>
        <button className='numpad-btn' type='button' value='3'>3</button>
        <button className='operator-btn' type='button' value='+'>+</button>

        <button className='numpad-btn' type='button' value='+/-'>+/-</button>
        <button className='numpad-btn' type='button' value='0'>0</button>
        <button className='numpad-btn' type='button' value='.'>.</button>
        <button className='operator-btn' type='button' value='='>=</button>
    </div>
  )
}
