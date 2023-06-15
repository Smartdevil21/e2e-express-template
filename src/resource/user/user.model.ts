import { Schema, model } from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import { IUser } from "./user.interface";

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate(email: string) {
			if (!validator.isEmail(email)) {
				throw new Error("Provided email is not valid");
			}
		},
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre("save", async function () {
	if (this.isModified("password")) {
		this.password = await bcryptjs.hash(this.password, 10);
	}
});

const User = model<IUser>("user", userSchema);
export { User };
