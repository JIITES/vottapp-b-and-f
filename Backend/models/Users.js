const Mongoose = require ('mongoose');
const bcrypt=require('bcrypt')
 const userSchema = new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:Number,

    },
    email:{
        type:String,   },
    adharnumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'

    },

    isvoted:{
        type:Boolean,
        default:false
    },
 })
 // Hash password before saving to database
userSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password'))
        return next();
        try{
        const salt=await bcrypt.genSalt(10);
        person.password=await bcrypt.hash(person.password,salt);
    }catch(err){
        return next(err);
    }
    
});

// Method to compare password for authentication
userSchema.methods.comparePassword= async function(candidatePassword){
    try{
const isMatch= await bcrypt.compare(candidatePassword,this.password);
return isMatch;

    }catch(err){

        throw err;
}
}


const User = Mongoose.model('User',userSchema);

module.exports = User;





 