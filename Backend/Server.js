const express = require('express');
const app = express();
const cors = require('cors')

const PORT = 5000;
const  bodyparser = require('body-parser');
   const db=require('./db.js')
   const UserRoute=require('./routes/userRoute.js')
const CandidateRoute=require('./routes/Candidate.js')


app.use(cors({
    origin: "http://localhost:5173", // your React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true
  }));


  
app.use(bodyparser.json())



app.get('/api/votes', (req, res) => {
    res.send('welcom e to mmy server');
});
app.use('/user',UserRoute)
app.use('/candidate',CandidateRoute)


app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});