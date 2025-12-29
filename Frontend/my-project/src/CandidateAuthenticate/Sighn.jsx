import React, { useState } from 'react';
import api from '../Axios';
import {  motion } from 'framer-motion';

const Sighn = () => {
    const [name,setname]=useState('');
    const[age,setage]=useState();
    const [party,setparty]=useState('');
  const [message, setMessage] = useState("");

     const fetchdata =async(e)=>{
        e.preventDefault();
        try{
            const response= await api.post('/candidate/sighnup',{
                name:name,
                age:age,
                party:party
        
        
            });
            localStorage.setItem("token",response.data.token)
            console.log(response);
            console.log( response.data.candidate);

            alert('succefully sighned up');
        
        
        
        }catch(error){
            console.error("Signup error:", error);
            alert("Signup failed");
            setMessage(error.response?.data?.error || "Signup failed");
        }
     }

return (
  <div   className="flex items-center ">
      <motion.div initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }} className=" bg-gradient-to from-gray-800 via-gray-900 to-black  absolute  right-130 left-130 top-36 bottom-32  rounded-xl shadow-2xl w-100   text-white ">
    <form
      onSubmit={fetchdata}
      // Removed the unnecessary w-[200] and bg-white, kept flex and gap styles
      className="flex flex-col gap-5  pt-3"
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-400 pt-4">
        Candidate Signup
      </h2>

      <div className="flex flex-col gap-4 pt-14 px-10 pb-6 ">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setage(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />

        <input
          type="text"
          placeholder="Party"
          value={party}
          onChange={(e) => setparty(e.target.value)}
          required
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        />
      </div>
      

      <button  className=" bg-blue-600 text-black py-3 rounded-lg font-semibold
                   hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg mx-20 mb-10 mt-4"
        type="submit"
        // CRITICAL FIX: Changed text-black to text-white for contrast
       
      >
        Sign Up
      </ button>
    </form>

    {message && (
      <p className="mt-5 text-center text-lg text-green-700 font-medium bg-green-50 p-3 rounded-lg border border-green-200">
        {message} 🎉
      </p>
    )}
  </motion.div>

  </div>
);
} 

export default Sighn;
