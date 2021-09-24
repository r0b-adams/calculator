import React, { useState } from 'react'; // import hook to store component state
import { create, all } from 'mathjs';    // import Math.js to evaluate expressions
import '../Calculator/Calculator.css';   // import styles

/**
 * Math.js Documentation:
 * https://mathjs.org/docs/index.html
 */
const math = create(all); // instantiate math to parse/eval expression strings

export default function Calculator() {

    // initial state
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

    // TODO: restrict number of digits after decimal to 10
    // user clicks a number button
    // params: deconstruct event.target.value as digit
    const handleNum = ({ target: { value: digit } }) => {

        // if user has entered zero, they can only proceed with a decimal point
        if (operand !== '0') {

            // maximum number of digits is 15
            if (operand.length < 15) {

                // copy state, append digit, and update state
                let updatedOperand = operand;
                updatedOperand += digit;
                setOperand(updatedOperand);
            } else {
                alert('maximum operand length (15) exceeded');
            }
        }
    }

    // toggle current operand to be negative or positive
    const toggleNegative = () => {
        const isNegative = operand.startsWith('(-');

        if (isNegative) {

            // if operand only contains '(-', reset operand to empty string
            if (operand === '(-') {
                setOperand('');

            // operand is some form of '(-XY.Z' or '(-XY.Z)'
            } else {
                let updatedOperand;

                // remove negative sign and any parantheses
                operand.endsWith(')') ? updatedOperand = operand.substring(2, operand.length - 1)
                                      : updatedOperand = operand.substring(2);

                setOperand(updatedOperand);
            }

        // number is positive
        } else {

            // prepend '(-' to operand and update state
            let updatedOperand = `(-${operand}`;
            setOperand(updatedOperand);
        }
    }

    // add a decimal point to current operand
    const handleDecimal = () => {
        if (operand.includes('.')) { // operand already contains decimal point
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
        const updatedExpression = [...expression]; // copy state
        const validatedOperand = checkOperand();   // check operand

        // if valid operand, push it and operator to expression array
        if (validatedOperand) {
            updatedExpression.push(validatedOperand);
            updatedExpression.push(operator);
            setExpression(updatedExpression);

        // operand is empty or has no numbers, check expression
        // if it contains elements, replace the previous operator with new one
        } else if (expression.length) {
            updatedExpression[updatedExpression.length - 1] = operator;
            setExpression(updatedExpression);
        }
        setOperand('');
    }

    // after user clicks operator or '=', check the operand and add any needed closing chars
    // if operand is valid, closes any open parentheses and adds zero if ends in decimal
    // else returns undefined
    const checkOperand = () => {

        // make sure there is something to work with
        if (operand.length && operand !== '(-') {
            let checkedOperand = operand;

            // append zero if operand ends with decimal
            if (checkedOperand.endsWith('.')) {
                checkedOperand += '0';
            }

            // append ')' if operand is negative and it isn't already closed
            if (checkedOperand.startsWith('(-') && !checkedOperand.endsWith(')')) {
                checkedOperand += ')';
            }
            return checkedOperand;
        }
        return undefined;
    }

    // user clicks equals sign to evaluate expression
    const handleEquals = () => {
        const finalExpression = [...expression]; // copy state
        const lastOperand = checkOperand();      // check operand

        if (lastOperand) {
            try { // last operand is valid, add to expression and evaluate
                finalExpression.push(lastOperand);
                let res = math.evaluate(finalExpression.join('')); // get the result
                res = math.format(res, {precision: 10});           // set max digits after decimal to 10

                // update state
                setResult(`= ${res}`); // prepend '=' to result for display
                setOperand(res);       // result becomes first operand in next expression
                setExpression([]);
            } catch (error) {
                console.log(error);
                alert('invalid expression');
            }
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
            <button className='operator-btn' type='button' onClick={handleEquals}>=</button>
        </>
    );
}
