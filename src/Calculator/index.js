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
    // params: deconstruct event.target.value as digit
    const handleNum = ({ target: { value: digit } }) => {

        // if user has entered zero, they can only proceed with a decimal point
        if (operand !== '0') {

            // maximum number of digits is 15
            if (operand.length < 15) {
                let updateOperand = operand;   // copy state
                updateOperand += digit; // append digit to operand
                setOperand(updateOperand);     // update state
            } else {
                alert('maximum operand length (15) exceeded');
            }
        }
    }

    // toggle current operand to be negative
    const toggleNegative = () => {
        const isNegative = operand.startsWith('(-');

        if (isNegative) {
            if (operand === '(-') { // if operand only contains '(-',
                setOperand('');         // reset operand to empty string

            // operand is some form of '(-XY.Z' or '(-XY.Z)'
            } else {
                let updateOperand;
                if (operand.endsWith(')')) {

                    // has closing parenthesis, grab everything between '(-' and ')'
                    updateOperand = operand.substring(2, operand.length - 1);
                } else {

                    // no closing parenthesis, grab everything after '(-'
                    updateOperand = operand.substring(2);
                }
                setOperand(updateOperand);
            }

        // number is positive, prepend '(-' and update state
        } else {
            let updateOperand = `(-${operand}`;
            setOperand(updateOperand);
        }
    }

    // add a decimal point to current operand
    const handleDecimal = () => {
        if (operand.includes('.')) {      //operand already contains decimal point
            alert('invalid format');
        } else {
            let updateOperand = operand; // copy state
            if (!operand.length) {       // if operand empty,
                updateOperand += '0';       // pad with a zero
            }
            updateOperand += '.';        // append decimal point
            setOperand(updateOperand);   // update state
        }
    }

    // params: deconstruct event.target.value as operator
    // TODO: if operand has ( append )
    // TODO: if operand === "(-", do nothing
    const handleOperator = ({ target: { value: operator } }) => {
        let updateOperand = operand;
        let updateExpression = [...expression];

        // if user has not entered any numbers for this operand
        if (!updateOperand.length) {

            // and there are elements in the expression array
            if (expression.length) {
                updateExpression[updateExpression.length - 1] = operator; // replace prev operator with new one
                setExpression(updateExpression);                          // update state
            }

        } else {
            updateExpression.push(updateOperand);  // add operand to expression array
            updateExpression.push(operator);       // add operator to expression array
            setExpression(updateExpression);       // update expression state
            setOperand('');                        // reset operand state
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
    );
}
