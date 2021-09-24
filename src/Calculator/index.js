import React, { useState } from 'react';
import { create, all } from 'mathjs';
import '../Calculator/Calculator.css';

// https://mathjs.org/docs/index.html
const math = create(all);

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
                let updatedOperand = operand;   // copy state
                updatedOperand += digit; // append digit to operand
                setOperand(updatedOperand);     // update state
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
                let updatedOperand;
                if (operand.endsWith(')')) {

                    // has closing parenthesis, grab everything between '(-' and ')'
                    updatedOperand = operand.substring(2, operand.length - 1);
                } else {

                    // no closing parenthesis, grab everything after '(-'
                    updatedOperand = operand.substring(2);
                }
                setOperand(updatedOperand);
            }

        // number is positive, prepend '(-' and update state
        } else {
            let updatedOperand = `(-${operand}`;
            setOperand(updatedOperand);
        }
    }

    // add a decimal point to current operand
    const handleDecimal = () => {
        if (operand.includes('.')) {     // operand already contains decimal point
            alert('invalid format');
        } else {
            let updatedOperand = operand;              // copy state
            if (!operand.length || operand === '(-') { // if operand empty or opens with negative
                updatedOperand += '0';                 // pad with a zero
            }
            updatedOperand += '.';        // append decimal point
            setOperand(updatedOperand);   // update state
        }
    }

    // validate operand, pad with any needed chars, and push to expression
    // params: deconstruct event.target.value as operator
    const handleOperator = ({ target: { value: operator } }) => {
        let updatedExpression = [...expression];

        // be sure there is something to work with
        if (operand.length && operand !== '(-') {
            let updatedOperand = operand;

            // append zero if operand ends with decimal
            if (updatedOperand.endsWith('.')) {
                updatedOperand += '0';
            }

            // append ')' if operand is negative
            if (updatedOperand.startsWith('(-')) {
                updatedOperand += ')';
            }

            updatedExpression.push(updatedOperand);
            updatedExpression.push(operator);
            setExpression(updatedExpression);
            setOperand('');

        // operand is empty; check expression
        // if it contains elements, replace the previous operator with new one
        } else if (expression.length) {
            updatedExpression[updatedExpression.length - 1] = operator;
            setExpression(updatedExpression);
        }
    }

    return (
        <>
            <p className='input'>{expression.join(' ') + ' ' + operand}</p>

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
