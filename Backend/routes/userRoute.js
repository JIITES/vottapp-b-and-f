const express = require('express')
const router = express.Router();
const User = require('../models/Users.js');

//importing person data inside person.js and models folder
const {jwtAuthMiddleware,generateToken}= require('./../jwt.js');// JWT Authentication middleware and token generation function
const Candidate = require('../models/Candidateschema.js');


// Route to get all persons or filter by query parameters
router.post('/sighnup', async (req, res) => {
try{
  const data=req.body //assuiming req body contains the person data

  const nwUesr= new User(data);//create new person document using the mongoose model,creates a new document (row) for MongoDB using Mongoose.

  const response= await nwUesr.save()//save thre new person to the database 

  console.log('user added');

  const payloade={

            id:response._id,
            username:response.username
  };

  const token= generateToken(payloade);//generate JWT token using the payload

res.status(200).json({response,token});//

}
catch(err){
console.log(err)
res.status(500).json ({error:'Internal Server Error'});
}
})


router.get('/User', async (req, res)=> {

  try {
    
    const  response = await User.find(); //find all the person data from the database
    res.status(200).json(response); //send the person data as a response
  } catch (err) {

    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// app.get('/person/:id', async (req, res) => {


router.put('/Profile/password',async(req, res)=>{
try{
      const userid=req.user  //const decode=jwt.verify(token,process.env.JWT_SECRET) req.user=decode;//

     const {currentPassword,newPassword} = req.body // Extract current and new password word in body
     
      const user = await User.findById(userid); //Find the user by userID
       
      //if password does not match return error
      if(await user.comparePassword(currentPassword)){
        return res.status(401).json({error:'yes you can change you,re password'});
      }
  //Updatee the  user  s password
  user.password = newPassword;
  await user.save();

        console.log('person updated');
        res.status(200).json({message : "updated user"}); //send the updated person data as a response

}catch(err){
  console.log(err);
  res.status(500).json({ error: 'Internal Server Error' })
}
});


router.delete('/:id',async(req,res)=>{
  try{
    const id=req.params.id; //get the person id from the request parameters
    const response= await Person.findByIdAndDelete(id); //delete the person data from the database
    if(!response){
      return res.status(404).json({ error: 'Person not found' })
     };
    console.log('person deleted');
    res.status(200).json({message:'Person deleted successfully'}); //send a success message as a response
  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


router.post('/login',async(req,res)=>{
  const {adharnumber,password}=req.body;
     try{
      const user=await User.findOne({ adharnumber:adharnumber});

if(!user || !(await user.comparePassword(password))){
  return res.status(401).json({error:'Invalid username or password'});
} 


const payloade={id:user._id,password:user.username};
 const token= generateToken(payloade);//generate JWT token using the payload


res.status(200).json({message:'Login successful',token});
console.log("login successsfully ");
     }catch(error){
console.log(error);
res.status(500).json({error:'Internal Server Error'});
     }
});

router.get('/Profile', jwtAuthMiddleware,async(req,res)=>{
    //extracting id from decode menas from token
  try{
      const userData = req.user.id;// it is comming from jwt.js // like in req.user=decode
   console.log('User Data:',userData);
    
    const user = await User.findById(userData)//Find the user by userID
    if(!user){
      return res.status(404).json({ error: 'User not found' })
      
      
    } ;
    res.status(200).json({response:user,message:'Profile fetched successfully'});
  }catch(err){
 console.log(err);
    res.status(500).json({ error: 'Internal Server Error' })
    console.log('Error fetching profile');
  }
})


module.exports = router; //export the router to use in other files