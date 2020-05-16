const {User} = require('../models/User');

let auth = (req,res) => {
    
    //get token from client cookie
    let token = req.cookies.user;

    //convert token and find user
    // User.findByToken(token,(err,user)=>{
    //     if(err) throw err; 
    //     if(!user) return res.json({isAuth:false,error:true});

    //     req.token = token;
    //     req.user = user;
    //     next();
    // });
    if(token){
        req.token = token;
        req.user = User
    } 
    
}

module.exports = {auth};