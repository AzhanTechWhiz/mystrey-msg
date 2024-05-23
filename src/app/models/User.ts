import mongoose, { Schema, Document, Model } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifiedCode: string;
  isVerified: boolean;
  verifiedCodeExpire: Date;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "E-mail is required"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    unique: true,
  },
  verifiedCode: { type: String, required: [true, "Verify Code is required"] },
  verifiedCodeExpire: {
    type: Date,
    required: [true, "Verify Code is required"],
  },
  isAcceptingMessage: { type: Boolean, default: true },
  messages: { type: [MessageSchema] },
});

const UserModel: Model<User> =
  (mongoose.models.User as Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
