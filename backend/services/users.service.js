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