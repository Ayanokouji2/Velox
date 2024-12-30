import { createUser } from '../services/users.service.js';

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
