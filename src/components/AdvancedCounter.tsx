// import from index.ts
import { useState, type ReactNode } from "react"

export const AdvancedCounter: React.FC = (): ReactNode => {

    const [count, setCount] = useState<number>(0)
    const [stepValue, setStepValue] = useState<number>(1)
    // UUID key for initial count history message generated with UUID V7 on https://www.uuidgenerator.net/
    const [countHistory, setCountHistory] = useState<ReactNode[]>([<li key={'019b2503-007d-74f3-a6f4-c19b6a898321'}>No count history</li>])


    // countHistory.map((countInstance) => <li>{countInstance}</li>)

    const handleDecrement = () => {
        setCount((prevCount) => prevCount - stepValue)
        setCountHistory((prevCountHistory) => {
            prevCountHistory.push(<li className="decrementRecord">({stepValue}) subtracted from Count ({ }) = { }</li>); // keys not needed? Render OK. Console only noted keyless <li> elements on one occassion. JF 12/15/2025
            return prevCountHistory
        })
    }

    const handleIncrement = () => {
        let prevCountToBePassed = 0
        setCount((prevCount) => {
            return prevCount + stepValue
        })

        setCountHistory((prevCountHistory) => {
            prevCountHistory.push(<li className="incrementRecord">({stepValue}) added to Count ({ }) = { }</li>); // .push modifies an array then returns the length of the new array.
            return prevCountHistory // The array must returned, not the array length
        })
    }

    const handleStepValueChange = () => {
        setStepValue(Number(document.getElementById('stepInput').value)) // This somehow works despite the errors
        {/* Number() required, type guards do not change input string to a number */ }
    }

    const handleReset = () => { // Clear count history and reset count to 0
        setCount(0)
        setCountHistory([<li key={'019b2503-007d-74f3-a6f4-c19b6a898321'}>No count history</li>])
    }

    // 


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
                <button onClick={handleReset}>
                    Reset Count
                </button> {/* set current count to 0 */}
            </div>
            <label htmlFor="stepInput">Step size: </label> {/* Idea for label and stepInput id taken directly from Per Scholas' Lab 10.1 */}
            <input id="stepInput" type="number" value={stepValue} onChange={handleStepValueChange}></input>

            <div>!!! Changes Saved. !!!</div>
            <div>!!! Count History: !!!</div>
            <ul>{countHistory}</ul>
        </>
    )
}


