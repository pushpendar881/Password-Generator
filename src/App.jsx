import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [Password ,setpassword]=useState("");
  const [length,setlength]=useState(8);
  const [number , setnumber]=useState(false);
  const [char,setchar]=useState(false);
  const passwordref=useRef(null)
  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if(char) str+="!@#$%^&*-_+=[]{}~`"

    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
    },[length,char,number,setpassword])

    const copyPasswordToClipboard=useCallback(()=>{
      passwordref.current?.select();
      window.navigator.clipboard.writeText(Password)
    },[Password])

    useEffect(()=>{
      passwordgenerator()
    },[length, number, char, passwordgenerator])

  return (
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
          type="text"
          value={Password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passwordref}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          > copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={() => {
              setnumber((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                setchar((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
              </div>
        </div>
  
  )
}

export default App
