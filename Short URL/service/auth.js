const jwt=require('jsonwebtoken');
const secretKey='a#2312134@12876hbfbd'
//Create JWT Token for User
function setUser(user){
    jwt.sign({
        _id:user._id,
        email:user.email
    },secretKey);
}

function getUser(token){
    if(!token)
        return null;
    try{
        jwt.verify('uid',token)
    }
    catch{
        return null;
    }
    
}

//Statefull Authentication
// const sessionIdToUserMap = new Map();
// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }
// function getuser(id){
//     sessionIdToUserMap.get(id);
// }

module.exports={setUser,getUser}


//Problem in Statefull Authentication: Whenever server restart then existing session data deleted and user will be logout and In this authentication states are saving on server so basically it is consuming more memory on the server.
