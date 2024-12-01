const {getUser} =require('../service/auth')

function checkForAuthentication(req,res,next){
    const authorizationHeaderValue = req.headers['authorization'];
    req.user = null
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')){
        return next();
    }
    const token = authorizationHeaderValue.split('Bearer ')[1];
    const user = getUser(token);

    req.user = user
    return next();
}

// async function restrictToLoggedInUserOnly(req,res,next){
//     //stateless using response headers
//     const userUid = req.headers['authorization'];
//     const token = userUid.split(' ')[1]; //Authorization header="Bearer <token>"
//     if(!userUid){
//         return res.redirect('/login');
//     }
//     const user=getUser(token);
//     if(!user) return res.redirect('/login');

//     req.user=user
//     next()
// }

// async function checkAuth(req,res,next) {
//     const userUid = req.headers['authorization'];
//     const token = userUid.split(' ')[1]; //Authorization header="Bearer <token>"
//     const user=getUser(token);
//     req.user=user
//     next()
    
// }
module.exports={checkForAuthentication}


// Stateless Authentication Using JWT and cookies
// async function restrictToLoggedInUserOnly(req,res,next){
//     //Get User UID and check cookie for stateless cookie
//     //const userUid = req.cookies?.uid;
//     if(!userUid){
//         return res.redirect('/login');
//     }
//     const user=getUser(userUid);
//     if(!user) return res.redirect('/login');

//     req.user=user
//     next()
// }

// async function checkAuth(req,res,next) {
//     const userUid = req.cookies?.uid;
//     const user=getUser(userUid);
//     req.user=user
//     next()
    
// }