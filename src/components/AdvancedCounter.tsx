// import from index.ts
import { useState, useEffect, type ReactNode } from "react"

export const AdvancedCounter: React.FC = (): ReactNode => {

    const [count, setCount] = useState<number>(0)
    const [stepValue, setStepValue] = useState<number>(1)
    const [countHistory, setCountHistory] = useState<ReactNode[]>([<li key={'019b2503-007d-74f3-a6f4-c19b6a898321'}>Count History:</li>]) // UUID V7 key generated from https://www.uuidgenerator.net/
    const [countHistoryNumArray, setCountHistoryNumArray] = useState<number[]>([])

    // countHistory.map((countInstance) => <li>{countInstance}</li>) // Keep around for reference. -JF 12/16/2025
    // Make unique keys? 
    // Address the case for stepValue = 0, and increment/decrement is clicked. Log it in history or no, since count does not change

    // Up-arrow isDown, raise stepValue by 1 every x milliseconds until Up-arrow isUp
    // Only check the initial down press, then change stepValue until the key is registered as up
    // Address up and down arrow conflict, either pick a priority (up, down, first pressed, last pressed) or change/render nothing. This complicates the simple isDown/isUp while loop

    const handleDecrement = () => {
        setCountHistory((prevCountHistory) => { // keys not referenced/needed? Render OK despite console error. 
            return [...prevCountHistory, <li className="decrementRecord">({stepValue}) subtracted from Count ({count}) = <strong>{count - stepValue}</strong></li>] // AN INTERFACE WOULD GO NICELY HERE
        })
        setCount((prevCount) => {
            return prevCount - stepValue
        })
    }

    const handleIncrement = () => {
        setCountHistory((prevCountHistory) => { // keys not referenced/needed? Render OK despite console error. 
            prevCountHistory = [...prevCountHistory, <li className="incrementRecord">({stepValue}) added to Count ({count}) = <strong>{count + stepValue}</strong></li>];
            return prevCountHistory
        })
        setCount((prevCount) => {
            return prevCount + stepValue
        })
    }

    const handleStepValueChange = () => { // CONSIDER THE NUMBER OF TIMES THIS IS CALLED ON PAGE LOAD
        // Number() required, type guards do not change input string to a number?
        setStepValue(Number(document.getElementById('stepInput').value)) // This somehow works despite the errors, .value is mandatory exactly where it is
    }

    const handleReset = () => { // Clear count history and reset count to 0
        setCount(0)
        setCountHistory([<li key={'019b2503-007d-74f3-a6f4-c19b6a898321'}>Count History:</li>])
        setCountHistoryNumArray([0])
    }

    useEffect(() => { // Attach event listeners to the document to handle up/down arrow keys

        let intervalId: number | undefined // A positive integer that uniquely identifies the interval timer
        // Consider the possibility a second intervalId is needed to handle both key's being pressed, or disable the possibility

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.repeat) return // prevents the incrementation from "running away" by disabling any new setInterval()'s until the 'keyup' event fires

            if (event.key === 'ArrowUp') {
                setStepValue(prevStepValue => prevStepValue + 1) // When the document "hears" the event that the ArrowUp key is down, stepValue increments and then once every 200 milliseconds
                intervalId = window.setInterval(() => {
                    setStepValue(prev => prev + 1)
                }, 200)
            } else if (event.key === 'ArrowDown') {
                setStepValue(prevStepValue => prevStepValue - 1)
                intervalId = window.setInterval(() => {
                    setStepValue(prev => prev - 1)
                }, 200)
            }
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { // When either ArrowUp or ArrowDown is lifted, disable the auto-incrementing interval
                clearInterval(intervalId);
                intervalId = undefined;
            }
        }

        document.addEventListener('keydown', handleKeyDown) // add the listeners to the document itself
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown) // remove the listeners in useEffect clean-up
            document.removeEventListener('keyup', handleKeyUp)
        }

    }, [])

    // Make a useEffect to update history
    // Report to the user that changes have been saved
    useEffect(() => {
        setCountHistoryNumArray([...countHistoryNumArray, count])
        console.log(countHistoryNumArray)
    }, [count]) // ADDRESS THE FACT THIS RUNS ON INITIALIZATION

    useEffect(() => {

        // Problem 1: logs the initial [0] twice. SOLVED BY INITIALIZING ARRAY AS EMPTY
        // Problem 2: stale referencing, does not update local storage with most current count value despite dependency, 
        // exploring solutions by reordering setState function calls,
        // trying to avoid variable like "let updateThisInSetState1AndPassToSetState2",
        // A source hints that my stale value is caused by asynchronous behavior, and I think I should await the localStorage.Set().


        // Animation spams if button is spammed
        const saveChangeAlert = document.getElementById('saveChangeAlert') // Save changes alert "animation"
        saveChangeAlert.innerHTML = 'Local storage saved!'
        for (let delay = 0; delay <= 1200;) { // could've been a while loop
            setTimeout(() => { saveChangeAlert.innerHTML = 'Local storage saved...' }, delay += 300)
            setTimeout(() => { saveChangeAlert.innerHTML = 'Local storage saved!!!' }, delay += 300)
        }
        // setTimeout(() => { saveChangeAlert.innerHTML = 'Local storage up to date.' }, 2800)
        setTimeout(() => { saveChangeAlert.innerHTML = 'Local storage is stale by 1 value every time until a certain someone fixes this.' }, 2800)


        // Old setTimeout structure, keep chain for reference
        // setTimeout(() => {     
        //     saveChangeAlert.innerHTML = 'ITERATE ME LIKE YOU MEAN IT'
        //     setTimeout(() => {
        //         saveChangeAlert.innerHTML = 'A CHANGE HAS BEEN SAVED TO LOCAL STORAGE'
        //         setTimeout(() => {
        //             saveChangeAlert.innerHTML = 'ITERATE ME LIKE YOU MEAN IT'
        //         }, 1000)
        //     }, 1000)
        // }, 1000)

    }, [countHistoryNumArray]) // ADDRESS THE FACT THIS RUNS ON INITIALIZATION

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


