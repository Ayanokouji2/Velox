import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const UserSchema = new Schema({
	fullname: {
		firstname: {
			type: String,
			required: true,
			minlength: [3, 'First Name should be greater than 3'],
		},
		lastname: {
			type: String,
			minlength: [3, 'Last Name should be greater than 3'],
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (email) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(email);
			},
			message: '{VALUE} is not a valid email!',
		},
	},
	password: {
		type: String,
		required: true,
		select: false, // Ensures the password attribute does not come by default when fetching a user from the database.
	},
	socketId: {
		type: String,
	},
});

UserSchema.methods.generateAuthToken = function () {
       
    const token = JWT.sign({ _id: this._id }, process.env.JWT_TOKEN, { expiresIn: '7d' });
    return token;
}

UserSchema.pre("save", async function(){
    if(!this.isModified('password'))
        return;

    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
})

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const UserModel = mongoose.models.user || model("user", UserSchema);

export default UserModel;