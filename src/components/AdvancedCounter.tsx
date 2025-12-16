// import from index.ts
import { useState, type ReactNode } from "react"

export const AdvancedCounter: React.FC = ():ReactNode => {

    const [count, setCount] = useState<number>(0)
    const [stepValue, setStepValue] = useState<number>(1)
    const [countHistory, setCountHistory] = useState<ReactNode[]>([<li>No count history</li>])
    const [listCountHistory, setListCountHistory] =  useState<ReactNode[]>([<li>No count history</li>])




    setListCountHistory(countHistory.map((countInstance) => <li>{countInstance}</li>))
    
    {/* consider empty string case, division by 0, 0^0, undefined, bigInts, */ }
    // const [customFunction, setCustomFunction] = useState<string>("")


    const handleStepValueChange = () => {
        setStepValue(Number(document.getElementById('stepInput').value))
        {/* Number() required, type guards do not change input string to a number */ }
    }

    // const handleIteration = () => {
    //     // setCount(APPLY CUSTOM FUNCTION FROM INPUT DOM OBJECT)
    // }

    const handleReset = () => {
        setCount(0)
        setCountHistory([<li>No count history</li>])
        setListCountHistory([<li>No count history</li>])
        {/*CLEAR COUNT HISTORY AND RESET COUNTER TO 0*/}
    }



    return (
        <>
            <h4>Advanced Counter + Iterator</h4> {/* <h4>Advanced Premium++ Gold Member VIP Honorary VP Counter</h4> */}
            <h2>Current Count: {count}</h2>
            <div id='buttons'> {/* style={`display: flex; justify-content: center`}> NO IN-LINE STYLING?*/}
                <button onClick={() => setCount((prevCount) => prevCount - stepValue)}>
                    Decrement
                </button>
                <button onClick={() => setCount((prevCount) => prevCount + stepValue)}>
                    Increment
                </button>
                {/*<button onClick={handleIteration}>*/} {/* handle reducer function */}
                    {/* Iterate f(x) */}
                {/* </button>  */}
                <button onClick={handleReset}> 
                    Reset Count
                </button> {/* set current count to 0 */}
            </div>
            <label htmlFor="stepInput">Step size: </label> {/* Idea for label and stepInput id taken directly from Per Scholas' Lab 10.1 */}
            <input id="stepInput" type="number" value={stepValue} onChange={handleStepValueChange}></input> 
            {/* <div id='reducerInputContainer'>
                <label htmlFor='reducerInput'>f(x) = </label> */}
                {/* <input id='reducerInput' type='text'></input> */} {/* Handle invalid inputs without breaking system */}
                {/* <div> (e.g. x + x)</div>
            </div> */}
            <div>!!! Changes Saved. !!!</div>
            <div>!!! Count History: !!!</div>
            <ul>{listCountHistory}</ul>
        </>
    )
}


