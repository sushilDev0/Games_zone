import React, { useRef, useState } from 'react';
import './App.css';
import Toaster from './Toaster';
const App: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the input
    const attemptsRef = useRef<number>(0); // Ref for tracking attempts
    const storedNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    const [toastMessage, setToastMessage] = useState<string>('');



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        const guessedValue = inputRef.current?.value; // Get the value from the ref

        if (!guessedValue) {
          setToastMessage("Please enter a number.");
            return; // Exit if input is empty
        }

        const guessedNumber = Number(guessedValue); // Convert input to number

        if (guessedNumber < 1 || guessedNumber > 10) {
            setToastMessage("Please enter a number between 1 and 10.");
            return; // Exit if the number is out of range
        }

        attemptsRef.current += 1; // Increment attempts

        if (guessedNumber === storedNumber) {
            setToastMessage(`You win! The number was ${storedNumber}.`);
        } else if (attemptsRef.current < 5) { // Allow only 5 attempts (1 to 5)
           setToastMessage(`Try again! You have ${5 - attemptsRef.current} attempts left.`)
        } else {
           setToastMessage(`Game over! The number was ${storedNumber}.`);
        }

        // Clear the input field
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
      <div className='App'>
        <fieldset>
            <h2>Guess the Number!</h2>
            <p>Enter any number between 1 to 10:</p>
            <form onSubmit={onSubmit}>
                <input
                    type="number"
                    min="1"
                    max="10"
                    ref={inputRef} // Attach the ref to the input
                />
                <button type="submit">Submit</button>
            </form>
            <Toaster message={toastMessage} duration={3000} />        
        </fieldset>
        </div>
    );
};

export default App;
