

# Lab 10.1, React Counter with useEffect

## Description
In this lab a counter app with advanced features is built using React in order to practice useState()'s and useEffect()'s.


## Running the program
To view this lab, type "npm run dev" into the command line and open localhost:5137 <br>
Upon loading the count starts at 0, and the value can be decreased or increased by pressing Decrement or Increment respectively. <br>
DISCUSS LOCAL STORAGE AND THE IMPLICATIONS OR REFRESHING PAGE, BROWSER, OR OPENING NEW TAB. TWO INSTANCES OPEN IN TWO TABS<br>
DISCUSS ITERATE f(x) BRIEFLY<br>
A history of count values are listed to keep record of previous count values<br>
Clicking the Reset sets the count back to 0 and clear the count history<br>

## Reflection
> Stale localStorage, initial useEffect invocation on render

<br>

<!-- Audio files were sources from Wikimedia at https://commons.wikimedia.org/wiki/File:Example_Shepard_Tones.ogg -->
<br>

> setTimeout() chains with explicit delays vs loops with incrementing delays

setTimeout(() => {}, 300); setTimeout(() => {}, 300); setTimeout(() => {}, 300);  // All these start at basically at the same time, not one after the other.
<br>
setTimeout(() => {}, 300); setTimeout(() => {}, 600); setTimeout(() => {}, 900); // A long list of hard-coded setTimeouts requires math hard-coded, harder.
<br>
setTimeout(() => {}, 300) can be chained together inside of another setTimeout(() => {}, 300) arbitrarily many time to cause looped actions to be performed every 300 milliseconds. 
<br>
setTimeout(() => {}, delay += 300)The better way to do this is to use a for loop and increase the delay by 300 milliseconds every time setTimeout is used.
<br>



