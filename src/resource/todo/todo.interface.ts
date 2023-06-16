import mongoose from "mongoose";

interface ITodo {
	uid: mongoose.Schema.Types.ObjectId;
	title: string;
	desc?: string;
	deadline?: Date;
	completed: boolean;
}

export { ITodo };
