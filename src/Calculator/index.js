import React, { useState } from 'react'; // import hook to store component state
import { create, all } from 'mathjs';    // import Math.js to evaluate expressions
import '../Calculator/Calculator.css';   // import styles

import { Button, TextField, Box, Container, Grid, Paper } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';

/**
 * Math.js Documentation:
 * https://mathjs.org/docs/index.html
 */
const math = create(all); // instantiate math to parse/eval expression strings

export default function Calculator() {

    // initial state
    const [operand, setOperand] = useState('');
    const [expression, setExpression] = useState([]);

    // reset all state hooks
    const handleClearAll = () => {
        setOperand('');
        setExpression([]);
    }

    // reset current operand state
    const handleClearOperand = () => {
        setOperand('');
    }

    // user clicks a number button
    // params: deconstruct event.target.value as digit
    const handleNum = ({ target: { value: digit } }) => {
        let copy = operand;
        copy += digit;

        // returns array of digit strings
        // if decimal point, opVal has two elements ( digits before and after decimal)
        const opVal = copy.match(/\d+/g); // strips any parentheses and negative sign

        // get total number of digits regardless of decimal point
        const opLength = opVal.reduce((total, num) => {
            return total + num.length;
        }, 0);

        if (opVal[1] && opVal[1].length > 10) {
            alert('max digits after decimal is 10');
        } else if (opLength > 15) {
            alert('max number of digits is 15');
        } else if (operand !== '0') {
            setOperand(copy);
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

                // remove negative sign and any parantheses
                operand.endsWith(')') ? setOperand(operand.substring(2, operand.length - 1))
                                      : setOperand(operand.substring(2));
            }

        // number is positive
        } else {

            // prepend '(-' to operand and update state
            setOperand(`(-${operand}`);
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
            updatedOperand += '.';      // append decimal point
            setOperand(updatedOperand); // update state
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
        if (operand && operand !== '(-') {
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
        const res = getResult();

        if (res) {
            setExpression([]);
            setOperand(res);
        }
    }

    // calculate expression result and return for display
    const getResult = () => {
        const lastOperand = checkOperand();
        const finalExpression = expression.join('') + lastOperand;

        if (lastOperand) { // undefined if operand is empty
            try {
                let res = math.evaluate(finalExpression);
                res = math.format(res, {precision: 10});
                return res.toString();
            } catch (error) {
                console.log('invalid expression');
            }
        }
        return '';
    }

    // delete from expression
    const handleBackspace = () => {

        // delete from operand if it isn't empty
        if (operand.length) {
            switch (operand) {
                case '(-':
                case '0.':
                    setOperand('');
                    break;
                case '(-0.':
                    setOperand('(-');
                    break
                default:
                    setOperand(operand.slice(0, -1));
                    break;
            }

        // else update expression
        } else if (expression.length) {
            const updatedExpression = [...expression].slice(0, -1); // remove operator
            const newOperand = updatedExpression.pop();             // last operand becomes current operand

            setOperand(newOperand);
            setExpression(updatedExpression);
        }
    }

    return (
        <>
            <Box>
                <Container maxWidth="xs">
                    <Paper elevation={3}>

                        {/* Grid uses flexbox under the hood */}
                        <Grid container justifyContent={'center'} alignItems={'center'}>
                            <Grid item xs={12}>
                                <Paper elevation={1}>
                                    <TextField fullWidth
                                               multiline rows={3}
                                               value={expression.join(' ') + ' ' + operand}
                                               />
                                </Paper>
                            </Grid>

                            <Grid item xs={12}>
                                <Paper elevation={1}>
                                    <TextField fullWidth
                                               value={getResult()}
                                               />
                                </Paper>
                            </Grid>

                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleBackspace} sx={{ width: 1, height:75}}><BackspaceIcon /></Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleClearOperand} sx={{ width: 1, height:75, fontSize:36}}>C</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleClearAll} sx={{ width: 1, height:75, fontSize:36}}>AC</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained"onClick={handleOperator} value='/' sx={{ width: 1, height:75, fontSize:36}}>÷</Button>
                            </Grid>

                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='7' sx={{ width: 1, height:75, fontSize:36}}>7</Button>
                            </Grid >
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='8' sx={{ width: 1, height:75, fontSize:36}}>8</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='9' sx={{ width: 1, height:75, fontSize:36}}>9</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleOperator} value='*' sx={{ width: 1, height:75, fontSize:36}}>×</Button>
                            </Grid>

                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='4' sx={{ width: 1, height:75, fontSize:36}}>4</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='5' sx={{ width: 1, height:75, fontSize:36}}>5</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='6' sx={{ width: 1, height:75, fontSize:36}}>6</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleOperator} value='-' sx={{ width: 1, height:75, fontSize:36}}>-</Button>
                            </Grid>

                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='1' sx={{ width: 1, height:75, fontSize:36}}>1</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='2' sx={{ width: 1, height:75, fontSize:36}}>2</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='3' sx={{ width: 1, height:75, fontSize:36}}>3</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleOperator} value='+' sx={{ width: 1, height:75, fontSize:36}}>+</Button>
                            </Grid>

                            <Grid item xs={3}>
                                <Button variant="contained" onClick={toggleNegative} sx={{ width: 1, height:75, fontSize:36}}>+/-</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleNum} value='7' sx={{ width: 1, height:75, fontSize:36}}>0</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleDecimal} sx={{ width: 1, height:75, fontSize:36}}>.</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleEquals} sx={{ width: 1, height:75, fontSize:36}}>=</Button>
                            </Grid>



                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </>
    );
}
