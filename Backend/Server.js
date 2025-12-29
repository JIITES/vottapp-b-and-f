const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

   const db=require('./db.js')

const  bodyparser = require('body-parser');
   const UserRoute=require('./routes/userRoute.js');
const CandidateRoute=require('./routes/Candidate.js');

const CLIENT_URL=process.env.CLIENT_URL;
const PORT = process.env.PORT || 5000 ;
const Client_url =  process.env.Client_url ;

app.use(cors({
    origin:  CLIENT_URL && Client_url, // your React app URL
    

    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true
  }));


  
app.use(bodyparser.json())
 
app.get('/',(req,res)=>{
    res.send('server is running successfully, server ok ');
})


app.get('/api/votes', (req, res) => {
    res.send('welcom e to mmy server');
});
app.use('/user',UserRoute)
app.use('/candidate',CandidateRoute)


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});