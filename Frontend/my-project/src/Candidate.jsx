// import React from 'react';
// import api from './Axios';
// import { useState } from 'react';
// import { useEffect } from 'react';

// const Candidate = () => {
//   const [candidates, setCandidates]=useState([]);
//   const [error, setError] = useState("");
//  const[formData,setFormData]=useState({name:"",party:"",age:""});
//   const[showupdateform,setshowupdateform]=useState(false);
//     // const [candidateId,setCandidateId]=useState("");
    


// useEffect(() => {
//   const fetchCandidates = async () => {
//     try {
//       const response = await api.get('/candidate/Candidate');
//       console.log('Candidates fetched:', response.data);
//       setCandidates(response.data.response || response.data); // <- important
//       // setCandidateId(response.data.response._id);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to fetch candidates');
//     }
//   };

//   fetchCandidates();

// }, []);

//   const Hello=async(candidateId)=>{

//     try{
//       const response= await api.post(`/candidate/Candidatevote/${candidateId}`);
//       console.log("voted successfully",response.data);
//       if(candidates.voteCount==true){
//         alert("You have already voted");

//       }

//     }catch(error){
//       console.error("voting error",error.response?.data || error.message);
//       setError(error.response?.data?.error || "Failed to vote");
//     }
//   };



//   const Remove = async(id)=>{
//     try{
//     const response=await api.delete(`/candidate/${id}`);
//     console.log('removed candidate successfullly',response);
//     alert("deleted candidate ")
//     }catch(error){
//       setError(error.response?.data?.error||'faild to remove' );
//       console.log(error.response?.data?.error||'faild to remove');
//       alert("cant remove");
//     }
//   };


//       const update=async(id)=>{

//     try{
//       const response= await api.post(`/candidate/update/${id}`,{
//        formData

//       });
//       console.log("updated successfully",response);

//     }catch(error){
//       console.error("voting error",error.response?.data || error.message);
//       setError(error.response?.data?.error || "Failed to vote");
//     }
//   };


// //for makimg cancel
// const cancelUpdate=()=>{
//     setshowupdateform(false);
  
// };
// const hadleupdate=()=>{
//   setshowupdateform(true);
  


//   return(
//     <div>
//       {candidates.length === 0 ?(<p>No candidates available</p>):
//       (      candidates.map((candidat)=>{ 
//         // Flatten votes in case it is nested ([[{}, {}], [{}]])
//           // const flatVotes = Array.isArray(candidat.votes) ? candidat.votes.flat() : [];
//         return(
//                 <div className='bg-blue-200' key={candidat._id} >
//                   <div className=''>
//         <h3>{candidat.name}</h3>
//         <p>Party: {candidat.party}</p>
//         {/* <p>Votes: {flatVotes.length}</p> */}
//         <p>Age: {candidat.age}</p>
//         <div>
//         <button onClick={()=>{Hello(candidat._id)}} >vote</button>   
// </div>
// <button onClick={()=>{Remove(candidat._id)}}>remove</button>
// <button onClick={} >update</button>

//                   </div>
//                   <div>
//   {showupdateform==false?( null):(<div>
//     <h1>updatelist</h1>
//     <input type='text' placeholder='name' value={formData.name} onChange={(e)=>setFormData(e.target.value)}/>
//     <input type='text' placeholder='party' value={formData.party} onChange={(e)=>setFormData(e.target.value)}/>
//     <input type='number' placeholder='age' value={formData.age} onChange={(e)=>setFormData(e.target.value)}/>
// <button onClick={()=>update(candidat.id)}>submit</button>
// <button onClick={()=>cancelUpdate()}>cancel</button>

//   </div>)}
// </div>


//       </div>
//      )})
//   )
//     }
// </div>
//   );
// }

// export default Candidate;



import React, { useState, useEffect } from "react";
import api from "./Axios";
import { motion } from "framer-motion";

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", party: "", age: "" });
  const [selectedFile, setSelectedFile] = useState(null);


  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get("/candidate/Candidate");
        setCandidates(response.data.response || response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch candidates");
      }
    };
    fetchCandidates();
  }, []);



  // Voting
  const voteCandidate = async (id) => {
    try {
      await api.post(`/candidate/Candidatevote/${id}`);
      alert("Voted successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to vote");
    }
  };

  // Delete candidate
  const removeCandidate = async (id) => {
    try {
      await api.delete(`/candidate/${id}`);
      setCandidates(candidates.filter((c) => c._id !== id));
      alert("Candidate deleted successfully!");
    } catch {
      alert("Can't remove candidate");
    }
  };



  // Show update form
  const showUpdateForm = (candidate) => {
    setEditingId(candidate._id);
    setFormData({ name: candidate.name, party: candidate.party, age: candidate.age });
  };

 // Handle form input
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

 // Submit update
  const handleSubmit = async (id) => {
    try {
      await api.put(`candidate/update/${id}`, formData);
      setCandidates(candidates.map((c) => (c._id === id ? { ...c, ...formData } : c)));
      setEditingId(null);
      alert("Candidate updated!");
    } catch {
      alert("Failed to update candidate");
    }
  };

  // File input change
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  // Upload image
  const uploadImage = async (id) => {
    if (!selectedFile) return alert("Please select an image first!");
    const data = new FormData();
    data.append("image", selectedFile);

    try {
      await api.post(`/candidate/upload/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelectedFile(null);
      // Refresh candidates to show new image
      const res = await api.get("/candidate/Candidate");
      setCandidates(res.data.response || res.data);
      alert("Image uploaded successfully!");
    } catch {
      alert("Failed to upload image");
    }
  };

  return (
    <div className="p-6 bg-linear-to-r from-indigo-50 to-purple-50   rounded-2xl min-h-screen my-36">
      <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center drop-shadow-md">
        Candidate List
      </h2>

      {error && <p className="text-red-600 font-semibold mb-4 text-center">{error}</p>}

      {candidates.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No candidates available</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {candidates.map((c) => (
            <motion.div
              key={c._id}
              className="p-5 rounded-2xl shadow-lg bg-white border border-gray-200 w-full sm:w-72 flex flex-col"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Candidate Image */}
              {c.image ? (
                <motion.img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-44 object-cover rounded-md mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <div className="w-full h-44 bg-gray-200 flex items-center justify-center rounded-md mb-4 text-gray-500 text-lg font-medium">
                  No Image
                </div>
              )}

              {/* Image Upload */}
              <div className="flex gap-2 mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="flex-1 min-w-0 p-1 border border-gray-300 rounded text-sm"
                />
                <button
                  onClick={() => uploadImage(c._id)}
                  className="bg-green-500 px-3 py-1 rounded text-black text-sm hover:bg-green-600 transition"
                >
                  Upload
                </button>
              </div>

              {/* Candidate Details */}
              <h3 className="text-xl font-bold text-purple-800 mb-2">{c.name}</h3>
              <p className="text-purple-600 mb-1">
                <span className="font-semibold">Party:</span> {c.party}
              </p>
              <p className="text-purple-600 mb-3">
                <span className="font-semibold">Age:</span> {c.age}
              </p>

              {/* Edit update Form */}
              {editingId === c._id && (
                <motion.div
                  className="bg-indigo-50 p-4 mb-4 rounded-lg border-l-4 border-indigo-600 shadow-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-indigo-800 mb-3">Update Candidate</h4>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 mb-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    name="party"
                    value={formData.party}
                    onChange={handleChange}
                    placeholder="Party"
                    className="w-full p-2 mb-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-full p-2 mb-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSubmit(c._id)}
                      className="px-4 py-2 text-sm bg-emerald-500 text-black rounded hover:bg-emerald-600 transition"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 text-sm bg-red-500 text-black rounded hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-auto">
                <button
                  onClick={() => voteCandidate(c._id)}
                  className="flex-1 px-4 py-2 text-sm bg-blue-500 text-red rounded hover:bg-blue-600 transition"
                >
                  Vote
                </button>
                <button
                  onClick={() => removeCandidate(c._id)}
                  className="flex-1 px-4 py-2 text-sm bg-red-500 text-green rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
                <button
                  onClick={() => showUpdateForm(c)}
                  className="flex-1 px-4 py-2 text-sm bg-amber-500 text-blak rounded hover:bg-amber-600 transition"
                >
                  Update
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Candidate;