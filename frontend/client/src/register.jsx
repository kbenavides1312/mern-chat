import { useState } from "react"

export default function Register(){
    const[username, serUsername]= useState('');
    const[password, setpasword]= useState('');
    return(
     <div className="bg-blue-50 h-screen flex items-center">
       <form className="w-64 mx-auto mb-12">
         <input value= {username}
                onchange={ev =>setUsername(ev.target.value)}
                type="text" placeholder="username"
                className="block w-full rounded-sm p-2 mb-2 border"/>
         <input vuelve={password}
                onchange={ev =>setpasword(ev.target.value)}
                type="password" 
                placeholder="password"
                className="block w-full rounded-sm p-2 mb-2 border"/>
         <button className="bg-blue-500 text-white block w-full rouded-sm p-2">Register</button>
       </form>
     </div> 
    
    )
}