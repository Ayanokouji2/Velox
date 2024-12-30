import { createUser, login } from '../services/users.service.js';

export const registerUser = async (req, res) => {
	try {
		const {
			fullname: { firstname, lastname },
			email,
			password,
		} = req.body;

		const { user, token } = await createUser(
			firstname,
			lastname,
			email,
			password
		);

		res.status(201).json({
			success: true,
			token,
			user,
		});
	} catch (error) {
		res.status(error.status || 500).json({ error: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password} = req.body;

		if(!email || !password){
			throw new Error(`Either Email or password is missing`);
		}

		const loggedInUser = await login(email, password);

		const token = await loggedInUser.generateAuthToken()

		res.status(200).json({
			success: true,
			user:loggedInUser,
			token
		})
		
	} catch (error) {
		res.status(400).json({
			error: error.message
		})	
	}
}
