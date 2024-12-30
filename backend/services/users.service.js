import UserModel from "../models/users.model.js"


export const createUser = async (firstname, lastname, email, password) => {
    
    const requiredFields = ['firstname', 'email', 'password'];
    const missingField = requiredFields.find(field => !eval(field));

    if(missingField){
        throw new Error(`Missing Field ${missingField.charAt(0).toUpperCase() + missingField.slice(1)}`);
    }

    const user = await UserModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    });

    const token = user.generateAuthToken()

    return {user,token};
}

export const login = async (email, password) => {
    try {
        const user = await UserModel.findOne({email}).select("+password");
        if(!user)
            throw new Error(`user does not exist with this email`);

        const isCorrectPassword = await user.comparePassword(password);

        if(!isCorrectPassword)
            throw new Error(`Password doesn't match the user account`)

        return user;

    } catch (error) {
        console.log(`${error.message} : this error occured while loggin`);
        throw new Error(`${error.message} : this error occured while user loggin`)
    }
}

export const getUser = async (_id) => {
    try {
        if(!_id)
            throw new Error(`No user_id found to Get User details`)

        const user = await UserModel.findById(_id)

        if(!user)
            throw new Error(`No user found with this user_id`)

        return user;

    } catch (error) {
        throw new Error(`${error.message} : this error occured while fetching user details`)
    }
}