// import from index.ts
import { useState } from "react"

export const AdvancedCounter: React.FC = () => {

    const [count, setCount] = useState<number>(0)
    const [stepValue, setStepValue] = useState<number>(1)

    {/* consider empty string case, division by 0, 0^0, undefined, bigInts, */ }
    const [customFunction, setCustomFunction] = useState<string>("")


    const handleStepValueChange = () => {
        setStepValue(Number(document.getElementById('stepInput').value))
    }

    const handleIteration = () => {
        // setCount(APPLY CUSTOM FUNCTION FROM INPUT DOM OBJECT)
    }


    return (
        <>
            <h4>Advanced Counter + Iterator</h4> {/* <h4>Advanced Premium++ Gold Member VIP Honorary VP Counter</h4> */}
            <h2>Current Count: {count}</h2>
            <div id='buttons'> {/* style={`display: flex; justify-content: center`}> */}
                <button onClick={() => setCount((prevCount) => prevCount - stepValue)}>
                    Decrement
                </button>
                <button onClick={() => setCount((prevCount) => prevCount + stepValue)}>
                    Increment
                </button>
                <button onClick={handleIteration}>Iterate</button> {/* handle reducer function */}
                <button onClick={() => setCount(0)}>Reset</button> {/* set current count to 0 */}
            </div>
            <label htmlFor="stepInput"></label> {/* Idea for label and stepInput id taken directly from Per Scholas' Lab 10.1 */}
            <input id="stepInput" type="number" onChange={handleStepValueChange}></input> {/* CHECK THE stepValue DISPLAYS CORRECTLY */}
            <div id='reducerInputContainer'>
                <label htmlFor='reducerInput'>f(x) = </label>
                <input id='reducerInput' type='text'></input> {/* Handle invalid inputs without breaking system */}
                <div> (e.g. x + x)</div>
            </div>
            <div>Changes Saved.</div>
            <div>Count History:</div>
            {/* <ul>{COUNTHISTORY}</ul> */}
        </>
    )
}


