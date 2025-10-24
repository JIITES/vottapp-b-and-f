import React from 'react';
import { useState } from 'react';
import api from '../Axios';
import { motion } from 'framer-motion'; 

const Sighnup = () => {
  const [message,setmessage]=useState();
  const [name, setName] = useState("");
          const [age, setage] = useState("");
          const [mobile, setmobile] = useState("");
          const [email, setEmail] = useState("");
          const [adharnumber, setadharnumber] = useState("");
          const [password, setPassword] = useState("");
          const [role, setRole] = useState("user");
          const[isvoted,setisvoted]=useState("");
          const[error,setError]=useState("");
  const Handle =async(e)=>{
    e.preventDefault(); 
    setmessage("...Loading");
    try{
    const response= await api.post('/user/Sighnup',{
 name:name,     
age:age,
mobile:mobile,
emaiL:email,
adharnumber:adharnumber,
password:password,
role:role,

})
console.log("resonse",response.data);
setmessage('sighnup successful');
localStorage.setItem('token',response.data.token);
}catch{
      console.error("Error during sighnup:", error.response?.data|| "Login failed");
      setmessage(error.response?.data?.error || "Login failed");
    }


  }




return (
  <div>
    <motion.div
      initial={{ scale: 0, x: 100 }}
      animate={{ scale: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="bg-gradient-to-r from-black to-blue-800 shadow-md w-[500px] shadow-amber-200 absolute bottom-9  left-130 rounded-md transform transition-transform duration-300 hover:scale-105 "
    >
      <p className="font-bold text-3xl pb-6 text-blue-400 text-center">UserSign Up</p>

      <form onSubmit={Handle} className="flex flex-col space-y-4 px-10 pb-6 pt-10">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-2xl bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setage(e.target.value)}
          className="p-2 border rounded-2xl bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setmobile(e.target.value)}
          className="p-2 border rounded-2xl bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-2xl bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Aadhar Number"
          value={adharnumber}
          onChange={(e) => setadharnumber(e.target.value)}
          className="p-2 border rounded-2xl bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded-2xl bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border rounded-2xl bg-amber-50 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-lg"
        >
          Submit
        </button>
      </form>
    </motion.div>
  </div>
);

  
}

export default Sighnup;
