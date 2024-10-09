import React, { useState } from 'react'

function App() {

  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);

  const handleValue = (e) => {
    setValue(parseInt(e.target.value));
  }

  const handleIncrease = () => {
    setCount(prevCount => prevCount + value);
  }

  const handleDecrease = () => {
    setCount(prevCount => prevCount - value);
    if(count <= 0){
      alert("Cannot go below 0");
      setCount(0);
    }
  }


  return (
    <div className='flex flex-col justify-center items-center gap-3 h-screen font-sans'>
      <h1 className='text-8xl text-red-500 font-bold'>{count}</h1>
      <label htmlFor="num" className='text-xl'>Increment/Decrement by</label>
      <input type="number" id="num" className='border-2 border-black rounded-lg w-1/4 p-2 text-2xl' value={value} onChange={handleValue} />
      <div className="flex flex-row justify-center items-center gap-3">
        <button className='border-none bg-green-500 px-3 py-5 rounded-lg hover:bg-green-600 active:bg-green-700 text-white text-2xl font-bold' onClick={handleIncrease}>Increase</button>
        <button className='border-none bg-blue-500 px-3 py-5 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-white text-2xl font-bold' onClick={handleDecrease}>Decrease</button>
      </div>
    </div>
  )
}

export default App
