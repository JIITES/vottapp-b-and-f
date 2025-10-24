import React, { useEffect } from 'react';
import api from './Axios';
import { useState } from 'react';
import { motion } from 'framer-motion';
const Voteresult = () => {

  const [message, setMessage] = useState("");
  const [Candidate,setCandidate]=useState([])
  const [winner,setWinner]=useState("");
useEffect(()=>{
  const handleVote = async () => {
    try {
      const response = await api.get('/candidate/voteresult');
      setMessage(response.data.message); // "Voted successfully"
      setCandidate(response.data.Response);
      setWinner(response.data.Win);
      console.log(response.data);

    } catch (error) {
      console.error("Vote error:", error);
      setMessage(
        error.response?.data?.message || "Something went wrong while voting"
      );
    }
  };
handleVote();
},[]);
return (
  // Main container: Centered flexbox, padding, and background
  <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
    
    {/* Candidates container: Horizontal layout with a gap, wrapping on smaller screens */}
    <div className="flex flex-wrap justify-center gap-6 rounded-lg p-4">
      {Candidate.map((candidate, index) => (
        <motion.div
          key={candidate._id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
          // Candidate Card Styling: Increased size, softer shadow, rounded corners, and padding
          className="bg-white w-[250px] h-[250px] p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl flex flex-col justify-between"
        >
          <div>
            <p className="text-gray-800 font-extrabold text-2xl mb-2 border-b-2 border-amber-300 pb-1">Candidate Result</p>
            {/* Party Name */}
            <h2 className="text-xl font-semibold text-indigo-600 truncate pt-18">Party: {candidate.party}</h2>
            {/* Vote Count */}
            <p className="text-lg text-gray-700 mt-2">
              <span className="font-medium">Vote Count:</span> {candidate.voteCount}
            </p>
          </div>
          {/* Removed the <hr /> from the original as the inner div's border-b serves a similar purpose */}
        </motion.div>
      ))}
    </div>

    {/* Winner Box: Styled as a prominent, centered block */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: Candidate.length * 0.25, type: "spring", stiffness: 120 }}
      // Styling: Prominent yellow/amber background, large text, strong shadow, and fixed position for visual focus
      className="mt-12 p-8 bg-blue-400 text-white font-serif rounded-xl shadow-2xl ring-4  flex flex-col items-center text-center max-w-sm"
    >
      <h2 className="text-4xl font-black mb-3 uppercase tracking-wider">🎉 Winner 🎉</h2>
      <hr className="w-full border-t-2 border-white opacity-50 mb-3" />
      
      {/* Winner Name */}
      <p className="text-3xl font-bold mb-1">{winner.name}</p>
      
      {/* Winner Vote Count */}
      <p className="text-2xl font-semibold mb-1">Votes: {winner.voteCount}</p>
      
      {/* Winner Party */}
      <p className="text-xl italic font-light">{winner.party}</p>
    </motion.div>
  </div>
);};

export default Voteresult;
