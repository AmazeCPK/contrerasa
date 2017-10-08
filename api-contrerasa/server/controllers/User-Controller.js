import knex from './../config/knex';
import User from './../models/User-Model';

const userController = {};

userController.getAllUsers = async(req,res) =>{
	const users = await knex('users as u')
	.whereNot('u.is_deleted', true);

	if(users.length){
		const mappedUsers = users.map(mappedUsers=>new User(mappedUsers,true));
		res.json(mappedUsers)
	}
	else
		res.json({error:'No users found'});
}

userController.getUserById = async(req,res) =>{
	const user = await knex('users as u')
	.select(returnData)
	.where('u.id',req.params.id)
	.whereNot('u.is_deleted',true);

	if(user.length){
		const mappedUser = new User(user[0]);
		res.json(mappedUser);
	}
	else
		res.json({error:'User not found'});
}

userController.updateUser = async (req,res) =>{
	const userData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	}

	const user = await knex('users as u')
	.where('id',req.params.id)
	.whereNot('is_deleted', true)
	.update(userData)
	.returning(returnData)

	outputData(res,user,'User not updated');
}

userController.updateRole = async (req,res)=>{
	const user = await knex('users as u')
	.where('id',req.params.id)
	.whereNot('is_deleted',true)
	.update({role:req.body.role})
	.returning(returnData)

	outputData(res,user,'User role not updated');
}

const returnData = ['u.email','u.first_name','u.last_name','u.role','u.created_at','u.updated_at','u.is_deleted','u.password'];

function outputData(res,data,error={error:'Something went wrong...'}){
	try{
		if(data.length)
			res.json(data)
		else
			res.json({error:error})
	}
	catch(e){
		res.json({error:'Something went wrong...'})
	}
}

export default userController;