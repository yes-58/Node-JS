function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
// Exporting the `add` and `sub` functions to make them available for use in other modules.
// Functions defined above remain private within this module until exported here.
module.exports={ 
    add,
    sub,
}
// exports.add=(a,b)=>(a+b); //Arrow function (anonymous)
// exports.sub=(a,b)=>(a-b);

