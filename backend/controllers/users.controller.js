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
		res.status(error.status || 500).json({
			success: false,
			error: error.message,
		});
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			throw new Error(`Either Email or password is missing`);
		}

		const loggedInUser = await login(email, password);

		const token = await loggedInUser.generateAuthToken();

		res.cookie('token', token, {
			maxAge: 9000000,  // cookie will automatically expire after the duration mentioned in ms
			// httpOnly: true,	// when set true cookie will not be accessed from the client javascript (meaning frontend)
			// secure: true,	// when set true cookie will only the sent over https protocol not while using http protocol
			sameSite: 'None',	// when set None then it will be sent over cross site 
		});

		res.status(200).json({
			success: true,
			user: loggedInUser,
			token,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: error.message,
		});
	}
};

export const getUserProfile = async (req, res) => {
	try {
		return res.status(200).json({
			success: true,
			user: req.user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
