const express=require('express');
const {handleGetAllUsers, handelGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser}=require('../controllers/user')
const router=express.Router();

//Getting all data of User from database
// router.get('/users',async(req,res)=>{
//     const allDBUsers=await User.find({});
//     const html=`
//     <ul>
//     ${allDBUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>`;
//     res.send(html);
// })

//Fetching all data from database
router.route('/').get(handleGetAllUsers).post(handleCreateNewUser);

//Dynamic Request, fetching the data of any user using ID from a Database and Grouping request based on same route
router.route('/:id').get(handelGetUserById).patch(handleUpdateUserById).delete(handleDeleteUserById);

//Post request to write data in database
//router.post('/',handleCreateNewUser);

//Updating UserData in a Database
//router.patch('/:id',handleUpdateUserById)

//Deleting User Data from database
//router.delete('/:id',handleDeleteUserById)

module.exports=router;
