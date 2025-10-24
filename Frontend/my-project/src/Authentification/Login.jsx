import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Axios';
import { useContext } from 'react';
import { AuthContext } from '../Context/Authcontext';
import { motion } from 'framer-motion';
 
const Login = () => {
const [adarnumber,setadharnumber]=useState("");
const[password,setpassword]=useState("");
 const [message, setMessage] = useState("");
 const {isLoggedIn,login} = useContext(AuthContext);
const navigate=useNavigate()

 const handle = async (e) => {
  
 
    e.preventDefault(); // stop page reload
    setMessage("Loading...") 
    try{
      const response = await api.post('/user/login',{
        adharnumber:adarnumber,
        password:password
      })
      console.log("response",response.data);
      setMessage("✅ Login successful!");
      localStorage.setItem("token",response.data.token);
      login();//called loggin from context to set islogedin to true
      navigate('/hello');//


      console.log('login successfully');
    }catch(error){
      console.error("Error during login:", error.response?.data|| "Login failed");
      setMessage(error.response?.data?.error || "Login failed");
    };


    }
 
return (
  <div>
      <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}

       className="bg-gray-950 shadow-amber-50 shadow-md absolute top-30 bottom-30 right-130 left-130 rounded-2xl flex items-center justify-center ">
    <motion.div initial={{scale:0 ,opacity:0}}
    animate={{scale:1,opacity:1}}
    transition={{duration:0.7,ease:"easeInOut"}}

                       className="bg-white rounded-lg shadow-lg w-96 p-8">
      <form onSubmit={handle} className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center">User Login</h2>

        <input
          type="number"
          placeholder="Adhar Number"
          value={adarnumber}
          onChange={(e) => setadharnumber(e.target.value)}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
          className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
     <div className=''>
          <button
          type="submit"
          className=" text-black py-2 bg-blue-600 hover:bg-blue-300 "
        >
          Login
        </button>

     </div>

        {message && (
          <p
            className={`text-center mt-2 font-medium ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <div className="mt-4 text-center">
        <p>If you are not logged in, please signup</p>
        <Link
          to="/Sighn"
          className="mt-2 inline-block  text-black py-1 px-4 rounded hover:bg-amber-50 transition-colors bg-amber-700"
        >
          Signup
        </Link>
      </div>
    </motion.div>
  </motion.div>

  </div>
);

}

export default Login;
