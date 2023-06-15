import { User } from "@/resource/user/user.model";
import { IUser } from "@/resource/user/user.interface";
import { HttpException } from "@/util/httpException/httpException.util";
import bcryptjs from "bcryptjs";

class UserService {
	static async create(data: IUser): Promise<IUser> {
		const user = new User(data);
		const result = await user.save();
		return result;
	}

	static async login(
		data: Pick<IUser, "username" | "password">
	): Promise<IUser> {
		const user = await User.findOne({ username: data.username });
		if (!user)
			throw new HttpException({
				status: 404,
				message: "User not found!",
			});
		const passCheck = await bcryptjs.compare(data.password, user.password);
		if (!passCheck)
			throw new HttpException({
				status: 401,
				message: "Password is incorrect!",
			});
		return user;
	}
}

// const userService = new UserService();
export { UserService };
