// import from index.ts

export const AdvancedCounter = () => {



    return (
        <>
            <h4>Advanced Premium++ Gold Member VIP Honorary VP Counter</h4>
            <h2>Current Count: {CURRENTCOUNT}</h2>
            <div id='iCantStyleInLine'> {/* style={`display: flex; justify-content: center`}> */}
                <button>Decrement</button>
                <button>Increment</button>
                <button>Reduce</button>
                <button>Reset</button>
            </div>
            <label htmlFor="stepInput"></label> {/* Idea for label and stepInput id taken directly from Per Scholas' Lab 10.1 */}
            <input id="stepInput" type="number">{STEPVALUE}</input>
            <div id='reducerInputContainer'>
                <label htmlFor='reducerInput'></label>
                <input id='reducerInput' type='text'></input> {/* Handle invalid inputs without breaking system */}
            </div>
            <div>Changes Saved.</div>
            <div>Count History:</div>
            <ul>{COUNTHISTORY}</ul>
        </>
    )
}


