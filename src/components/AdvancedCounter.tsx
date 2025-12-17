// import from index.ts
import { useState, useEffect, type ReactNode } from "react"

export const AdvancedCounter: React.FC = (): ReactNode => {

    const [count, setCount] = useState<number>(0)
    const [stepValue, setStepValue] = useState<number>(1)
    const [countHistory, setCountHistory] = useState<ReactNode[]>([<li key={'019b2503-007d-74f3-a6f4-c19b6a898321'}>Count History:</li>]) // UUID V7 key generated from https://www.uuidgenerator.net/
    const [countHistoryNumArray, setCountHistoryNumArray] = useState<number[]>([0])

    // countHistory.map((countInstance) => <li>{countInstance}</li>) // Keep around for reference. -JF 12/16/2025
    // Make unique keys?
    // Consider an array recording count values using the spread operator
    // Address the case for stepValue = 0, and increment/decrement is clicked. Log it in history or no, since count does not change

    const handleDecrement = () => {
        setCount((prevCount) => {
            return prevCount - stepValue
        })
        setCountHistory((prevCountHistory) => { // keys not needed? Render OK despite console error. 
            prevCountHistory = [...prevCountHistory, <li className="decrementRecord">({stepValue}) subtracted from Count ({count}) = <strong>{count - stepValue}</strong></li>];
            return prevCountHistory
        })

    }

    const handleIncrement = () => {
        setCount((prevCount) => {
            return prevCount + stepValue
        })
        setCountHistory((prevCountHistory) => { // keys not needed? Render OK despite console error. 
            prevCountHistory = [...prevCountHistory, <li className="incrementRecord">({stepValue}) added to Count ({count}) = <strong>{count + stepValue}</strong></li>];
            return prevCountHistory
        })

    }

    const handleStepValueChange = () => {
        // Number() required, type guards do not change input string to a number?
        setStepValue(Number(document.getElementById('stepInput').value)) // This somehow works despite the errors, .value is mandatory exactly where it is
    }

    const handleReset = () => { // Clear count history and reset count to 0
        setCount(0)
        setCountHistory([<li key={'019b2503-007d-74f3-a6f4-c19b6a898321'}>Count History:</li>])
        setCountHistoryNumArray([0])
    }

    // Make a useEffect to update history
    // Report to the user that changes have been saved
    useEffect(() => {
        setCountHistoryNumArray([...countHistoryNumArray, count])
        console.log(countHistoryNumArray)
        localStorage.setItem("countHistoryNumArray", JSON.stringify(countHistoryNumArray))

        const saveChangeAlert = document.getElementById('saveChangeAlert')
        saveChangeAlert.innerHTML = 'A CHANGE HAS BEEN SAVED TO LOCAL STORAGE'
        setTimeout(()=>{saveChangeAlert.innerHTML = ' '}, 1000)

    }, [count])

    return (
        <>
            <h4><i>Advanced</i> Counter</h4>
            <h2>Current Count: <strong>{count}</strong></h2>
            <div id='buttons'> {/* style={{display: flex; justify-content: center}}> IN-LINE STYLING HAS TOO MANY ERRORS */}
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
            <div id='saveChangeAlert'></div> {/* Informs the user a value was saved to local storage */}
            <ul>{countHistory}</ul>
        </>
    )
}


