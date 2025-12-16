// import from index.ts
import { useState, type ReactNode } from "react"

export const AdvancedCounter: React.FC = (): ReactNode => {

    const [count, setCount] = useState<number>(0)
    const [stepValue, setStepValue] = useState<number>(1)
    // UUID key for initial count history message generated with UUID V7 on https://www.uuidgenerator.net/
    const [countHistory, setCountHistory] = useState<ReactNode[]>([<li key={'019b2503-007d-74f3-a6f4-c19b6a898321'}>Count History:</li>])

    // countHistory.map((countInstance) => <li>{countInstance}</li>) // Keep around for reference. -JF 12/16/2025

    const handleDecrement = () => {
        setCountHistory((prevCountHistory) => {
            prevCountHistory.push(<li className="decrementRecord">({stepValue}) subtracted from Count ({count}) = <strong>{count-stepValue}</strong></li>); // keys not needed? Render OK. Console only noted keyless <li> elements on one occassion. JF 12/15/2025
            return prevCountHistory
        })
        setCount((prevCount) => {
            return prevCount - stepValue
        })
    }

    const handleIncrement = () => {
        setCountHistory((prevCountHistory) => {
            prevCountHistory.push(<li className="incrementRecord">({stepValue}) added to Count ({count}) = <strong>{count+stepValue}</strong></li>); // .push modifies an array then returns the length of the new array.
            return prevCountHistory // The array must be returned, not the array length returned by .push()
        })
        setCount((prevCount) => {
            return prevCount + stepValue
        })


    }

    const handleStepValueChange = () => {
        setStepValue(Number(document.getElementById('stepInput').value)) // This somehow works despite the errors
        {/* Number() required, type guards do not change input string to a number? */ }
    }

    const handleReset = () => { // Clear count history and reset count to 0
        setCount(0)
        setCountHistory([<li key={'019b2503-007d-74f3-a6f4-c19b6a898321'}>Count History:</li>])
    }

    // FIX THE CSS COLORS TO NOT BE PAINFUL


    return (
        <>
            <h4>Advanced Counter</h4>
            <h2>Current Count: {count}</h2>
            <div id='buttons'> {/* style={`display: flex; justify-content: center`}> NO IN-LINE STYLING?*/}
                <button onClick={handleDecrement}>
                    Decrement
                </button>
                <button onClick={handleIncrement}>
                    Increment
                </button>
                <button id='buttonReset' onClick={handleReset}>
                    Reset Count
                </button> {/* set current count to 0 */}
            </div>
            <label htmlFor="stepInput">Step size: </label> {/* Idea for label and stepInput id taken directly from Per Scholas' Lab 10.1 */}
            <input id="stepInput" type="number" value={stepValue} onChange={handleStepValueChange}></input>
            <div>!!! Changes Saved. !!!</div>
            <ul>{countHistory}</ul>
        </>
    )
}


