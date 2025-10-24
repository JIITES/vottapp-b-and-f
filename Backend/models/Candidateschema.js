const { default: mongoose } = require('mongoose');
const Mongoose = require ('mongoose');
 const candidateschema = new Mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    party:{
        type:String,
        required:true
    },
    votes:[
        {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User', 
                    },
        
        votedAt:{
            type:Date,
            default:Date.now
        }
        

        }
    
    ],
voteCount:{
    type:Number,
    default:0
},

  image: {
    data: Buffer,        // 🟢 Binary data
    contentType: String, // 🟢 Example: image/png or image/jpeg
  },

 })

const Candidate = Mongoose.model('Candidate',candidateschema);

module.exports = Candidate;





 
