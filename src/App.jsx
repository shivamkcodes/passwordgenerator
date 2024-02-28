import { useCallback, useEffect, useState,useRef } from 'react'
import { TbRefresh } from "react-icons/tb";

function App() {
 // const [x, setx] = useState("your password here !!!");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [regenerate, setRegenerate] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("copy");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{

   let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   let pass="";

   if(numberAllowed){ 
    console.log('number has changed', numberAllowed)
    str += "0123456789";
  }
   if (charAllowed)  { 
    console.log("char has changed",charAllowed) 
    str  +=  "~!@#$%^&*()_+{}|;<>,??/";
  }

   for (let i = 1; i <= length; i++) {
    let index= Math.floor(Math.random()*str.length+1);
    pass += str.charAt(index);
   // console.log('index', index)

   }


   console.log('pass', pass);
    
    setPassword(pass);
    


  },[numberAllowed,charAllowed,setPassword,length])

 
  useEffect(()=>{
    passwordGenerator()
    setCopy("copy")
  },[numberAllowed,charAllowed,passwordGenerator,length,regenerate])

 
  
  const copytoclip=useCallback( ()=> {
    //passwordRef.current.select();
    passwordRef.current?.select();
    passwordRef.current?.focus();

   // passwordRef.current.setSelectionRange(0,6)
    setCopy("copied")
    window.navigator.clipboard.writeText(password);
  },[password])
  
  const onload =()=>{
     
    //let index= Math.floor(Math.random()*8+1);
    console.log('index', index)

     setx(x=> x = Math.random().toString(36).substring(2,11));
     console.log('x', x)
  }

  return (
    <div className='flex h-screen w-full'>
      <div className='m-auto'>

      
    <div className='text-center text-4xl mb-4 ma-4 align-middle'>
     <h1 className='text-center text-6xl mb-4 ma-4 text-orange-300'> Password Generator</h1>

{/* <i class="fa fa-refresh"></i>       */}
    
      <input ref={passwordRef} className='text-black bg-slate-200 opacity-600 text-center mb-5'  value={password} />
      <button onClick={()=>{setRegenerate((prev)=>
        !prev
     
      )}}> <TbRefresh />
 </button>
      <button  onClick={copytoclip} className='text-white bg-blue-600 p-1 ml-2 rounded-lg'>  {copy} </button>
    

      <br />
      <div className="flex gap-x-3 w-full ">
        <input type="range" min={6} max={25} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
        <label >Length is : <span className='text-green-700'> {length} </span> </label>
      {/* <button className='rounded-xl bg-green-700 text-white-500 p-1.5 ' onClick={passwordGenerator}>click me</button> */}
     
    
      
      <input className='text-red-800' type='checkbox' defaultValue={numberAllowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}}   />
      <label >Numbers</label>
      <input type='checkbox' defaultValue={charAllowed} onChange={()=>{setCharAllowed((prev1)=>!prev1)}}  />
      <label >SpecialCharcters</label>

      {/* <Checkbox  color='red' onClick={()=>{setCharAllowed(true)}}  label="SpecialCharcters" /> */}

    </div>
    <br />
    <br />
      <p> Your Password is : 
      
      <span className='text-green-700'> {password}
        </span> </p>


     
      </div>
      </div>
    </div>
  )
}

export default App
