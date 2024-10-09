import React, { useEffect, useRef, useState } from 'react'

function App() {

  const randomNumber = useRef(0);
  const [userNumber, setUserNumber] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");

  function handleUserNumber(e) {
    const value = (e.target.value);

    if (value > 100) {
      setMessage("Cannot go above 100");
      setUserNumber(100);
    }
    else if (value < 0) {
      setMessage("Cannot go below 0");
      setUserNumber("");
    }
    else {
      setMessage("");
      setUserNumber(value ? parseInt(value) : "");
    }
  }


  function handleGuess() {
    setAttempts(prevAttempts => {
      const newAttempts = prevAttempts + 1;

      if (userNumber > randomNumber.current) {
        setMessage("Your number is GREATER than the random number!");
        document.getElementById('message').classList.add("text-red-500");
      } else if (userNumber < randomNumber.current) {
        setMessage("Your number is SMALLER than the random number!");
        document.getElementById('message').classList.add("text-red-500");
      } else if (userNumber === randomNumber.current) {
        setMessage(`Bravo! You took ${newAttempts} attempt/s to guess the random number ${randomNumber.current}!!`);
        document.getElementById('message').classList.add("text-green-600");
      }

      return newAttempts;
    });
  }

  function reset(e) {
    randomNumber.current = Math.floor(Math.random() * 100 + 1);
    setAttempts(0);
    setUserNumber("");
    setMessage("");
    console.log(randomNumber.current);
  }

  useEffect(() => {
    reset();
  }, []);

  return (
    <div className='flex justify-center items-center flex-col h-screen gap-4 bg-blue-100'>
      <p className='text-4xl text-purple-500'>Attempts: {attempts}</p>
      <div className='flex flex-row justify-center items-center gap-4'>

        <label htmlFor="userNum" className='text-4xl'>Enter a number</label>
        <input
          type="number"
          value={userNumber}
          onChange={handleUserNumber}
          id='userNum'
          placeholder='Between 1-100'
          className='text-2xl px-2 py-3 border-2 border-black rounded-lg'
        />
      </div>

      <div className="flex justify-center items-center gap-4">
        <button onClick={handleGuess} disabled={userNumber < 1 || userNumber > 100} className='text-2xl px-3 py-4 bg-cyan-500 rounded-lg hover:bg-cyan-600 active:bg-cyan-700 text-white'>Guess</button>
        <button onClick={reset} disabled={attempts < 1} className='text-2xl px-3 py-4 bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-700 text-white'>reset</button>
      </div>

      <p className='text-2xl' id='message'>{message}</p>
    </div>
  )
}

export default App
